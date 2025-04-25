import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ProfileScreen from "./ProfileScreen";
import { useProfile } from "../../contexts/ProfileContext";
import { resetToLogin } from "../../navigation/RootNavigation";
import { deleteProfile } from "../../services/profileStorage/profileStorage";
import { deleteUser } from "firebase/auth";
import { supabase } from "../../services/supabase/supabase";
import { Alert } from "react-native";

// Mock dependencies
jest.mock("../../contexts/ProfileContext", () => ({
  useProfile: jest.fn(),
}));
jest.mock("../../navigation/RootNavigation", () => ({
  resetToLogin: jest.fn(),
}));
jest.mock("../../services/profileStorage/profileStorage", () => ({
  deleteProfile: jest.fn(),
}));
jest.mock("firebase/auth", () => {
  const actualAuth = jest.requireActual("firebase/auth");
  return {
    ...actualAuth,
    getAuth: jest.fn(() => ({
      currentUser: { uid: "123", email: "test@example.com" },
    })),
    signInWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({ user: { uid: "123", email: "test@example.com" } })
    ),
    signOut: jest.fn(() => Promise.resolve()),
    deleteUser: jest.fn(() => Promise.resolve()),
  };
});
jest.mock("../../services/supabase/supabase", () => ({
  supabase: {
    from: jest.fn(() => ({
      delete: jest.fn(() => ({
        eq: jest.fn(() => ({ error: null })),
      })),
    })),
  },
}));

describe("ProfileScreen", () => {
  const mockClearProfile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useProfile as jest.Mock).mockReturnValue({
      profile: {
        name: "John Doe",
        email: "john.doe@example.com",
        age: 30,
        preferences: {
          level: "Intermediate",
          fishSpecies: ["Bass", "Trout"],
        },
        experience: {
          totalCaught: 50,
        },
        license: "https://example.com/license.jpg",
      },
      loading: false,
      clearProfile: mockClearProfile,
    });
  });

  it("renders loading state", () => {
    (useProfile as jest.Mock).mockReturnValue({ loading: true });
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId("content-container")).toBeTruthy();
  });

  it("renders no profile state", () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: null,
      loading: false,
    });
    const { getByText } = render(<ProfileScreen />);
    expect(getByText("⚠️ No profile data found.")).toBeTruthy();
  });

  it("renders profile information", () => {
    const { getByText, getByTestId } = render(<ProfileScreen />);
    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("john.doe@example.com")).toBeTruthy();
    expect(getByText("Age: 30")).toBeTruthy();
    expect(getByText("Level: Intermediate")).toBeTruthy();
    expect(getByText("Fish: Bass, Trout")).toBeTruthy();
    expect(getByText("Total Caught: 50")).toBeTruthy();
  });

  it("handles profile deletion", async () => {
    const { getByText } = render(<ProfileScreen />);
    const deleteButton = getByText("Reset Profile");

    fireEvent.press(deleteButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Delete Profile?",
        "This will permanently delete your account and all associated data. This action cannot be undone.",
        expect.any(Array)
      );
    });

    // Simulate pressing "Delete" in the alert
    const deleteAction = Alert.alert.mock.calls[0][2][1].onPress;
    await deleteAction();

    expect(supabase.from).toHaveBeenCalledWith("profiles");
    expect(deleteUser).toHaveBeenCalledWith({
      email: "test@example.com",
      uid: "123",
    });
    expect(deleteProfile).toHaveBeenCalled();
    expect(mockClearProfile).toHaveBeenCalled();
    expect(resetToLogin).toHaveBeenCalled();
  });

  it("handles profile deletion failure", async () => {
    (supabase.from as jest.Mock).mockReturnValueOnce({
      delete: jest.fn(() => ({
        eq: jest.fn(() => ({ error: { message: "Supabase error" } })),
      })),
    });

    const { getByText } = render(<ProfileScreen />);
    const deleteButton = getByText("Reset Profile");

    fireEvent.press(deleteButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Delete Profile?",
        "This will permanently delete your account and all associated data. This action cannot be undone.",
        expect.any(Array)
      );
    });

    // Simulate pressing "Delete" in the alert
    const deleteAction = Alert.alert.mock.calls[0][2][1].onPress;
    await deleteAction();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Failed to delete profile. Please try again later."
    );
  });
});
