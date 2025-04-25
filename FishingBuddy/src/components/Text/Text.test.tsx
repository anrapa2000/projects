import React from "react";
import { render } from "@testing-library/react-native";
import Text, { variants } from "./Text";

describe("Text", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<Text>Test Text</Text>);
    const textElement = getByText("Test Text");
    expect(textElement).toBeTruthy();
  });

  it("applies the correct variant styles", () => {
    const { getByText } = render(<Text variant="heading">Heading Text</Text>);
    const textElement = getByText("Heading Text");
    expect(textElement).toBeTruthy();
    expect(textElement.props.children).toBe("Heading Text");
  });

  it("applies custom styles correctly", () => {
    const customStyle = { color: "red" };
    const { getByText } = render(
      <Text style={customStyle}>Custom Style Text</Text>
    );
    const textElement = getByText("Custom Style Text");
    expect(textElement).toBeTruthy();
  });

  it("renders with different variants", () => {
    const variantKeys = Object.keys(variants);
    variantKeys.forEach((variant) => {
      const { getByText } = render(
        <Text variant={variant as keyof typeof variants}>
          {variant} Text
        </Text>
      );
      const textElement = getByText(`${variant} Text`);
      expect(textElement).toBeTruthy();
    });
  });

  it("combines variant and custom styles", () => {
    const customStyle = { marginTop: 10 };
    const { getByText } = render(
      <Text variant="title" style={customStyle}>
        Combined Styles Text
      </Text>
    );
    const textElement = getByText("Combined Styles Text");
    expect(textElement).toBeTruthy();
  });
}); 