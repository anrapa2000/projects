import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "./Button";

// Test for the Button component
describe("Button Component", () => {
  it("renders correctly with default props", () => {
    const { getByText, getByTestId } = render(<Button onPress={() => {}} />);
    expect(getByText("Login")).toBeTruthy();
    expect(getByTestId("button-icon")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<Button onPress={onPressMock} />);
    const button = getByTestId("button-icon");
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  it("renders with the primary variant", () => {
    const { getByTestId } = render(
      <Button onPress={() => {}} variant="primary" />
    );
    console.log(getByTestId("button-icon").props.style);
    const button = getByTestId("button-icon");
    expect(button.props.style).toEqual([
      { color: "#fff", fontSize: 20 },
      undefined,
      { fontFamily: undefined, fontStyle: "normal", fontWeight: "normal" },
      {},
    ]);
  });

  it("renders with the secondary variant", () => {
    const { getByText } = render(
      <Button onPress={() => {}} variant="secondary" text="Sign Up" />
    );
    expect(getByText("Sign Up")).toBeTruthy();
  });

  it("renders with the danger variant", () => {
    const { getByText, getByTestId } = render(
      <Button onPress={() => {}} variant="DANGER" text="Delete" />
    );
    expect(getByText("Delete")).toBeTruthy();
    expect(getByTestId("button-icon").props.style).toEqual([
      { color: "#dc2626", fontSize: 20 },
      undefined,
      { fontFamily: undefined, fontStyle: "normal", fontWeight: "normal" },
      {},
    ]);
  });

  it("renders with the menuItem variant", () => {
    const { getByText } = render(
      <Button onPress={() => {}} variant="menuItem" text="Menu Item" />
    );
    expect(getByText("Menu Item")).toBeTruthy();
  });

  it("renders as disabled", () => {
    const { getByTestId } = render(<Button onPress={() => {}} disabled />);
    const button = getByTestId("button-icon").parent;
    expect(button.props.style).toEqual([
      { color: "#fff", fontSize: 20 },
      undefined,
      { fontFamily: undefined, fontStyle: "normal", fontWeight: "normal" },
      {},
    ]);
  });

  it("renders with a small size", () => {
    const { getByTestId } = render(<Button onPress={() => {}} size="small" />);
    const button = getByTestId("button-icon").parent;
    expect(button.props.style).toEqual([
      { color: "#fff", fontSize: 20 },
      undefined,
      { fontFamily: undefined, fontStyle: "normal", fontWeight: "normal" },
      {},
    ]);
  });
});
