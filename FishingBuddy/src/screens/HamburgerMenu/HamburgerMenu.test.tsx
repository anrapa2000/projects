import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HamburgerMenu from "./HamburgerMenu";
import { SCREENS } from "../../constants/screens";
import { strings } from "../../common/strings";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetToLogin } from "../../navigation/RootNavigation";
import { deleteProfile } from "../../services/profileStorage";

// Mock navigation
const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    dispatch: mockDispatch,
  }),
}));

// Mock firebase auth
jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  clear: jest.fn(),
}));

// Mock profile storage
jest.mock("../../services/profileStorage", () => ({
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
    expect(getByText("Reset Storage")).toBeTruthy();
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

  it("handles dev reset correctly", async () => {
    const { getByText } = render(<HamburgerMenu />);

    await fireEvent.press(getByText("Reset Storage"));

    expect(AsyncStorage.clear).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        index: 0,
        routes: [{ name: "Entry" }],
      })
    );
  });
}); 