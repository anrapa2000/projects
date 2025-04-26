import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AppInformation from "./AppInformation";
import { LOGIN_SCREENS } from "../../constants/screens";
import { appInfoFeatures } from "../../data/appInfoData";

// Mock navigation
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe("AppInformation", () => {
  it("renders correctly with all features", () => {
    const { getByText, getAllByTestId } = render(<AppInformation />);

    // Check header text
    expect(getByText("Welcome to FishingBuddy!")).toBeTruthy();
    expect(getByText("Your smart fishing companion")).toBeTruthy();

    // Check if all features are rendered
    const featureCards = getAllByTestId("feature-card");
    expect(featureCards.length).toBe(appInfoFeatures.length);

    // Check if each feature's title and description is rendered
    appInfoFeatures.forEach((feature) => {
      expect(getByText(feature.title)).toBeTruthy();
      expect(getByText(feature.description)).toBeTruthy();
    });

    // Check if Get Started button is rendered
    expect(getByText("Get Started")).toBeTruthy();
  });

  it("navigates to ProfileSetupUserAccount when Get Started button is pressed", () => {
    const { getByText } = render(<AppInformation />);
    // Get the get started button
    const getStartedButton = getByText("Get Started");
    // Press the get started button
    fireEvent.press(getStartedButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      LOGIN_SCREENS.ProfileSetupUserAccount
    );
  });

  it("renders feature icons correctly", () => {
    const { getAllByTestId } = render(<AppInformation />);
    // Get all the feature icons
    const iconContainers = getAllByTestId("feature-icon");
    // Check if the number of feature icons is equal to the number of features
    expect(iconContainers.length).toBe(appInfoFeatures.length);
  });

  it("renders scrollable content", () => {
    const { getByTestId } = render(<AppInformation />);
    // Get the scroll view
    const scrollView = getByTestId("features-scrollview");
    expect(scrollView.props.showsVerticalScrollIndicator).toBe(false);
  });
});
