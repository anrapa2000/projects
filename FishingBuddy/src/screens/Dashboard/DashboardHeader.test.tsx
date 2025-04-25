import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DashboardHeader from "./DashboardHeader";
import { useProfile } from "../../contexts/ProfileContext";
import { mockUser } from "../../data/mockData";

jest.mock("../../contexts/ProfileContext", () => ({
  useProfile: jest.fn(),
}));

jest.mock("react-native-reanimated", () => ({
    ...jest.requireActual("react-native-reanimated"),
    useSharedValue: jest.fn(),
    useAnimatedStyle: jest.fn(),
    withTiming: jest.fn(),
    withSpring: jest.fn(),
    withDecay: jest.fn(),
    Easing: {
      linear: jest.fn(),
      ease: jest.fn(),
    },
  }));

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("DashboardHeader", () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the greeting with the user's name from the profile context", () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: { name: "John Doe", photo: "https://example.com/photo.jpg" },
    });

    const { getByText } = render(
      <DashboardHeader navigation={mockNavigation as any} />
    );

    const currentHour = new Date().getHours();
    const expectedGreeting =
      currentHour < 12
        ? "Good Morning"
        : currentHour < 18
        ? "Good Afternoon"
        : "Good Evening";

    expect(getByText(`${expectedGreeting}, John Doe`)).toBeTruthy();
  });

  it("renders the greeting with the mock user's name if profile is not available", () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: null,
    });

    const { getByText } = render(
      <DashboardHeader navigation={mockNavigation as any} />
    );

    const currentHour = new Date().getHours();
    const expectedGreeting =
      currentHour < 12
        ? "Good Morning"
        : currentHour < 18
        ? "Good Afternoon"
        : "Good Evening";

    expect(getByText(`${expectedGreeting}, ${mockUser.name}`)).toBeTruthy();
  });

  it("navigates to the HamburgerMenu when the menu button is pressed", () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: null,
    });

    const { getByTestId } = render(
      <DashboardHeader navigation={mockNavigation as any} />
    );

    const menuButton = getByTestId("menu-button");
    fireEvent.press(menuButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("HamburgerMenu");
  });

  it("navigates to the Profile screen when the profile image is pressed", () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: { name: "John Doe", photo: "https://example.com/photo.jpg" },
    });

    const { getByTestId } = render(
      <DashboardHeader navigation={mockNavigation as any} />
    );

    const profileImage = getByTestId("profile-image");
    fireEvent.press(profileImage);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Profile");
  });

//   it("renders the profile image with the correct source from the profile context", () => {
//     (useProfile as jest.Mock).mockReturnValue({
//       profile: { name: "John Doe", photo: "https://example.com/photo.jpg" },
//     });
  
//     const { getByTestId } = render(
//       <DashboardHeader navigation={mockNavigation as any} />
//     );
  
//     const profileImage = getByTestId("profile-image");
//     expect(profileImage.props.source.uri).toBe("https://example.com/photo.jpg");
//   });

//   it("renders the profile image with the mock user's photo if profile is not available", () => {
//     (useProfile as jest.Mock).mockReturnValue({
//       profile: null,
//     });

//     const { getByTestId } = render(
//       <DashboardHeader navigation={mockNavigation as any} />
//     );

//     const profileImage = getByTestId("profile-image");
//     expect(profileImage.props.source.uri).toBe(mockUser.photo);
//   });
});
