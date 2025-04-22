import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SCREENS } from "../../constants/screens";
import { MainStackParamList } from "../../types/NavigationTypes";

type TripStartScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export function TripStartScreen() {
  const navigation = useNavigation<TripStartScreenNavigationProp>();
  const route = useRoute<any>();
  const { selectedSpot, weather, endTime, logCatches } = route.params;

  const handleStartTrip = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: SCREENS.Dashboard,
          params: {
            tripStarted: true,
            selectedSpot,
            weather,
            endTime,
            logCatches,
            startTime: Date.now(),
          },
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎣 Ready to Start Your Trip!</Text>
      <Text style={styles.subtitle}>
        You're all set to start fishing at {selectedSpot.name}
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Weather: {weather.description}, {weather.temperature}°C
        </Text>
        <Text style={styles.infoText}>Wind: {weather.windSpeed} km/h</Text>
        {endTime && (
          <Text style={styles.infoText}>
            Planned end time: {new Date(endTime).toLocaleTimeString()}
          </Text>
        )}
      </View>

      <View style={{ marginTop: 24 }}>
        <Button title="🎣 Start Trip!" onPress={handleStartTrip} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 8, textAlign: "center" },
  subtitle: { fontSize: 16, marginBottom: 24, textAlign: "center" },
  infoBox: {
    backgroundColor: "#e0f7fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoText: { fontSize: 16, marginBottom: 8 },
});
