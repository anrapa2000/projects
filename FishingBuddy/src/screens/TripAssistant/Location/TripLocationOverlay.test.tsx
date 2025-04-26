import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TripLocationOverlay from "./TripLocationOverlay";
import { useNavigation } from "@react-navigation/native";

// Mock navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("TripLocationOverlay", () => {
  const mockNavigate = jest.fn();
  const mockLocation = {
    coords: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  };

  const mockSelectedSpot = {
    id: "1",
    name: "Test Spot",
    lat: 37.7749,
    lon: -122.4194,
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    jest.clearAllMocks();
  });

  it("renders legend items correctly", () => {
    const { getByTestId } = render(
      <TripLocationOverlay
        location={mockLocation}
        selectedSpot={null}
        navigation={{ navigate: mockNavigate }}
      />
    );

    expect(getByTestId("default-spot-dot")).toBeTruthy();
    expect(getByTestId("default-spot-text")).toBeTruthy();
    expect(getByTestId("favorite-spot-dot")).toBeTruthy();
    expect(getByTestId("favorite-spot-text")).toBeTruthy();
    expect(getByTestId("selected-spot-dot")).toBeTruthy();
    expect(getByTestId("selected-spot-text")).toBeTruthy();
    expect(getByTestId("user-dot")).toBeTruthy();
    expect(getByTestId("user-text")).toBeTruthy();
  });

  it("shows selected spot state", () => {
    const { getByTestId } = render(
      <TripLocationOverlay
        location={mockLocation}
        selectedSpot={mockSelectedSpot}
        navigation={{ navigate: mockNavigate }}
      />
    );

    expect(getByTestId("selected-spot-name")).toBeTruthy();
    expect(getByTestId("next-button")).toBeTruthy();
  });

  it("navigates to TripWeather when next button is pressed", () => {
    const { getByTestId } = render(
      <TripLocationOverlay
        location={mockLocation}
        selectedSpot={mockSelectedSpot}
        navigation={{ navigate: mockNavigate }}
      />
    );

    fireEvent.press(getByTestId("next-button"));
    expect(mockNavigate).toHaveBeenCalledWith("TripWeather", {
      selectedSpot: mockSelectedSpot,
    });
  });
}); 