import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoginContent from "./LoginContent";
import { strings } from "../../common/strings";

// Mock navigation
const mockNavigateToSignup = jest.fn();
const mockNavigateToResetPassword = jest.fn();
const mockHandleLogin = jest.fn();

describe("LoginContent", () => {
  const defaultProps = {
    email: "",
    setEmail: jest.fn(),
    password: "",
    setPassword: jest.fn(),
    handleLogin: mockHandleLogin,
    navigateToSignup: mockNavigateToSignup,
    navigateToResetPassword: mockNavigateToResetPassword,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls handleLogin when login button is pressed", () => {
    const { getByText } = render(<LoginContent {...defaultProps} />);

    fireEvent.press(getByText("Login"));
    expect(mockHandleLogin).toHaveBeenCalled();
  });

  it("calls navigateToSignup when sign up link is pressed", () => {
    const { getByText } = render(<LoginContent {...defaultProps} />);

    fireEvent.press(getByText("Sign Up"));
    expect(mockNavigateToSignup).toHaveBeenCalled();
  });

  it("calls navigateToResetPassword when forgot password link is pressed", () => {
    const { getByText } = render(<LoginContent {...defaultProps} />);

    fireEvent.press(getByText("Forgot Password?"));
    expect(mockNavigateToResetPassword).toHaveBeenCalled();
  });
});
