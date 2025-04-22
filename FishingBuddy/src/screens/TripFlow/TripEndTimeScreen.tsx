import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TRIP_SCREENS } from "../../constants/screens";
import { TripStackParamList } from "../../types/NavigationTypes";

type TripEndTimeScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList,
  typeof TRIP_SCREENS.TripEndTime
>;

export function TripEndTimeScreen() {
  const navigation = useNavigation<TripEndTimeScreenNavigationProp>();
  const route = useRoute<any>();
  const { selectedSpot, weather } = route.params;

  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const handleContinue = () => {
    navigation.navigate(TRIP_SCREENS.TripStart, {
      selectedSpot,
      weather,
      endTime: selectedTime,
      logCatches: true, // Default to true for logging catches
    });
  };

  const handleSkip = () => {
    Alert.alert(
      "No End Time Set",
      "If you skip, you won't get any reminders or safety alerts.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Proceed Anyway", onPress: handleContinue },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏱️ Set Trip End Time</Text>
      <Text style={styles.subtitle}>
        When would you like to end your fishing trip?
      </Text>

      <View style={styles.timeBox}>
        {selectedTime ? (
          <Text style={styles.timeText}>
            {new Date(selectedTime).toLocaleTimeString()}
          </Text>
        ) : (
          <Text style={styles.timeText}>No time selected</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Set Time" onPress={() => setShowPicker(true)} />
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedTime}
        />
      </View>

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={false}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, date) => {
            if (date) {
              setSelectedTime(date.getTime());
              setShowPicker(false);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: { fontSize: 16, marginBottom: 24, textAlign: "center" },
  timeBox: {
    backgroundColor: "#e0f7fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  timeText: { fontSize: 18, fontWeight: "500" },
  buttonContainer: {
    gap: 12,
    marginTop: 20,
  },
});
