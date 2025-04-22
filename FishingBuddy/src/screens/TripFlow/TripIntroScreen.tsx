import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TRIP_SCREENS } from "../../constants/screens";

type TripStackParamList = {
  [key in (typeof TRIP_SCREENS)[keyof typeof TRIP_SCREENS]]: undefined;
};

type TripIntroScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList,
  typeof TRIP_SCREENS.TripIntro
>;

export function TripIntroScreen() {
  const navigation = useNavigation<TripIntroScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎣 Ready to Catch Fish?</Text>
      <Text style={styles.subtitle}>
        We've created a step-by-step guide to prepare you for your fishing trip. Let's get started!
      </Text>

      <Button
        title="Get Started"
        onPress={() => navigation.navigate(TRIP_SCREENS.TripChecklist)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 26, fontWeight: "600", textAlign: "center", marginBottom: 12 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 24 },
});
