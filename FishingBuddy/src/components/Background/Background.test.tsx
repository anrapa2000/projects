import React from "react";
import { render } from "@testing-library/react-native";
import { View } from "react-native";
import Background from "./Background";

describe("Background", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(
      <Background>
        <View testID="test-child" />
      </Background>
    );
    const container = getByTestId("background-container");
    expect(container).toBeTruthy();
    const child = getByTestId("test-child");
    expect(child).toBeTruthy();
  });

  it("applies custom styles correctly", () => {
    const customStyle = { backgroundColor: "red" };
    const { getByTestId } = render(
      <Background style={customStyle}>
        <View testID="test-child" />
      </Background>
    );

    const container = getByTestId("background-container");
    expect(container.props.style).toContain(customStyle);
  });

  it("renders with multiple children", () => {
    const { getByTestId } = render(
      <Background>
        <View testID="child-1" />
        <View testID="child-2" />
      </Background>
    );

    expect(getByTestId("child-1")).toBeTruthy();
    expect(getByTestId("child-2")).toBeTruthy();
  });
});
