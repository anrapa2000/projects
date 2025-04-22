import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
  ToastAndroid,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FISHING_SPOTS } from "../data/fishingSpots";
import { getDistanceInKm } from "../utils/distance";
import AsyncStorage from "@react-native-async-storage/async-storage";
const FAVORITES_KEY = "favouriteSpots";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [nearbySpots, setNearbySpots] = useState<typeof FISHING_SPOTS>([]);
  const [favoriteSpots, setFavoriteSpots] = useState<string[]>([]);
  const radiusInKm = 20;
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000, // every 3 seconds
          distanceInterval: 5, // or every 5 meters
        },
        (loc) => {
          setLocation(loc);
          const userLatitude = loc.coords.latitude;
          const userLongitude = loc.coords.longitude;
          // TODO: Try to use a more efficient algorithm to find nearby spots without using predefined data
          const nearby = FISHING_SPOTS.filter((spot) => {
            const distance = getDistanceInKm(
              userLatitude,
              userLongitude,
              spot.lat,
              spot.lon
            );
            return distance <= radiusInKm;
          });
          console.log("Nearby spots:", nearby);
          setNearbySpots(nearby);
        }
      );

      (async () => {
        const saved = await AsyncStorage.getItem(FAVORITES_KEY);
        if (saved) {
          setFavoriteSpots(JSON.parse(saved));
        }
      })();

      return () => subscription.remove();
    })();
  }, []);

  // TODO: Handle errors more gracefully
  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  // TODO: Handle location loading state
  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Fetching location...</Text>
      </View>
    );
  }

  const toggleFavorite = async (spotId: string) => {
    let updated: string[];

    if (favoriteSpots.includes(spotId)) {
      updated = favoriteSpots.filter((id) => id !== spotId);
    } else {
      updated = [...favoriteSpots, spotId];
    }

    setFavoriteSpots(updated);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    showToast(
      updated.includes(spotId)
        ? "Spot added to favorites"
        : "Removed from favorites"
    );
  };

  const showToast = (message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("Notice", message);
    }
  };

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
        showsUserLocation
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {nearbySpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.lat, longitude: spot.lon }}
            title={spot.name}
            description={`Distance: ${getDistanceInKm(
              location.coords.latitude,
              location.coords.longitude,
              spot.lat,
              spot.lon
            ).toFixed(2)} km\nTap to ${
              favoriteSpots.includes(spot.id) ? "remove from" : "add to"
            } favorites`}
            pinColor={favoriteSpots.includes(spot.id) ? "gold" : "blue"}
            onCalloutPress={() => toggleFavorite(spot.id)}
          />
        ))}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You"
        />
      </MapView>
      <View style={styles.overlay}>
        <Text style={styles.spotInfo}>
          There are {nearbySpots.length} spot(s) within {radiusInKm} km
        </Text>
        <Text style={styles.tipText}>Tap on a marker to mark as favorite</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  overlay: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
    borderRadius: 10,
  },
  speed: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  spotInfo: {
    color: "#00ffcc",
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
  tipText: {
    color: "#fff",
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.8,
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
});

// TODO: Add error handling for location permissions
// TODO: Speed tracking - is this necessary?
