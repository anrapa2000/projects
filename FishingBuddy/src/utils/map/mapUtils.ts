import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FISHING_SPOTS } from "../../data/fishingSpots";
import { getDistanceInKm } from "../location/locationUtils";

export const FAVORITES_KEY = "favouriteSpots";

// This function requests the user's location permission and returns the current location.
export async function getCurrentLocation(): Promise<Location.LocationObject | null> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return null;
  }

  return await Location.getCurrentPositionAsync({});
}

// Gets the nearby fishing spots within a specified radius from the user's current location.
export function getNearbySpots(
  location: Location.LocationObject,
  radiusInKm: number = 20
) {
  const lat = location.coords.latitude;
  const lon = location.coords.longitude;

  return FISHING_SPOTS.filter((spot) => {
    const distance = getDistanceInKm(lat, lon, spot.lat, spot.lon);
    return distance <= radiusInKm;
  });
}

// Saves the user's favorite fishing spots to AsyncStorage.
export async function getFavoriteSpotIds(): Promise<string[]> {
  const saved = await AsyncStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
}
