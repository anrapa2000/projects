import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { TripWeather } from "./TripWeather";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getWeatherForCoordinatesWithCache } from "../../../services/weather/weather";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock("../../../services/weather/weather", () => ({
  getWeatherForCoordinatesWithCache: jest.fn(),
}));

jest.mock("../../../components/Button/Button", () => "Button");

const mockNavigation = {
  navigate: jest.fn(),
};
const mockRoute = {
  params: {
    selectedSpot: {
      lat: 40.7128,
      lon: -74.006,
      name: "Test Spot",
      id: "test-spot",
      icon: "test-icon",
    },
  },
};

describe("TripWeather", () => {
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useRoute as jest.Mock).mockReturnValue(mockRoute);
    jest.clearAllMocks();
  });

  it("renders weather data after loading", async () => {
    (getWeatherForCoordinatesWithCache as jest.Mock).mockResolvedValue({
      data: {
        description: "Clear sky",
        temperature: 25,
        windSpeed: 5,
        icon: "01d",
      },
      timestamp: Date.now(),
    });

    const { getByTestId, queryByTestId } = render(<TripWeather />);

    await waitFor(() => {
      expect(queryByTestId("loading-indicator")).toBeNull();
      expect(getByTestId("weather-info").props.children).toEqual([
        "Clear sky",
        ", ",
        25,
        "°C",
      ]);
    });
  });

  it("renders 'good weather' message for great weather conditions", async () => {
    (getWeatherForCoordinatesWithCache as jest.Mock).mockResolvedValue({
      data: {
        description: "Clear sky",
        temperature: 25,
        windSpeed: 5,
        icon: "01d",
      },
      timestamp: Date.now(),
    });

    const { getByTestId } = render(<TripWeather />);

    await waitFor(() => {
      expect(getByTestId("weather-good").props.children).toBe(
        "Perfect weather to go fishing. Go Fish!"
      );
    });
  });

  it("renders 'bad weather' message for poor weather conditions", async () => {
    (getWeatherForCoordinatesWithCache as jest.Mock).mockResolvedValue({
      data: {
        description: "Rain",
        temperature: 15,
        windSpeed: 20,
        icon: "09d",
      },
      timestamp: Date.now(),
    });

    const { getByTestId } = render(<TripWeather />);

    await waitFor(() => {
      expect(getByTestId("weather-bad").props.children).toBe(
        "⚠️ Conditions may not be ideal today."
      );
    });
  });

  it("navigates to TripLicense on 'Next' button press", async () => {
    (getWeatherForCoordinatesWithCache as jest.Mock).mockResolvedValue({
      data: {
        description: "Clear sky",
        temperature: 25,
        windSpeed: 5,
        icon: "01d",
      },
      timestamp: Date.now(),
    });

    const { getByTestId } = render(<TripWeather />);

    await waitFor(() => {
      fireEvent.press(getByTestId("next-button"));
      expect(mockNavigation.navigate).toHaveBeenCalledWith("TripLicense", {
        selectedSpot: mockRoute.params.selectedSpot,
        weather: {
          description: "Clear sky",
          temperature: 25,
          windSpeed: 5,
          icon: "01d",
        },
      });
    });
  });

  it("navigates to Dashboard on 'Exit' button press", async () => {
    (getWeatherForCoordinatesWithCache as jest.Mock).mockResolvedValue({
      data: {
        description: "Clear sky",
        temperature: 25,
        windSpeed: 5,
        icon: "01d",
      },
      timestamp: Date.now(),
    });

    const { getByTestId } = render(<TripWeather />);

    await waitFor(() => {
      fireEvent.press(getByTestId("exit-button"));
      expect(mockNavigation.navigate).toHaveBeenCalledWith("Dashboard", {
        tripStarted: false,
        selectedSpot: mockRoute.params.selectedSpot,
        weather: {
          description: "Clear sky",
          temperature: 25,
          windSpeed: 5,
          icon: "01d",
        },
        endTime: 0,
        logCatches: false,
        startTime: 0,
      });
    });
  });
});
