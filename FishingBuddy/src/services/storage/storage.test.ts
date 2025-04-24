import { saveCatch, getCatches, clearCatches } from "./storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("Storage Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("saveCatch", () => {
    it("saves a new catch when no previous catches exist", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const newCatch = {
        fishType: "Bass",
        size: "12 inches",
        timestamp: Date.now(),
        location: {
          lat: 37.7749,
          lon: -122.4194,
        },
        image: "https://example.com/bass.jpg",
      };

      await saveCatch(newCatch);

      expect(AsyncStorage.getItem).toHaveBeenCalledWith("@catch_log");
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "@catch_log",
        JSON.stringify([newCatch])
      );
    });

    it("appends a new catch to existing catches", async () => {
      const existingCatches = [
        {
          fishType: "Trout",
          size: "8 inches",
          timestamp: Date.now() - 1000,
          location: {
            lat: 37.7749,
            lon: -122.4194,
          },
          image: "https://example.com/trout.jpg",
        },
      ];

      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(existingCatches)
      );

      const newCatch = {
        fishType: "Bass",
        size: "12 inches",
        timestamp: Date.now(),
        location: {
          lat: 37.7749,
          lon: -122.4194,
        },
        image: "https://example.com/bass.jpg",
      };

      await saveCatch(newCatch);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "@catch_log",
        JSON.stringify([...existingCatches, newCatch])
      );
    });

    it("handles errors gracefully", async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(
        new Error("Storage Error")
      );

      const newCatch = {
        fishType: "Bass",
        size: "12 inches",
        timestamp: Date.now(),
        location: {
          lat: 37.7749,
          lon: -122.4194,
        },
        image: "https://example.com/bass.jpg",
      };

      await expect(saveCatch(newCatch)).resolves.not.toThrow();
    });
  });

  describe("getCatches", () => {
    it("returns empty array when no catches exist", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await getCatches();

      expect(result).toEqual([]);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("@catch_log");
    });

    it("returns existing catches", async () => {
      const existingCatches = [
        {
          fishType: "Bass",
          size: "12 inches",
          timestamp: Date.now(),
          location: {
            lat: 37.7749,
            lon: -122.4194,
          },
          image: "https://example.com/bass.jpg",
        },
      ];

      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(existingCatches)
      );

      const result = await getCatches();

      expect(result).toEqual(existingCatches);
    });

    it("handles errors gracefully", async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(
        new Error("Storage Error")
      );

      const result = await getCatches();

      expect(result).toEqual([]);
    });
  });

  describe("clearCatches", () => {
    it("removes all catches", async () => {
      await clearCatches();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("@catch_log");
    });

    it("handles errors gracefully", async () => {
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValue(
        new Error("Storage Error")
      );

      await expect(clearCatches()).resolves.not.toThrow();
    });
  });
});
