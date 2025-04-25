import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WelcomeContent from "./WelcomeContent";
import { strings } from "../../common/strings";

jest.mock("./welcomeStyles", () => ({
  welcomeStyles: {
    button: {
      backgroundColor: "red",
    },
  },
}));

describe("WelcomeContent", () => {
  const mockOnSignIn = jest.fn();
  const mockOnCreateProfile = jest.fn();
  const welcomeStrings = strings.welcome.intro;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title and subtitle correctly", () => {
    const { getByText } = render(
      <WelcomeContent
        onSignIn={mockOnSignIn}
        onCreateProfile={mockOnCreateProfile}
      />
    );

    expect(getByText(welcomeStrings.title)).toBeTruthy();
    expect(getByText(welcomeStrings.subtitle)).toBeTruthy();
  });

  it("renders the Sign In button and triggers onSignIn when pressed", () => {
    const { getByText } = render(
      <WelcomeContent
        onSignIn={mockOnSignIn}
        onCreateProfile={mockOnCreateProfile}
      />
    );

    const signInButton = getByText("Sign In");
    expect(signInButton).toBeTruthy();

    fireEvent.press(signInButton);
    expect(mockOnSignIn).toHaveBeenCalledTimes(1);
  });

  it("renders the Create Profile button and triggers onCreateProfile when pressed", () => {
    const { getByText } = render(
      <WelcomeContent
        onSignIn={mockOnSignIn}
        onCreateProfile={mockOnCreateProfile}
      />
    );

    const createProfileButton = getByText("Create Profile");
    expect(createProfileButton).toBeTruthy();

    fireEvent.press(createProfileButton);
    expect(mockOnCreateProfile).toHaveBeenCalledTimes(1);
  });
});
