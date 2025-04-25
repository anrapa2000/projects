import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import MapScreen from "./MapScreen";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";

// Mock expo-location
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  watchPositionAsync: jest.fn(),
  Accuracy: {
    High: "high",
  },
}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock navigation
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack }),
}));

// Mock react-native-maps
jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: ({ children, testID, ...props }: any) => (
      <View testID={testID} {...props}>
        {children}
      </View>
    ),
    Marker: ({ testID, onPress, ...props }: any) => (
      <View testID={testID} onPress={onPress} {...props} />
    ),
  };
});

jest.mock("../../components/Button/Button", () => {
  const { TouchableOpacity } = require("react-native");
  return ({ testID, onPress, ...props }: any) => (
    <TouchableOpacity testID={testID} onPress={onPress} {...props} />
  );
});

jest.mock("../../components/Text/Text", () => "Text");

describe("MapScreen", () => {
  const mockLocation = {
    coords: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  };

  const mockSpots = [
    {
      id: "1",
      name: "Test Spot 1",
      latitude: 37.7749,
      longitude: -122.4194,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue(
      {
        status: "granted",
      }
    );
    (Location.watchPositionAsync as jest.Mock).mockImplementation(
      (accuracy, callback) => {
        callback(mockLocation);
        return Promise.resolve({
          remove: jest.fn(),
        });
      }
    );
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(mockSpots)
    );
  });

  it("shows nearby spots count in overlay", async () => {
    const { getByTestId } = render(<MapScreen />);

    await waitFor(() => {
      const spotCount = getByTestId("spot-count");
      expect(spotCount).toBeTruthy();
    });
  });

  it("handles location permission denied", async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue(
      {
        status: "denied",
      }
    );

    const { getByText } = render(<MapScreen />);

    await waitFor(() => {
      expect(
        getByText("Permission to access location was denied")
      ).toBeTruthy();
    });
  });

  it("navigates back when back button is pressed", async () => {
    const { getByTestId } = render(<MapScreen />);

    await waitFor(() => {
      const backButton = getByTestId("map-back-button");
      fireEvent.press(backButton);
      expect(mockGoBack).toHaveBeenCalled();
    });
  });
});
