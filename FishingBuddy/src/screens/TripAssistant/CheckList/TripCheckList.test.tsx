import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TripChecklist } from "./TripCheckList";
import { TRIP_SCREENS } from "../../../constants/screens";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
  useRoute: jest.fn(() => ({
    name: "TripCheckList", // Mock the current route name
  })),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock("expo-blur", () => ({
  BlurView: ({ children }: { children: React.ReactNode }) => children,
}));

describe("TripChecklist", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    jest.clearAllMocks();
  });

  it("renders the default checklist items", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    const { getByTestId } = render(<TripChecklist />);

    await waitFor(() => {
      expect(getByTestId("checklist-item-text-Fishing license")).toBeTruthy();
      expect(
        getByTestId("checklist-item-text-Fishing rod and reel combo")
      ).toBeTruthy();
    });
  });

  it("loads saved checklist items from AsyncStorage", async () => {
    const savedItems = JSON.stringify(["Custom Item 1", "Custom Item 2"]);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(savedItems);

    const { getByText } = render(<TripChecklist />);

    await waitFor(() => {
      expect(getByText("Custom Item 1")).toBeTruthy();
      expect(getByText("Custom Item 2")).toBeTruthy();
    });
  });

  it("adds a new item to the checklist", async () => {
    const { getByPlaceholderText, getByText } = render(<TripChecklist />);

    const input = getByPlaceholderText("Add custom item...");
    const addButton = getByText("Add Item");

    fireEvent.changeText(input, "New Item");
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(getByText("New Item")).toBeTruthy();
    });
  });

  it("removes a custom item from the checklist", async () => {
    const savedItems = JSON.stringify(["Custom Item"]);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(savedItems);

    const { getByText, queryByText } = render(<TripChecklist />);

    await waitFor(() => {
      expect(getByText("Custom Item")).toBeTruthy();
    });

    const removeButton = getByText("Remove");
    fireEvent.press(removeButton);

    await waitFor(() => {
      expect(queryByText("Custom Item")).toBeNull();
    });
  });

  it("toggles an item as checked or unchecked", async () => {
    const savedItems = JSON.stringify(["Custom Item"]);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(savedItems);

    const { getByTestId } = render(<TripChecklist />);

    const item = await waitFor(() => getByTestId("checklist-item-Custom Item"));
    fireEvent.press(item);

    await waitFor(() => {
      expect(item.props.style).toEqual({
        borderRadius: 16,
        marginBottom: 12,
        opacity: 1,
        overflow: "hidden",
      });
    });

    fireEvent.press(item);

    await waitFor(() => {
      expect(item.props.style).not.toContainEqual(
        expect.objectContaining({ textDecorationLine: "line-through" })
      );
    });
  });

  it("resets the checklist to default items", async () => {
    const savedItems = JSON.stringify(["Custom Item"]);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(savedItems);

    const { getByText, getByTestId, queryByText } = render(<TripChecklist />);

    await waitFor(() => {
      expect(getByText("Custom Item")).toBeTruthy();
    });

    const resetButton = getByText("Reset");
    fireEvent.press(resetButton);

    await waitFor(() => {
      expect(queryByText("Custom Item")).toBeNull();
      expect(getByTestId("checklist-item-Fishing license")).toBeTruthy();
    });
  });

  it("navigates to the next screen on continue", async () => {
    const { getByText } = render(<TripChecklist />);

    const continueButton = getByText("Continue");
    fireEvent.press(continueButton);

    expect(mockNavigate).toHaveBeenCalledWith(TRIP_SCREENS.TripLocation);
  });
});
