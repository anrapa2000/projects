import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ProfileSetupExperienceScreen from "./ProfileExperiences";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase/firebase";
import { saveProfile } from "../../../services/profileStorage/profileStorage";
import { waitForAuthUser } from "../../../utils/authentication/authentication";
import { resetToMain } from "../../../navigation/RootNavigation";

// Mock Alert
const mockAlert = jest.fn();

// Mock Firebase auth
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(),
}));

// Mock profile storage
jest.mock("../../../services/profileStorage/profileStorage", () => ({
  saveProfile: jest.fn(),
}));

// Mock authentication utils
jest.mock("../../../utils/authentication/authentication", () => ({
  waitForAuthUser: jest.fn(),
}));

// Mock RootNavigation
jest.mock("../../../navigation/RootNavigation", () => ({
  resetToMain: jest.fn(),
}));

// Mock navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useRoute: () => ({
    params: {
      profile: {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      },
    },
  }),
}));

describe("ProfileSetupExperienceScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<ProfileSetupExperienceScreen />);
    
    expect(getByText("Your Fishing Experience")).toBeTruthy();
    expect(getByText("Share your fishing journey with us")).toBeTruthy();
    expect(getByText("Total Catches")).toBeTruthy();
    expect(getByText("Biggest Catch")).toBeTruthy();
    expect(getByText("Locations You've Fished")).toBeTruthy();
    expect(getByText("Finish")).toBeTruthy();
  });
}); 