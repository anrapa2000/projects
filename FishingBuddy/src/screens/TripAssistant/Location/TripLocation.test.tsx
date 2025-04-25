import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import TripLocation from "./TripLocation";
import * as mapUtils from "../../../utils/map/mapUtils";
import { colors } from "../../../theme/colors";
import { Alert } from "react-native";

jest.mock("../../../utils/map/mapUtils", () => ({
  getCurrentLocation: jest.fn(),
  getNearbySpots: jest.fn(),
  getFavoriteSpotIds: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
  useRoute: jest.fn(() => ({
    name: "TripLocation", // Mock the current route name
  })),
}));

jest.mock("../../../common/strings", () => ({
  strings: {
    tripAssistant: {
      location: {
        title: "Trip Location",
        map: {
          loading: "Loading map...",
          yourLocation: "Your Location",
        },
        key: {
          spots: "Spots",
        },
        overlay: {
          defaultSpot: "Default Spot",
          noSpot: "No spots found",
        },
        button: {
          skip: "Skip",
        },
      },
    },
  },
}));

jest.mock("react-native-maps", () => {
  const React = require("react");
  const { View } = require("react-native");
  const MockMapView = (props: any) => (
    <View testID="mock-map-view">{props.children}</View>
  );
  const MockMarker = (props: any) => (
    <View
      testID={`mock-marker-${props.testID}`}
      style={{ backgroundColor: props.pinColor || "transparent" }}
    >
      {props.children}
    </View>
  );
  return { __esModule: true, default: MockMapView, Marker: MockMarker };
});

describe("TripLocation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when location is not available", async () => {
    (mapUtils.getCurrentLocation as jest.Mock).mockResolvedValue(null);

    const { getByTestId } = render(<TripLocation />);

    expect(getByTestId("loading-indicator")).toBeTruthy();
    expect(getByTestId("loading-text").props.children).toBe("Loading map...");
  });

  it("renders map and markers when location is available", async () => {
    const mockLocation = {
      coords: { latitude: 37.7749, longitude: -122.4194 },
    };
    const mockNearbySpots = [
      { id: "1", name: "Spot 1", lat: 37.775, lon: -122.419 },
      { id: "2", name: "Spot 2", lat: 37.776, lon: -122.418 },
    ];
    const mockFavoriteSpotIds = ["1"];

    (mapUtils.getCurrentLocation as jest.Mock).mockResolvedValue(mockLocation);
    (mapUtils.getNearbySpots as jest.Mock).mockReturnValue(mockNearbySpots);
    (mapUtils.getFavoriteSpotIds as jest.Mock).mockResolvedValue(
      mockFavoriteSpotIds
    );

    const { getByTestId, queryByTestId } = render(<TripLocation />);

    await waitFor(() => expect(queryByTestId("loading-indicator")).toBeNull());

    expect(getByTestId("mock-map-view")).toBeTruthy();
    expect(getByTestId("mock-marker-user-marker")).toBeTruthy();

    mockNearbySpots.forEach((spot) => {
      expect(getByTestId(`mock-marker-spot-marker-${spot.id}`)).toBeTruthy();
    });
  });

  it("highlights selected spot marker", async () => {
    const mockLocation = {
      coords: { latitude: 37.7749, longitude: -122.4194 },
    };
    const mockNearbySpots = [
      { id: "1", name: "Spot 1", lat: 37.775, lon: -122.419 },
      { id: "2", name: "Spot 2", lat: 37.776, lon: -122.418 },
    ];

    (mapUtils.getCurrentLocation as jest.Mock).mockResolvedValue(mockLocation);
    (mapUtils.getNearbySpots as jest.Mock).mockReturnValue(mockNearbySpots);
    (mapUtils.getFavoriteSpotIds as jest.Mock).mockResolvedValue([]);

    const { getByTestId } = render(<TripLocation />);

    await waitFor(() => expect(getByTestId("mock-map-view")).toBeTruthy());

    const spotMarker = getByTestId("mock-marker-spot-marker-1");
    fireEvent.press(spotMarker);

    expect(spotMarker.props.style.backgroundColor).toBe(colors.spot.selected);
  });

  it("shows an alert if location cannot be fetched", async () => {
    (mapUtils.getCurrentLocation as jest.Mock).mockResolvedValue(null);

    const alertSpy = jest.spyOn(Alert, "alert");

    render(<TripLocation />);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Location Error",
        "Unable to fetch location."
      );
    });
  });
});
