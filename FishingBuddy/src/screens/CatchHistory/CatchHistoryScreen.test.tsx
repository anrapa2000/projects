import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import CatchHistoryScreen from "./CatchHistoryScreen";
import { getCatches } from "../../services/storage/storage";
import { colors } from "../../theme/colors";

// Mock the getCatches function
jest.mock("../../services/storage/storage", () => ({
  getCatches: jest.fn(),
}));

// Mock the MaterialCommunityIcons icon
jest.mock("react-native-vector-icons/MaterialCommunityIcons", () => "Icon");

// Mock the navigation function
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe("CatchHistoryScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state correctly", async () => {
    (getCatches as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const { getByText, getByTestId } = render(<CatchHistoryScreen />);

    expect(getByText("Your Catch History")).toBeTruthy();
    expect(getByTestId("activity-indicator")).toBeTruthy();
    expect(getByText("Loading your catches...")).toBeTruthy();
  });

  it("renders empty state when no catches are available", async () => {
    (getCatches as jest.Mock).mockResolvedValue([]);

    const { getByText, getByTestId } = render(<CatchHistoryScreen />);

    await waitFor(() => {
      expect(getByTestId("fish-off-icon")).toBeTruthy();
      expect(getByText("No catches logged yet")).toBeTruthy();
      expect(getByText("Time to cast your line!")).toBeTruthy();
    });
  });

  it("renders catch list when catches are available", async () => {
    const mockCatches = [
      {
        id: "1",
        fishType: "Salmon",
        size: "15 inches",
        timestamp: Date.now(),
        location: "Lake Tahoe",
        image: "https://example.com/salmon.jpg",
      },
      {
        id: "2",
        fishType: "Trout",
        size: "10 inches",
        timestamp: Date.now(),
        location: "River Nile",
        image: "https://example.com/trout.jpg",
      },
    ];

    (getCatches as jest.Mock).mockResolvedValue(mockCatches);

    const { getByTestId, getAllByTestId, getByText } = render(
      <CatchHistoryScreen />
    );

    await waitFor(() => {
      expect(getByTestId("catches-list")).toBeTruthy();
      expect(getAllByTestId("catch-image").length).toBe(2);
      expect(getByText("Salmon")).toBeTruthy();
      expect(getByText("Trout")).toBeTruthy();
      expect(getByText("Size: 15 inches")).toBeTruthy();
      expect(getByText("Size: 10 inches")).toBeTruthy();
    });
  });

  it("navigates back when the back button is pressed", async () => {
    const { getByTestId } = render(<CatchHistoryScreen />);

    const backButton = getByTestId("back-button");
    console.log("backButton", backButton.props.onPress());
    backButton.props.onPress();

    expect(mockNavigate).toHaveBeenCalledWith("HamburgerMenu");
  });
});
// });
