import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../Button";
import { TestWrapper } from "../../../test-utils/testWrapper";

describe("Button Component", () => {
  const renderWithWrapper = (component: React.ReactElement) => {
    return render(component, { wrapper: TestWrapper });
  };

  it("renders correctly with default props", () => {
    const { getByText } = renderWithWrapper(
      <Button variant="primary" onPress={() => {}} text="Click Me" />
    );
    expect(getByText("Click Me")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByText } = renderWithWrapper(
      <Button onPress={mockOnPress} text="Click Me" />
    );
    fireEvent.press(getByText("Click Me"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("renders with primary variant", () => {
    const { getByText } = renderWithWrapper(
      <Button onPress={() => {}} text="Primary" variant="primary" />
    );
    const button = getByText("Primary");
    expect(button).toBeTruthy();
  });

  it("renders with secondary variant", () => {
    const { getByText } = renderWithWrapper(
      <Button onPress={() => {}} text="Secondary" variant="secondary" />
    );
    const button = getByText("Secondary");
    expect(button).toBeTruthy();
  });

  it("renders with menuItem variant", () => {
    const { getByText } = renderWithWrapper(
      <Button onPress={() => {}} text="Menu Item" variant="menuItem" />
    );
    const button = getByText("Menu Item");
    expect(button).toBeTruthy();
  });

  it("renders with DANGER variant", () => {
    const { getByText } = renderWithWrapper(
      <Button onPress={() => {}} text="Danger" variant="DANGER" />
    );
    const button = getByText("Danger");
    expect(button).toBeTruthy();
  });

  it("renders with icon", () => {
    const { getByTestId } = renderWithWrapper(
      <Button onPress={() => {}} text="With Icon" icon="log-in-outline" />
    );
    const icon = getByTestId("button-icon");
    expect(icon).toBeTruthy();
  });

  it("renders in disabled state", () => {
    const { getByText } = renderWithWrapper(
      <Button onPress={() => {}} text="Disabled" disabled={true} />
    );
    const button = getByText("Disabled");
    expect(button).toBeTruthy();
  });

  it("does not call onPress when disabled", () => {
    const mockOnPress = jest.fn();
    const { getByText } = renderWithWrapper(
      <Button onPress={mockOnPress} text="Disabled" disabled={true} />
    );
    fireEvent.press(getByText("Disabled"));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("renders with small size", () => {
    const { getByText } = renderWithWrapper(
      <Button onPress={() => {}} text="Small" size="small" />
    );
    const button = getByText("Small");
    expect(button).toBeTruthy();
  });
});
