import { getWeatherForCoordinatesWithCache } from "./weather";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe("Weather Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it("returns cached weather data if it's not expired", async () => {
    const mockCachedData = {
      timestamp: Date.now() - 15 * 60 * 1000, // 15 minutes ago
      data: {
        description: "Sunny",
        temperature: 25,
        windSpeed: 5,
      },
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockCachedData));

    const result = await getWeatherForCoordinatesWithCache(37.7749, -122.4194, "test-spot");

    expect(result).toEqual({
      data: mockCachedData.data,
      timestamp: mockCachedData.timestamp,
    });
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("weather_test-spot");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("fetches new weather data if cache is expired", async () => {
    const mockCachedData = {
      timestamp: Date.now() - 45 * 60 * 1000, // 45 minutes ago
      data: {
        description: "Sunny",
        temperature: 25,
        windSpeed: 5,
      },
    };

    const mockApiResponse = {
      weather: [{ description: "Cloudy" }],
      main: { temp: 20 },
      wind: { speed: 10 },
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockCachedData));
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await getWeatherForCoordinatesWithCache(37.7749, -122.4194, "test-spot");

    expect(result).toEqual({
      data: {
        description: "Cloudy",
        temperature: 20,
        windSpeed: 10,
      },
      timestamp: expect.any(Number),
    });
    expect(AsyncStorage.setItem).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("api.openweathermap.org")
    );
  });

  it("fetches new weather data if no cache exists", async () => {
    const mockApiResponse = {
      weather: [{ description: "Rainy" }],
      main: { temp: 15 },
      wind: { speed: 8 },
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await getWeatherForCoordinatesWithCache(37.7749, -122.4194, "test-spot");

    expect(result).toEqual({
      data: {
        description: "Rainy",
        temperature: 15,
        windSpeed: 8,
      },
      timestamp: expect.any(Number),
    });
    expect(AsyncStorage.setItem).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalled();
  });

  it("returns null if API call fails", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API Error"));

    const result = await getWeatherForCoordinatesWithCache(37.7749, -122.4194, "test-spot");

    expect(result).toBeNull();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it("handles invalid cached data gracefully", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("invalid json");

    const mockApiResponse = {
      weather: [{ description: "Sunny" }],
      main: { temp: 25 },
      wind: { speed: 5 },
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await getWeatherForCoordinatesWithCache(37.7749, -122.4194, "test-spot");

    expect(result).toEqual({
      data: {
        description: "Sunny",
        temperature: 25,
        windSpeed: 5,
      },
      timestamp: expect.any(Number),
    });
    expect(global.fetch).toHaveBeenCalled();
  });
}); 