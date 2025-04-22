import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";

type Props = {
  location: string;
  temperature: number;
  condition: string;
  suggestion: string;
};

export default function WeatherCard({
  location,
  temperature,
  condition,
  suggestion,
}: Props) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 7000,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const weatherIcon =
    condition === "Sunny"
      ? require("../../assets/icons/sun.png")
      : require("../../assets/icons/cloud.png");

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.location}>{location}</Text>
        <Animated.Image
          source={weatherIcon}
          style={[styles.icon, { transform: [{ rotate: spin }] }]}
        />
      </View>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temp}>{temperature}°C</Text>
        <Text style={styles.condition}>{condition}</Text>
      </View>
      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionLabel}>Fishing Tip</Text>
        <Text style={styles.suggestion}>{suggestion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  location: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  temperatureContainer: {
    marginBottom: 12,
  },
  temp: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 2,
  },
  condition: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "500",
  },
  suggestionContainer: {
    backgroundColor: "rgba(144, 224, 239, 0.1)",
    borderRadius: 12,
    padding: 12,
  },
  suggestionLabel: {
    color: "#90e0ef",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  suggestion: {
    color: "#90e0ef",
    fontSize: 14,
    lineHeight: 20,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
