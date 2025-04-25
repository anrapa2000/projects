import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginScreen from "./LoginScreen";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase/firebase";
import { sendEmailWithOtp } from "../../utils/authentication/authentication";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("../../services/firebase/firebase", () => ({
  auth: {},
}));

jest.mock("../../utils/authentication/authentication", () => ({
  sendEmailWithOtp: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../../navigation/RootNavigation", () => ({
  resetToLogin: jest.fn(),
}));

describe("LoginScreen", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    jest.clearAllMocks();
  });

  it("shows an alert if email or password is missing", () => {
    const { getByText } = render(<LoginScreen />);
    const loginButton = getByText("Login");

    fireEvent.press(loginButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Missing Info",
      "Please enter both email and password."
    );
  });

  it("navigates to the signup screen", () => {
    const { getByText } = render(<LoginScreen />);
    const signupButton = getByText("Sign Up");

    fireEvent.press(signupButton);

    expect(mockNavigate).toHaveBeenCalledWith("Signup");
  });

  it("navigates to the reset password screen", () => {
    const { getByText } = render(<LoginScreen />);
    const forgotPasswordButton = getByText("Forgot Password?");

    fireEvent.press(forgotPasswordButton);

    expect(mockNavigate).toHaveBeenCalledWith("ResetPassword");
  });
});