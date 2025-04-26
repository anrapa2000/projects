import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HamburgerMenu from "./HamburgerMenu";
import { SCREENS } from "../../constants/screens";
import { strings } from "../../common/strings";
import { signOut } from "firebase/auth";
import { resetToLogin } from "../../navigation/RootNavigation";
import { deleteProfile } from "../../services/profileStorage/profileStorage";

// Mock navigation
const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    dispatch: mockDispatch,
  }),
  CommonActions: {
    reset: jest.fn(),
  },
}));

// Mock firebase auth
jest.mock("firebase/auth", () => {
  const mockAuth = {
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
  };
  return {
    getAuth: jest.fn(() => mockAuth),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
  };
});

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  clear: jest.fn(),
}));

// Mock profile storage
jest.mock("../../services/profileStorage/profileStorage", () => ({
  deleteProfile: jest.fn(),
}));

// Mock root navigation
jest.mock("../../navigation/RootNavigation", () => ({
  resetToLogin: jest.fn(),
}));

describe("HamburgerMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with all menu items", () => {
    const { getByText, getAllByTestId } = render(<HamburgerMenu />);

    // Check header
    expect(getByText(strings.appName)).toBeTruthy();

    // Check menu items
    const menuItems = getAllByTestId("menu-item");
    expect(menuItems.length).toBe(5); // 5 menu items

    // Check if all menu items are rendered with correct text
    expect(getByText(strings.hamburgerMenu.logCatch)).toBeTruthy();
    expect(getByText(strings.hamburgerMenu.viewCatchHistory)).toBeTruthy();
    expect(getByText(strings.hamburgerMenu.viewMap)).toBeTruthy();
    expect(getByText(strings.hamburgerMenu.profile)).toBeTruthy();
    expect(getByText(strings.hamburgerMenu.helpfulLinks)).toBeTruthy();

    // Check footer buttons
    expect(getByText(strings.hamburgerMenu.logout)).toBeTruthy();
  });

  it("navigates to correct screens when menu items are pressed", () => {
    const { getByText } = render(<HamburgerMenu />);

    // Test Log Catch navigation
    fireEvent.press(getByText(strings.hamburgerMenu.logCatch));
    expect(mockNavigate).toHaveBeenCalledWith(SCREENS.LogCatch);

    // Test Catch History navigation
    fireEvent.press(getByText(strings.hamburgerMenu.viewCatchHistory));
    expect(mockNavigate).toHaveBeenCalledWith(SCREENS.CatchHistory);

    // Test Map navigation
    fireEvent.press(getByText(strings.hamburgerMenu.viewMap));
    expect(mockNavigate).toHaveBeenCalledWith(SCREENS.Map);

    // Test Profile navigation
    fireEvent.press(getByText(strings.hamburgerMenu.profile));
    expect(mockNavigate).toHaveBeenCalledWith(SCREENS.Profile);

    // Test Helpful Links navigation
    fireEvent.press(getByText(strings.hamburgerMenu.helpfulLinks));
    expect(mockNavigate).toHaveBeenCalledWith(SCREENS.HelpFulLinks);
  });

  it("handles logout correctly", async () => {
    const { getByText } = render(<HamburgerMenu />);

    await fireEvent.press(getByText(strings.hamburgerMenu.logout));

    expect(deleteProfile).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalled();
    expect(resetToLogin).toHaveBeenCalled();
  });
});
