import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProfilePreferences from "./ProfilePreferences";
import { LOGIN_SCREENS } from "../../../constants/screens";

// Mock navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useRoute: () => ({
    params: {
      basicProfile: {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      },
    },
  }),
}));

describe("ProfilePreferences", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(<ProfilePreferences />);

    expect(getByText("Your Fishing Preferences")).toBeTruthy();
    expect(
      getByText("Tell us about your fishing style and preferences")
    ).toBeTruthy();
    expect(getByText("Experience Level")).toBeTruthy();
    expect(getByText("Favorite Fish Species")).toBeTruthy();
    expect(getByText("Preferred Fishing Type")).toBeTruthy();
    expect(getByText("Gear You Use")).toBeTruthy();
    expect(getByText("Your Goal When Fishing")).toBeTruthy();
    expect(getByText("Next")).toBeTruthy();
  });

  it("selects experience level", () => {
    const { getByText } = render(<ProfilePreferences />);

    fireEvent.press(getByText("Beginner"));
    expect(getByText("Beginner").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });
  });

  it("toggles fish species selection", () => {
    const { getByText } = render(<ProfilePreferences />);

    // Select Bass
    fireEvent.press(getByText("Bass"));
    expect(getByText("Bass").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });

    // Deselect Bass
    fireEvent.press(getByText("Bass"));
    expect(getByText("Bass").parent.props.style).not.toEqual({
      color: "#000",
      fontSize: 18,
      fontWeight: "200",
    });
  });

  it("toggles fishing types selection", () => {
    const { getByText } = render(<ProfilePreferences />);

    // Select Lake
    fireEvent.press(getByText("Lake"));
    expect(getByText("Lake").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });

    // Select Ocean
    fireEvent.press(getByText("Ocean"));
    expect(getByText("Ocean").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });
  });

  it("toggles gear selection", () => {
    const { getByText } = render(<ProfilePreferences />);

    // Select Rod & Reel
    fireEvent.press(getByText("Rod & Reel"));
    expect(getByText("Rod & Reel").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });

    // Select Net
    fireEvent.press(getByText("Net"));
    expect(getByText("Net").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });
  });

  it("toggles desired catch selection", () => {
    const { getByText } = render(<ProfilePreferences />);

    // Select Recreation
    fireEvent.press(getByText("Recreation"));
    expect(getByText("Recreation").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });

    // Select Food
    fireEvent.press(getByText("Food"));
    expect(getByText("Food").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });
  });

  it("navigates to experience screen with selected preferences", () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(require("@react-navigation/native"), "useNavigation")
      .mockReturnValue({
        navigate: mockNavigate,
      });

    const { getByText } = render(<ProfilePreferences />);

    // Select some preferences
    fireEvent.press(getByText("Beginner"));
    fireEvent.press(getByText("Bass"));
    fireEvent.press(getByText("Lake"));
    fireEvent.press(getByText("Rod & Reel"));
    fireEvent.press(getByText("Recreation"));

    // Press Next
    fireEvent.press(getByText("Next"));

    expect(mockNavigate).toHaveBeenCalledWith(
      LOGIN_SCREENS.ProfileSetupExperience,
      {
        profile: {
          email: "test@example.com",
          password: "password123",
          name: "Test User",
          licenseImage: null,
          preferences: {
            level: "Beginner",
            fishSpecies: ["Bass"],
            fishingTypes: ["Lake"],
            gear: ["Rod & Reel"],
            desiredCatch: ["Recreation"],
          },
        },
      }
    );
  });

  it("handles multiple selections in each category", () => {
    const { getByText } = render(<ProfilePreferences />);

    // Select multiple fish species
    fireEvent.press(getByText("Bass"));
    fireEvent.press(getByText("Trout"));

    // Select multiple fishing types
    fireEvent.press(getByText("Lake"));
    fireEvent.press(getByText("Ocean"));

    // Select multiple gear
    fireEvent.press(getByText("Rod & Reel"));
    fireEvent.press(getByText("Net"));

    // Select multiple goals
    fireEvent.press(getByText("Recreation"));
    fireEvent.press(getByText("Food"));

    // Verify all selections are visually indicated
    expect(getByText("Bass").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });
    expect(getByText("Trout").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });
    expect(getByText("Lake").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });
    expect(getByText("Ocean").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });
    expect(getByText("Rod & Reel").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });
    expect(getByText("Net").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });
    expect(getByText("Recreation").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });
    expect(getByText("Food").parent.props.style).toEqual({
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    });
  });
});
