import * as Location from "expo-location";
import { getReversedAddress, getDistanceInKm } from "./locationUtils";

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  reverseGeocodeAsync: jest.fn(),
}));

describe("locationUtils", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe("getReversedAddress", () => {
    it("should return a formatted address when reverse geocoding is successful", async () => {
      // Mock reverseGeocodeAsync for this test
      (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
        {
          city: "Springfield",
          region: "Illinois",
          country: "USA",
        },
      ]);
  
      const result = await getReversedAddress(39.7817, -89.6501);
  
      expect(Location.reverseGeocodeAsync).toHaveBeenCalledWith({
        latitude: 39.7817,
        longitude: -89.6501,
      });
      expect(result).toBe("Springfield, Illinois, USA");
    });
  });

  describe("getDistanceInKm", () => {
    it("should calculate the correct distance between two points", () => {
      const lat1 = 39.7817;
      const lon1 = -89.6501;
      const lat2 = 40.7306;
      const lon2 = -73.9352;

      const result = getDistanceInKm(lat1, lon1, lat2, lon2);

      // Expected distance between Springfield, IL and New York City, NY is approximately 1336 km
      expect(result).toBeCloseTo(1336, 0);
    });

    it("should return 0 if the two points are the same", () => {
      const lat1 = 39.7817;
      const lon1 = -89.6501;

      const result = getDistanceInKm(lat1, lon1, lat1, lon1);

      expect(result).toBe(0);
    });
  });
});
