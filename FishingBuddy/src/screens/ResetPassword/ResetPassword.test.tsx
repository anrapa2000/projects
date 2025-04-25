import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ResetPasswordScreen from "./ResetPassword";
import { Alert } from "react-native";

// Mock firebase auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
  sendPasswordResetEmail: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, "alert");

describe("ResetPasswordScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows error alert when email is empty", async () => {
    const { getByTestId } = render(<ResetPasswordScreen />);

    await fireEvent.press(getByTestId("reset-button"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Email required",
      "Please enter your registered email."
    );
  });
});
