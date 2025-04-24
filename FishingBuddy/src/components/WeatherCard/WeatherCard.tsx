import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { WeatherCardProps } from "../../types/types";
import { strings } from "../../common/strings";
import { weatherCardStyles as styles } from "./weatherCardStyles";

const { weatherCard } = strings;

export default function WeatherCard({
  location,
  temperature,
  condition,
  suggestion,
}: WeatherCardProps) {
  const weatherIcon =
    condition === "Sunny"
      ? require("../../assets/icons/sun.png")
      : require("../../assets/icons/cloud.png");

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>{location}</Text>
        </View>
        <Image
          testID="weather-icon"
          source={weatherIcon}
          style={[styles.icon]}
        />
      </View>

      <View style={styles.weatherInfo}>
        <Text style={styles.temp}>
          {weatherCard.temperature.replace(
            "{{temperature}}",
            temperature.toString()
          )}
        </Text>
        <Text style={styles.condition}>
          {weatherCard.condition.replace("{{condition}}", condition)}
        </Text>
      </View>

      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionLabel}>{weatherCard.fishingTip}</Text>
        <Text style={styles.suggestion}>
          {weatherCard.suggestion.replace("{{suggestion}}", suggestion)}
        </Text>
      </View>
    </View>
  );
}
