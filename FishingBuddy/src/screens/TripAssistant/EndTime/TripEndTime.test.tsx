import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TripEndTime } from "./TripEndTime";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, View } from "react-native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

jest.mock("@react-native-community/datetimepicker", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  const MockDateTimePicker = (props) => {
    return (
      <View testID="date-time-picker">
        <Text>DateTimePicker</Text>
      </View>
    );
  };

  return {
    __esModule: true,
    default: MockDateTimePicker,
  };
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <View>{children}</View>;
};

describe("TripEndTime", () => {
  const mockNavigate = jest.fn();
  const mockRouteParams = {
    params: {
      selectedSpot: "Lake View",
      weather: "Sunny",
    },
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    (useRoute as jest.Mock).mockReturnValue(mockRouteParams);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with no selected time", () => {
    const { getByTestId, getByText } = render(
      <TestWrapper>
        <TripEndTime />
      </TestWrapper>
    );

    expect(getByTestId("no-time-text")).toBeTruthy();
    expect(getByText("Emergency Contact Number")).toBeTruthy();
    expect(getByTestId("skip-button")).toBeTruthy();
  });

  it("opens the date-time picker when 'Set Time' button is pressed", () => {
    const { getByTestId } = render(<TripEndTime />);

    fireEvent.press(getByTestId("set-time-button"));

    expect(getByTestId("date-time-picker-modal")).toBeTruthy();
  });

  it("shows an alert when 'Skip' button is pressed", () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    const { getByTestId } = render(<TripEndTime />);

    fireEvent.press(getByTestId("skip-button"));

    expect(alertSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(Array)
    );
  });

  it("updates the selected time when a date is picked", () => {
    const { getByTestId } = render(<TripEndTime />);

    fireEvent.press(getByTestId("set-time-button"));
    fireEvent(getByTestId("date-time-picker"), "onChange", null, new Date());

    expect(getByTestId("selected-time-text")).toBeTruthy();
  });
});
