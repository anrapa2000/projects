import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import HomeDashboardScreen from "./Dashboard";
import { getWeatherForCoordinatesWithCache } from "../../services/weather/weather";
import { FISHING_SPOTS } from "../../data/fishingSpots";
import { checkTripEndAndAlert } from "../../utils/tripMonitorAlerts/tripMonitorAlert";
import { ProfileProvider } from "../../contexts/ProfileContext";
import { Alert } from "react-native";

// Mocking async-storage, navigation, and weather service
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
  useIsFocused: jest.fn(() => true),
}));

jest.mock("../../services/weather/weather", () => ({
  getWeatherForCoordinatesWithCache: jest.fn(),
}));

// Mocking trip end alert utility
jest.mock("../../utils/tripMonitorAlerts/tripMonitorAlert", () => ({
  checkTripEndAndAlert: jest.fn(),
}));

// Mocking react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return {
    ...Reanimated,
    useSharedValue: jest.fn((value) => ({ value })),
    useAnimatedStyle: jest.fn((style) => style),
    withSpring: jest.fn((value) => value),
    withTiming: jest.fn((value) => value),
    withSequence: jest.fn((...args) => args),
    withRepeat: jest.fn((value) => value),
    withDelay: jest.fn((value) => value),
    withDecay: jest.fn((value) => value),
    withClamp: jest.fn((value) => value),
    Easing: {
      linear: jest.fn(),
      ease: jest.fn(),
      quad: jest.fn(),
      cubic: jest.fn(),
      poly: jest.fn(),
      sin: jest.fn(),
      circle: jest.fn(),
      exp: jest.fn(),
      elastic: jest.fn(),
      back: jest.fn(),
      bounce: jest.fn(),
      bezier: jest.fn(),
      in: jest.fn(),
      out: jest.fn(),
      inOut: jest.fn(),
    },
  };
});

// Mocking expo linear-gradient
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: jest.fn(({ children }) => children),
}));

describe("Dashboard", () => {
  const mockNavigation = {
    navigate: jest.fn(),
    reset: jest.fn(),
  };

  const mockRoute = {
    params: {
      tripStarted: false,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useRoute as jest.Mock).mockReturnValue(mockRoute);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("[]");
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <ProfileProvider>
        <HomeDashboardScreen />
      </ProfileProvider>
    );
    expect(
      getByText("Everything you need before casting off — tap below to begin!")
    ).toBeTruthy();
  });

  it("navigates to TripFlow when the button is pressed", () => {
    const { getByText } = render(
      <ProfileProvider>
        <HomeDashboardScreen />
      </ProfileProvider>
    );
    const button = getByText("Reel It In – Let's Go!");
    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("TripFlow", {
      screen: "TripIntro",
    });
  });

  it("displays loading indicator while fetching favorite spots", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    const { getByText } = render(
      <ProfileProvider>
        <HomeDashboardScreen />
      </ProfileProvider>
    );
    expect(getByText("Catching the latest weather...")).toBeTruthy();
  });

  it("displays empty state when no favorite spots are found", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce("[]");
    const { getByText } = render(
      <ProfileProvider>
        <HomeDashboardScreen />
      </ProfileProvider>
    );
    await waitFor(() =>
      expect(getByText("No favorite spots yet. Time to cast your net!"))
    );
  });

  it("displays favorite spots with weather data", async () => {
    const mockSpot = FISHING_SPOTS[0];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([mockSpot.id])
    );
    (getWeatherForCoordinatesWithCache as jest.Mock).mockResolvedValueOnce({
      data: {
        description: "Clear sky",
        temperature: 25,
        windSpeed: 5,
      },
      timestamp: Date.now(),
    });

    const { getByText } = render(
      <ProfileProvider>
        <HomeDashboardScreen />
      </ProfileProvider>
    );
    await waitFor(() => expect(getByText(mockSpot.name)).toBeTruthy());
    expect(getByText("Clear sky, 25°C, Wind: 5 km/h")).toBeTruthy();
  });

  it("handles trip end alert when trip is started", async () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { tripStarted: true },
    });

    jest.useFakeTimers();

    render(
      <ProfileProvider>
        <HomeDashboardScreen />
      </ProfileProvider>
    );

    // Advance time by 1 hour to trigger the interval
    jest.advanceTimersByTime(60 * 60 * 1000);

    await waitFor(() => expect(checkTripEndAndAlert).toHaveBeenCalled());

    jest.useRealTimers();
  });

  it("shows confirmation alert when stopping a trip", () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { tripStarted: true },
    });

    const { getByText } = render(
      <ProfileProvider>
        <HomeDashboardScreen />
      </ProfileProvider>
    );
    const stopTripButton = getByText("Stop Trip");
    fireEvent.press(stopTripButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      "End Trip",
      "Are you sure you want to stop your trip?",
      expect.any(Array)
    );
  });
});
