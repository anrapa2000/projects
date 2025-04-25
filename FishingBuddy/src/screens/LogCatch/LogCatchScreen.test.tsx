import React, { ReactNode } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import LogCatchScreen from "./LogCatchScreen";

// Mock ImagePicker
jest.mock("expo-image-picker", () => ({
  requestCameraPermissionsAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

// Mock navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock components
jest.mock("../../components/Background/Background", () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="background">{children}</div>
  ),
}));

jest.mock("../../components/Button/Button", () => ({
  __esModule: true,
  default: ({
    onPress,
    children,
    variant,
  }: {
    onPress: () => void;
    children: ReactNode;
    variant?: string;
  }) => (
    <button onClick={onPress} data-testid={`${variant}-button`}>
      {children}
    </button>
  ),
}));

jest.mock("../../components/Text/Text", () => ({
  __esModule: true,
  default: ({
    children,
    variant,
  }: {
    children: ReactNode;
    variant?: string;
  }) => <span data-testid={variant}>{children}</span>,
}));

jest.mock("../../components/Button/BackButton", () => ({
  __esModule: true,
  default: () => <button data-testid="back-button">Back</button>,
}));

describe("LogCatchScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles image capture successfully", async () => {
    (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "granted",
    });
    (
      ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
    ).mockResolvedValue({
      status: "granted",
    });
    (ImagePicker.launchCameraAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [{ uri: "test-image-uri" }],
    });

    const { getByTestId } = render(<LogCatchScreen />);
    const imageContainer = getByTestId("image-container");

    fireEvent.press(imageContainer);

    await waitFor(() => {
      expect(ImagePicker.requestCameraPermissionsAsync).toHaveBeenCalled();
      expect(
        ImagePicker.requestMediaLibraryPermissionsAsync
      ).toHaveBeenCalled();
    });
  });

  it("shows alert if camera permission is denied", async () => {
    (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "denied",
    });
    (
      ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
    ).mockResolvedValue({
      status: "granted",
    });

    const alertSpy = jest.spyOn(Alert, "alert");
    const { getByTestId } = render(<LogCatchScreen />);
    const imageContainer = getByTestId("image-container");

    fireEvent.press(imageContainer);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Permission Denied",
        "Camera and gallery access is required to take or upload photos.",
        expect.any(Array)
      );
    });
  });
});
