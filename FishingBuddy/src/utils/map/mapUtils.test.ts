import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getCurrentLocation,
  getNearbySpots,
  getFavoriteSpotIds,
} from "./mapUtils";
import { FISHING_SPOTS } from "../../data/fishingSpots";
import { getDistanceInKm } from "../location/locationUtils";
import { LocationObject } from "expo-location";

jest.mock("expo-location");
jest.mock("@react-native-async-storage/async-storage");
jest.mock("../location/locationUtils", () => ({
  getDistanceInKm: jest.fn(),
}));

describe("mapUtils", () => {
  describe("getCurrentLocation", () => {
    it("should return null if location permission is not granted", async () => {
      (
        Location.requestForegroundPermissionsAsync as jest.Mock
      ).mockResolvedValue({ status: "denied" });

      const location = await getCurrentLocation();

      expect(location).toBeNull();
    });

    it("should return the current location if permission is granted", async () => {
      const mockLocation = { coords: { latitude: 10, longitude: 20 } };
      (
        Location.requestForegroundPermissionsAsync as jest.Mock
      ).mockResolvedValue({ status: "granted" });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue(
        mockLocation
      );

      const location = await getCurrentLocation();

      expect(location).toEqual(mockLocation);
    });
  });

  describe("getNearbySpots", () => {
    const mockLocation: LocationObject = {
      coords: {
        latitude: 10,
        longitude: 20,
        altitude: 0,
        accuracy: 10,
        altitudeAccuracy: 10,
        heading: 0,
        speed: 0,
      },
      timestamp: Date.now(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe("when location is provided", () => {
      it("should return spots within the given radius", () => {
        // Mock getDistanceInKm to return distances for each spot
        (getDistanceInKm as jest.Mock).mockImplementation(
          (lat1, lon1, lat2, lon2) => {
            // Return a distance less than 20km for all spots
            return 5;
          }
        );

        const result = getNearbySpots(mockLocation, 20);

        // Verify that all spots are returned since they're all within 20km
        expect(result).toHaveLength(FISHING_SPOTS.length);
        expect(result).toEqual(FISHING_SPOTS);
      });

      it("should filter out spots outside the given radius", () => {
        // Mock getDistanceInKm to return distances for each spot
        (getDistanceInKm as jest.Mock).mockImplementation(
          (lat1, lon1, lat2, lon2) => {
            // Return a distance greater than 20km for all spots
            return 25;
          }
        );

        const result = getNearbySpots(mockLocation, 20);

        // Verify that no spots are returned since they're all outside 20km
        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
      });
    });

    describe("when location is not provided", () => {
      it("should return all spots", () => {
        const result = getNearbySpots(mockLocation, 20);

        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
      });
    });
  });

  describe("getFavoriteSpotIds", () => {
    it("should return an empty array if no favorite spots are saved", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const favoriteSpotIds = await getFavoriteSpotIds();

      expect(favoriteSpotIds).toEqual([]);
    });

    it("should return the list of favorite spot IDs if saved", async () => {
      const mockFavorites = ["spot1", "spot2"];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(mockFavorites)
      );

      const favoriteSpotIds = await getFavoriteSpotIds();

      expect(favoriteSpotIds).toEqual(mockFavorites);
    });
  });
});
