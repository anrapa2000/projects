import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LOGIN_SCREENS } from "../constants/screens";
import { LinearGradient } from "expo-linear-gradient";

const features = [
  {
    title: "Log Your Catch",
    description: "Track fish with photos, GPS, and size.",
  },
  {
    title: "Explore Spots",
    description: "Find & favorite great fishing locations.",
  },
  {
    title: "Trip Assistant",
    description: "Fun checklist to prep your fishing trip.",
  },
  {
    title: "Live Weather",
    description: "Get real-time forecasts for each spot.",
  },
  {
    title: "License Reminders",
    description: "Stay legal with timely license alerts.",
  },
  {
    title: "Catch History",
    description: "View trends, track gear, and relive trips.",
  },
];

export default function AppFeaturesScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f8ff" }}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#00b894", "#0984e3"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}> Welcome to FishingBuddy</Text>
        <Text style={styles.headerSubtitle}>
          Get the most out of your fishing adventures
        </Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {features.map((feat) => (
          <View key={feat.title} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{feat.title}</Text>
              <Text style={styles.cardDesc}>{feat.description}</Text>
            </View>
          </View>
        ))}

        <Pressable
          style={styles.continueBtn}
          onPress={() =>
            navigation.navigate(LOGIN_SCREENS.ProfileSetupUserAccount)
          }
        >
          <Text style={styles.continueText}>Let's Go Fishing</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#dfe6e9",
    marginTop: 8,
    textAlign: "center",
  },
  cardContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3436",
  },
  cardDesc: {
    fontSize: 14,
    color: "#636e72",
    marginTop: 4,
  },
  continueBtn: {
    backgroundColor: "#00b894",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },
  continueText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
