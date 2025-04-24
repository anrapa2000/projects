import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InputField from "./InputField";
import { TestWrapper } from "../../test-utils/testWrapper";

describe("InputField Component", () => {
  const renderWithWrapper = (component: React.ReactElement) => {
    return render(component, { wrapper: TestWrapper });
  };

  it("renders correctly with default props", () => {
    const { getByPlaceholderText, getByTestId } = renderWithWrapper(
      <InputField
        icon="mail-outline"
        placeholder="Enter email"
        value=""
        onChangeText={() => {}}
      />
    );

    expect(getByPlaceholderText("Enter email")).toBeTruthy();
    expect(getByTestId("input-field-icon")).toBeTruthy();
  });

  it("calls onChangeText when text is entered", () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = renderWithWrapper(
      <InputField
        icon="mail-outline"
        placeholder="Enter email"
        value=""
        onChangeText={mockOnChangeText}
      />
    );

    const input = getByPlaceholderText("Enter email");
    fireEvent.changeText(input, "test@example.com");
    expect(mockOnChangeText).toHaveBeenCalledWith("test@example.com");
  });

  it("renders with secure text entry when secure prop is true", () => {
    const { getByPlaceholderText } = renderWithWrapper(
      <InputField
        icon="lock-closed-outline"
        placeholder="Enter password"
        secure={true}
        value=""
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText("Enter password");
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("renders as read-only when readOnly prop is true", () => {
    const { getByPlaceholderText } = renderWithWrapper(
      <InputField
        icon="mail-outline"
        placeholder="Read only field"
        readOnly={true}
        value="readonly value"
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText("Read only field");
    expect(input.props.editable).toBe(false);
    expect(input.props.value).toBe("readonly value");
  });

  it("renders with multiline when multiline prop is true", () => {
    const { getByPlaceholderText } = renderWithWrapper(
      <InputField
        icon="text-outline"
        placeholder="Enter text"
        multiline={true}
        value=""
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText("Enter text");
    expect(input.props.multiline).toBe(true);
  });

  it("calls onFocus when input is focused", () => {
    const mockOnFocus = jest.fn();
    const { getByPlaceholderText } = renderWithWrapper(
      <InputField
        icon="mail-outline"
        placeholder="Enter email"
        value=""
        onChangeText={() => {}}
        onFocus={mockOnFocus}
      />
    );

    const input = getByPlaceholderText("Enter email");
    fireEvent(input, "focus");
    expect(mockOnFocus).toHaveBeenCalled();
  });

  it("renders with custom keyboard type", () => {
    const { getByPlaceholderText } = renderWithWrapper(
      <InputField
        icon="mail-outline"
        placeholder="Enter email"
        keyboardType="email-address"
        value=""
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText("Enter email");
    expect(input.props.keyboardType).toBe("email-address");
  });

  it("renders with custom autoCapitalize setting", () => {
    const { getByPlaceholderText } = renderWithWrapper(
      <InputField
        icon="mail-outline"
        placeholder="Enter email"
        autoCapitalize="words"
        value=""
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText("Enter email");
    expect(input.props.autoCapitalize).toBe("words");
  });
});
