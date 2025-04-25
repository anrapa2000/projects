import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { TripWeatherScreen } from "./TripWeatherScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getWeatherForCoordinatesWithCache } from "../../services/weather/weather";
import { strings } from "../../common/strings";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock("../../services/weather/weather", () => ({
  getWeatherForCoordinatesWithCache: jest.fn(),
}));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("./TripProgressBar", () => () => <></>);
jest.mock("../../components/Button/Button", () => ({ text, onPress }: any) => (
  <button onClick={onPress}>{text}</button>
));

const weatherStrings = strings.tripAssistant.weather;

describe("TripWeatherScreen", () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockRoute = {
    params: {
      selectedSpot: {
        lat: 12.34,
        lon: 56.78,
        name: "Test Spot",
        id: "test-spot",
      },
    },
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useRoute as jest.Mock).mockReturnValue(mockRoute);
    jest.clearAllMocks();
  });

  it("renders bad weather message if conditions are not great", async () => {
    (getWeatherForCoordinatesWithCache as jest.Mock).mockResolvedValue({
      data: {
        description: "Rainy",
        temperature: 15,
        windSpeed: 20,
        icon: "09d",
      },
      timestamp: Date.now(),
    });

    const { getByText } = render(<TripWeatherScreen />);

    await waitFor(() => {
      expect(getByText("Rainy, 15°C")).toBeTruthy();
      expect(getByText(weatherStrings.bad)).toBeTruthy();
    });
  });
});
