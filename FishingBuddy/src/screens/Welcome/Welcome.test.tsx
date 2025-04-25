import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
const { useNavigation } = jest.requireMock("@react-navigation/native");
import { StatusBar } from "react-native";
import Welcome from "./Welcome";
import { LOGIN_SCREENS } from "../../constants/screens";
import { SignupScreenNavigationProp } from "../../types/navigationTypes";

// Mock the image import
jest.mock("../../assets/images/kayakHero.jpg", () => "test-image-uri");

// jest.spyOn(StatusBar, "setBarStyle").mockImplementation(() => {});

// Mock the WelcomeContent component
jest.mock("./WelcomeContent", () => {
  const React = require("react");
  const { TouchableOpacity, Text, View } = require("react-native");

  const MockWelcomeContent = ({
    onSignIn,
    onCreateProfile,
  }: {
    onSignIn: () => void;
    onCreateProfile: () => void;
  }) => (
    <View testID="welcomeContent">
      <TouchableOpacity testID="signInButton" onPress={onSignIn}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="createProfileButton" onPress={onCreateProfile}>
        <Text>Create Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return {
    __esModule: true,
    default: MockWelcomeContent,
  };
});

// Mock welcomeStyles
jest.mock("./welcomeStyles", () => ({
  welcomeStyles: {
    bg: {
      flex: 1,
      justifyContent: "flex-end",
    },
    swirlShape: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "60%",
    },
    swirlGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
}));

describe("Welcome Screen", () => {
  const mockNavigate = useNavigation().navigate;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with all components", () => {
    const { getByTestId } = render(<Welcome />);

    // Check if main components are rendered
    expect(getByTestId("imageBackground")).toBeTruthy();
    expect(getByTestId("linearGradient")).toBeTruthy();
    expect(getByTestId("welcomeContent")).toBeTruthy();
  });

  it("navigates to Login screen when Sign In is pressed", () => {
    const { getByTestId } = render(<Welcome />);
    fireEvent.press(getByTestId("signInButton"));
    expect(mockNavigate).toHaveBeenCalledWith(LOGIN_SCREENS.Login);
  });

  it("navigates to App Information screen when Create Profile is pressed", () => {
    const { getByTestId } = render(<Welcome />);
    fireEvent.press(getByTestId("createProfileButton"));
    expect(mockNavigate).toHaveBeenCalledWith(LOGIN_SCREENS.AppInformation);
  });
});
