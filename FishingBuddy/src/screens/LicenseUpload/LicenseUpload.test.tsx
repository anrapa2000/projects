import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import LicenseUpload from "./LicenseUpload";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LOGIN_SCREENS } from "../../constants/screens";

jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: { Images: "Images" },
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock("../../components/Background/Background", () => "Background");
jest.mock("../../components/Button/Button", () => {
  const React = require("react");
  return (props) => <button {...props}>{props.children}</button>;
});
jest.mock("../../components/Text/Text", () => "Text");
jest.mock("../../components/Button/BackButton", () => "BackButton");

describe("LicenseUpload", () => {
  const mockNavigate = jest.fn();
  const mockRouteParams = { basicProfile: { name: "Test User" } };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    (useRoute as jest.Mock).mockReturnValue({ params: mockRouteParams });
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(<LicenseUpload />);
    expect(getByText("Upload Your Fishing License")).toBeTruthy();
    expect(
      getByText("Please upload a clear photo of your valid fishing license.*")
    ).toBeTruthy();
  });

  it("handles image selection successfully", async () => {
    (
      ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
    ).mockResolvedValueOnce({
      status: "granted",
    });
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValueOnce({
      canceled: false,
      assets: [{ uri: "test-image-uri" }],
    });

    const { getByText, getByTestId } = render(<LicenseUpload />);
    const imageContainer = getByTestId("image-container");

    fireEvent.press(imageContainer);

    await waitFor(() => {
      expect(
        ImagePicker.requestMediaLibraryPermissionsAsync
      ).toHaveBeenCalled();
      expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledWith({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });
    });

    expect(getByTestId("selected-image")).toBeTruthy();
  });

  it("shows alert if permission is denied", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    (
      ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
    ).mockResolvedValueOnce({
      status: "denied",
    });

    const { getByTestId } = render(<LicenseUpload />);
    const imageContainer = getByTestId("image-container");

    fireEvent.press(imageContainer);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Permission required",
        "Please allow access to your photos."
      );
    });
  });

  it("navigates to ProfileSetupPreferences with image on continue", async () => {
    const { getByTestId } = render(<LicenseUpload />);
    const imageContainer = getByTestId("image-container");

    (
      ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
    ).mockResolvedValueOnce({
      status: "granted",
    });
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValueOnce({
      canceled: false,
      assets: [{ uri: "test-image-uri" }],
    });

    fireEvent.press(imageContainer);

    await waitFor(() => {
      expect(getByTestId("selected-image")).toBeTruthy();
    });

    fireEvent.press(getByTestId("continue-button"));

    expect(mockNavigate).toHaveBeenCalledWith(
      LOGIN_SCREENS.ProfileSetupPreferences,
      {
        basicProfile: {
          ...mockRouteParams.basicProfile,
          licenseImage: "test-image-uri",
        },
      }
    );
  });

  it("navigates to ProfileSetupPreferences without image on skip", () => {
    const { getByTestId } = render(<LicenseUpload />);
    fireEvent.press(getByTestId("skip-button"));

    expect(mockNavigate).toHaveBeenCalledWith(
      LOGIN_SCREENS.ProfileSetupPreferences,
      {
        basicProfile: {
          ...mockRouteParams.basicProfile,
          licenseImage: null,
        },
      }
    );
  });
});
