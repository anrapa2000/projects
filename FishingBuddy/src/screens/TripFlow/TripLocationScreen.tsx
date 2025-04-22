import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  Platform,
  ToastAndroid,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import {
  getCurrentLocation,
  getNearbySpots,
  getFavoriteSpotIds,
} from "../../utils/mapUtils";
import { FISHING_SPOTS } from "../../data/fishingSpots";
import { TRIP_SCREENS } from "../../constants/screens";
import { TripStackParamList } from "../../types/NavigationTypes";

type TripLocationScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList,
  typeof TRIP_SCREENS.TripLocation
>;

export default function TripLocationScreen() {
  const [location, setLocation] = useState<any>(null);
  const [nearbySpots, setNearbySpots] = useState<typeof FISHING_SPOTS>([]);
  const [favoriteSpots, setFavoriteSpots] = useState<string[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<any | null>(null);
  const navigation = useNavigation<TripLocationScreenNavigationProp>();

  useEffect(() => {
    (async () => {
      const loc = await getCurrentLocation();
      if (!loc) {
        Alert.alert("Location Error", "Unable to fetch location.");
        return;
      }

      setLocation(loc);
      setNearbySpots(getNearbySpots(loc));
      setFavoriteSpots(await getFavoriteSpotIds());
    })();
  }, []);

  const getMarkerColor = (spotId: string) => {
    if (selectedSpot?.id === spotId) return "green";
    if (favoriteSpots.includes(spotId)) return "gold";
    return "blue";
  };

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
      </View>

      <MapView
        style={styles.map}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Your Location */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Your Location"
          pinColor="red"
        />

        {/* Fishing Spots */}
        {nearbySpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.lat, longitude: spot.lon }}
            title={spot.name}
            pinColor={getMarkerColor(spot.id)}
            onPress={() => setSelectedSpot(spot)}
          />
        ))}
      </MapView>

      <View style={styles.legend}>
        <Text style={styles.legendItem}>🔵 Spot</Text>
        <Text style={styles.legendItem}>🟡 Favorite</Text>
        <Text style={styles.legendItem}>🟢 Selected</Text>
        <Text style={styles.legendItem}>🔴 You</Text>
      </View>

      {selectedSpot && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Selected: {selectedSpot.name}</Text>
          <Text
            style={styles.link}
            onPress={() =>
              navigation.navigate("TripWeather", { selectedSpot })
            }
          >
            Next ➡️
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.75,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 24,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
  },
  legendItem: {
    fontSize: 12,
    fontWeight: "600",
  },
  infoBox: {
    padding: 12,
    backgroundColor: "#e0f7fa",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
  },
  link: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
