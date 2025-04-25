import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { OTPVerification } from "./OTPVerification";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useProfile } from "../../contexts/ProfileContext";
import { resetToMain } from "../../navigation/RootNavigation";
import { Alert } from "react-native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock("../../contexts/ProfileContext", () => ({
  useProfile: jest.fn(),
}));

jest.mock("../../navigation/RootNavigation", () => ({
  resetToMain: jest.fn(),
}));

describe("OTPVerification", () => {
  const mockNavigate = jest.fn();
  const mockAlert = jest.spyOn(Alert, "alert").mockImplementation(() => {}); // Mock Alert.alert
  const mockRouteParams = {
    sentOtp: "123456",
    email: "test@example.com",
    password: "password123",
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    (useRoute as jest.Mock).mockReturnValue({ params: mockRouteParams });
    (useProfile as jest.Mock).mockReturnValue({
      profile: true,
      loading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<OTPVerification />);

    expect(getByText("Verify Your Email")).toBeTruthy();
    expect(
      getByText("We've sent a verification code to test@example.com")
    ).toBeTruthy();
    expect(getByPlaceholderText("Enter OTP")).toBeTruthy();
    expect(getByText("Verify")).toBeTruthy();
    expect(getByText("Back to Login")).toBeTruthy();
  });

  it("displays an error message when OTP is invalid", async () => {
    const { getByTestId, getByText } = render(<OTPVerification />);

    const otpInput = getByTestId("otp-input");
    const verifyButton = getByTestId("otp-verify-button");

    fireEvent.changeText(otpInput, "654321");
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(getByText("Invalid OTP. Please try again.")).toBeTruthy();
    });
  });

  it("navigates to the main screen when OTP is valid", async () => {
    const { getByTestId } = render(<OTPVerification />);

    const otpInput = getByTestId("otp-input");
    const verifyButton = getByTestId("otp-verify-button");

    fireEvent.changeText(otpInput, "123456");
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(resetToMain).toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalledWith(
        "Successfully verified",
        "Welcome to Fishing Buddy!"
      );
    });
  });

  it("navigates back to the login screen when 'Back to Login' is pressed", () => {
    const { getByTestId } = render(<OTPVerification />);

    const backToLoginButton = getByTestId("otp-login-button");
    fireEvent.press(backToLoginButton);

    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });
});
