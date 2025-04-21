import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FISHING_SPOTS } from "../data/fishingSpots";
import { getDistanceInKm } from "../utils/distance";

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [nearbySpots, setNearbySpots] = useState<typeof FISHING_SPOTS>([]);
  const radiusInKm = 20;

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

  return (
    <View style={styles.container}>
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
            ).toFixed(2)} km`}
            pinColor="blue"
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
});

// TODO: Add error handling for location permissions
// TODO: Speed tracking - is this necessary?
