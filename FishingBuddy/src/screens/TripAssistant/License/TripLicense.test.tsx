import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TripLicense } from "./TripLicense";
import { useNavigation, useRoute } from "@react-navigation/native";

// Mock navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe("TripLicense", () => {
  const mockNavigate = jest.fn();
  const mockRoute = {
    params: {
      selectedSpot: {
        id: "1",
        name: "Test Spot",
        lat: 0,
        lon: 0,
      },
      weather: {
        description: "Sunny",
        temperature: 25,
        windSpeed: 10,
        icon: "01d",
      },
    },
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    (useRoute as jest.Mock).mockReturnValue(mockRoute);
    jest.clearAllMocks();
  });

  it("renders correctly with default items", () => {
    const { getByTestId } = render(<TripLicense />);
    
    expect(getByTestId("license-text")).toBeTruthy();
    expect(getByTestId("license-note")).toBeTruthy();
    expect(getByTestId("skip-button")).toBeTruthy();
    expect(getByTestId("exit-button")).toBeTruthy();
    expect(getByTestId("next-button")).toBeTruthy();
  });

  it("navigates to TripEndTime when skip button is pressed", () => {
    const { getByTestId } = render(<TripLicense />);
    
    fireEvent.press(getByTestId("skip-button"));
    expect(mockNavigate).toHaveBeenCalledWith("TripEndTime", {
      selectedSpot: mockRoute.params.selectedSpot,
      weather: mockRoute.params.weather,
    });
  });

  it("navigates to Dashboard when exit button is pressed", () => {
    const { getByTestId } = render(<TripLicense />);
    
    fireEvent.press(getByTestId("exit-button"));
    expect(mockNavigate).toHaveBeenCalledWith("Dashboard", {
      tripStarted: false,
      selectedSpot: mockRoute.params.selectedSpot,
      weather: mockRoute.params.weather,
      endTime: 0,
      startTime: 0,
    });
  });

  it("navigates to TripEndTime when next button is pressed", () => {
    const { getByTestId } = render(<TripLicense />);
    
    fireEvent.press(getByTestId("next-button"));
    expect(mockNavigate).toHaveBeenCalledWith("TripEndTime", {
      selectedSpot: mockRoute.params.selectedSpot,
      weather: mockRoute.params.weather,
    });
  });
}); 