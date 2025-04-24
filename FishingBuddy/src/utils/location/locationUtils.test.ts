import * as Location from "expo-location";
import { getReversedAddress, getDistanceInKm } from "./locationUtils";

jest.mock("expo-location");

describe("locationUtils", () => {
  describe("getReversedAddress", () => {
    it("should return a formatted address when reverse geocoding is successful", async () => {
      const mockReverseGeocodeAsync = jest.fn().mockResolvedValue([
        {
          street: "123 Main St",
          city: "Springfield",
          region: "Illinois",
          country: "USA",
        },
      ]);
      (Location.reverseGeocodeAsync as jest.Mock) = mockReverseGeocodeAsync;

      const result = await getReversedAddress(39.7817, -89.6501);

      expect(mockReverseGeocodeAsync).toHaveBeenCalledWith({
        latitude: 39.7817,
        longitude: -89.6501,
      });
      expect(result).toBe("123 Main St, Springfield, Illinois, USA");
    });

    it("should return coordinates as a string if no address is found", async () => {
      const mockReverseGeocodeAsync = jest.fn().mockResolvedValue([]);
      (Location.reverseGeocodeAsync as jest.Mock) = mockReverseGeocodeAsync;

      const result = await getReversedAddress(39.7817, -89.6501);

      expect(mockReverseGeocodeAsync).toHaveBeenCalledWith({
        latitude: 39.7817,
        longitude: -89.6501,
      });
      expect(result).toBe("39.7817, -89.6501");
    });

    it("should return coordinates as a string if an error occurs", async () => {
      const mockReverseGeocodeAsync = jest
        .fn()
        .mockRejectedValue(new Error("Network error"));
      (Location.reverseGeocodeAsync as jest.Mock) = mockReverseGeocodeAsync;

      const result = await getReversedAddress(39.7817, -89.6501);

      expect(mockReverseGeocodeAsync).toHaveBeenCalledWith({
        latitude: 39.7817,
        longitude: -89.6501,
      });
      expect(result).toBe("39.7817, -89.6501");
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
