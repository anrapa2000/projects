import React from "react";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LOGIN_SCREENS } from "../../constants/screens";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button/Button";
import Background from "../../components/Background/Background";
import Text from "../../components/Text/Text";
import { colors } from "../../theme/colors";
import { appInfoStyles as styles } from "./appInfoStyles";

type Feature = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const features: Feature[] = [
  {
    title: "Smart Fishing Spots",
    description:
      "Discover and save your favorite fishing locations with real-time weather updates.",
    icon: "location",
  },
  {
    title: "Catch Logging",
    description:
      "Record your catches with photos, location, and details to track your fishing journey.",
    icon: "fish",
  },
  {
    title: "Weather Insights",
    description:
      "Get detailed weather forecasts for your fishing spots to plan the perfect trip.",
    icon: "partly-sunny",
  },
  {
    title: "Trip Management",
    description:
      "Start and track your fishing trips with automatic weather and location updates.",
    icon: "compass",
  },
  {
    title: "Catch History",
    description:
      "View your fishing history, track patterns, and relive your best catches.",
    icon: "time",
  },
];

export default function AppFeaturesScreen() {
  const navigation = useNavigation<any>();

  return (
    <Background>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text variant="heading2" style={styles.headerTitle}>
              Welcome to FishingBuddy!
            </Text>
            <Text variant="subtitle" style={styles.headerSubtitle}>
              Your smart fishing companion
            </Text>
          </View>

          <View style={styles.cardContainer}>
            {/* <ScrollView
            contentContainerStyle={styles.cardContainer}
            showsVerticalScrollIndicator={false}
          > */}
            {features.map((feat) => (
              <View key={feat.title} style={styles.card}>
                <View style={styles.iconContainer}>
                  <Ionicons name={feat.icon} size={20} color={colors.primary} />
                </View>
                <View style={styles.textContainer}>
                  <Text variant="title" style={styles.cardTitle}>
                    {feat.title}
                  </Text>
                  <Text variant="body" style={styles.cardDesc}>
                    {feat.description}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.buttonContainer}>
              <Button
                onPress={() =>
                  navigation.navigate(LOGIN_SCREENS.ProfileSetupUserAccount)
                }
                variant="primary"
                text="Get Started"
              />
            </View>
            {/* </ScrollView> */}
          </View>
        </SafeAreaView>
      </View>
    </Background>
  );
}
