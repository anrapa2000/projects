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
import { FISHING_SPOTS } from "../../data/fishingSpots";
import { getDistanceInKm } from "../../utils/location/locationUtils";
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
          testID="map-back-button"
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
        testID="map-view"
      >
        {nearbySpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.lat, longitude: spot.lon }}
            title={spot.name}
            description={`${getDistanceInKm(
              location.coords.latitude,
              location.coords.longitude,
              spot.lat,
              spot.lon
            ).toFixed(1)} km away`}
            pinColor={favoriteSpots.includes(spot.id) ? "gold" : "blue"}
            onCalloutPress={() => toggleFavorite(spot.id)}
            testID={`spot-marker-${spot.id}`}
          />
        ))}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You"
          testID="user-marker"
        />
      </MapView>
      <View style={styles.overlay} testID="map-overlay">
        <View style={styles.overlayContent}>
          <Text style={styles.spotInfo} testID="spot-count">
            {nearbySpots.length} fishing spot
            {nearbySpots.length !== 1 ? "s" : ""} nearby
          </Text>
          <Text style={styles.tipText} testID="favorite-tip">
            Tap a marker to {favoriteSpots.length > 0 ? "manage" : "add"}{" "}
            favorites
          </Text>
        </View>
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
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 16,
    borderRadius: 16,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overlayContent: {
    alignItems: "center",
  },
  spotInfo: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  tipText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

// TODO: Add error handling for location permissions
