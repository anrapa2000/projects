import React from "react";
import { render } from "@testing-library/react-native";
import WeatherCard from "./WeatherCard";
import { strings } from "../../common/strings";

const { weatherCard } = strings;
  
describe("WeatherCard", () => {
  const defaultProps = {
    location: "Test Location",
    temperature: 25,
    condition: "Sunny",
    suggestion: "Great day for fishing!",
  };

  it("renders correctly with default props", () => {
    const { getByText, getByTestId } = render(
      <WeatherCard {...defaultProps} />
    );

    expect(getByText(defaultProps.location)).toBeTruthy();

    expect(
      getByText(
        weatherCard.temperature.replace(
          "{{temperature}}",
          defaultProps.temperature.toString()
        )
      )
    ).toBeTruthy();

    expect(
      getByText(
        weatherCard.condition.replace("{{condition}}", defaultProps.condition)
      )
    ).toBeTruthy();

    expect(getByText(weatherCard.fishingTip)).toBeTruthy();
    expect(
      getByText(
        weatherCard.suggestion.replace(
          "{{suggestion}}",
          defaultProps.suggestion
        )
      )
    ).toBeTruthy();

    const icon = getByTestId("weather-icon");
    expect(icon.props.source).toBe(require("../../assets/icons/sun.png"));
  });

  it("renders cloud icon for non-sunny conditions", () => {
    const { getByTestId } = render(
      <WeatherCard {...defaultProps} condition="Cloudy" />
    );

    const icon = getByTestId("weather-icon");
    expect(icon.props.source).toBe(require("../../assets/icons/cloud.png"));
  });

  it("renders with different temperature values", () => {
    const { getByText } = render(
      <WeatherCard {...defaultProps} temperature={15} />
    );

    expect(
      getByText(weatherCard.temperature.replace("{{temperature}}", "15"))
    ).toBeTruthy();
  });

  it("renders with different suggestions", () => {
    const customSuggestion = "Try fishing in deeper waters today";
    const { getByText } = render(
      <WeatherCard {...defaultProps} suggestion={customSuggestion} />
    );

    expect(
      getByText(
        weatherCard.suggestion.replace("{{suggestion}}", customSuggestion)
      )
    ).toBeTruthy();
  });
});
