import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  SafeAreaView,
  Button,
} from "react-native";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import { mockWeather, mockUser } from "../data/mockData";
import { SCREENS } from "../constants/screens";

import { useNavigation } from "@react-navigation/native";

export default function HomeDashboardScreen() {
  const navigation = useNavigation();
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>{greeting},</Text>
              <Text style={styles.tagline}>Ready to catch some fish?</Text>
            </View>
            <View style={styles.profileContainer}>
              <View style={styles.profileImageWrapper}>
                <Image
                  source={{ uri: mockUser.photo }}
                  style={styles.profileImage}
                />
              </View>
            </View>
          </View>

          <View style={styles.weatherSection}>
            <WeatherCard
              location={mockWeather.location}
              temperature={mockWeather.temp}
              condition={mockWeather.condition}
              suggestion={mockWeather.suggestion}
            />
          </View>
          {/* {Temporary Button} */}
          <Button
            title="Go to Home Screen"
            onPress={() => navigation.navigate(SCREENS.Home)}
          />

          {/* TODO: Catch Stats, etc. */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // Deep navy
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    paddingTop: 16,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    color: "#e0f2fe",
    fontSize: 18,
    fontWeight: "600",
    opacity: 0.9,
  },
  profileContainer: {
    marginLeft: 20,
  },
  profileImageWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  weatherSection: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
});
