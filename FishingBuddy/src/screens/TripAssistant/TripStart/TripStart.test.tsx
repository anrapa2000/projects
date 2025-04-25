import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TripStart from "./TripStart";
import { SCREENS } from "../../../constants/screens";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock("react-native-confetti-cannon", () => "ConfettiCannon");

describe("TripStart Screen", () => {
  const mockNavigation = {
    reset: jest.fn(),
  };

  const mockRoute = {
    params: {
      selectedSpot: { name: "Lake Paradise" },
      weather: { description: "Sunny", temperature: 25, windSpeed: 10 },
      endTime: new Date().getTime() + 3600000,
      logCatches: true,
      endDate: new Date(),
    },
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useRoute as jest.Mock).mockReturnValue(mockRoute);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the TripStart screen correctly", () => {
    const { getByTestId, getByText } = render(<TripStart />);

    expect(getByTestId("confetti-cannon")).toBeTruthy();
    expect(getByTestId("info-box")).toBeTruthy();
    expect(getByTestId("weather-info")).toBeTruthy();
    expect(getByTestId("wind-info")).toBeTruthy();
    expect(getByTestId("button-icon")).toBeTruthy();
  });

  it("displays the correct weather information", () => {
    const { getByTestId } = render(<TripStart />);

    const weatherInfo = getByTestId("weather-info");
    expect(weatherInfo.props.children).toContain("Sunny");
    expect(weatherInfo.props.children).toContain("25");

    const windInfo = getByTestId("wind-info");
    expect(windInfo.props.children).toContain("10");
  });

  it("displays the correct end time if provided", () => {
    const { getByTestId } = render(<TripStart />);

    const endTimeInfo = getByTestId("end-time-info");
    expect(endTimeInfo.props.children).toContain(
      new Date(mockRoute.params.endTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  });

  it("navigates to the Dashboard screen when the start button is pressed", () => {
    const { getByTestId } = render(<TripStart />);

    const startButton = getByTestId("start-button");
    fireEvent.press(startButton);

    expect(mockNavigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [
        {
          name: SCREENS.Dashboard,
          params: {
            tripStarted: true,
            selectedSpot: mockRoute.params.selectedSpot,
            weather: mockRoute.params.weather,
            endTime: mockRoute.params.endTime,
            logCatches: mockRoute.params.logCatches,
            startTime: expect.any(Number),
            startDate: expect.any(Date),
            endDate: mockRoute.params.endDate,
          },
        },
      ],
    });
  });
});