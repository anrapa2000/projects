import React, { useEffect, useState } from "react";
import {
  View,
  Alert,
  Modal,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TRIP_SCREENS } from "../../../constants/screens";
import { TripEndTimeScreenNavigationProp } from "../../../types/navigationTypes";
import Button from "../../../components/Button/Button";
import { strings } from "../../../common/strings";
import { TripAssistantBase } from "../TripAssistantBase";
import { endTimeStyles as styles } from "./endTimeStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputField from "../../../components/InputField/InputField";

const endTimeStrings = strings.tripAssistant.endTime;

export function TripEndTime() {
  const navigation = useNavigation<TripEndTimeScreenNavigationProp>();
  const route = useRoute<any>();
  const { selectedSpot, weather } = route.params;

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [emergencyContact, setEmergencyContact] = useState("");

  const handleSetTime = () => {
    setShowPicker(true);
  };

  const handleTimeChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDateTime(date);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("emergency_contact").then((contact) => {
      setEmergencyContact(contact || "");
    });
  }, []);

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem("emergency_contact", emergencyContact);
      const tripData = {
        endTime: selectedDateTime?.getTime(),
        endDate: selectedDateTime?.getDate(),
        spot: selectedSpot,
        weather,
        emergencyContact,
      };
      await AsyncStorage.setItem("trip_active", JSON.stringify(tripData));

      navigation.navigate(TRIP_SCREENS.TripStart, {
        selectedSpot,
        weather,
        endTime: selectedDateTime?.getTime(),
        startTime: null,
        startDate: Date.now(),
        endDate: selectedDateTime?.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      });
    } catch (error) {
      console.error("Error saving trip data:", error);
      Alert.alert("Error", "Failed to save trip data. Please try again.");
    }
  };

  const handleSkip = () => {
    Alert.alert(endTimeStrings.alert.title, endTimeStrings.alert.message, [
      { text: endTimeStrings.alert.cancel, style: "cancel" },
      { text: endTimeStrings.alert.proceed, onPress: handleContinue },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TripAssistantBase
          title={endTimeStrings.title}
          subtitle={endTimeStrings.subtitle}
        >
          <View style={styles.timeBox}>
            {selectedDateTime ? (
              <Text style={styles.timeText}>
                {selectedDateTime.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                {" at "}
                {selectedDateTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            ) : (
              <Text style={styles.timeText}>{endTimeStrings.noTime}</Text>
            )}

            <View style={styles.emergencyContactContainer}>
              <Text style={styles.label}>Emergency Contact Number</Text>
              <InputField
                placeholder="+1 234 567 890"
                keyboardType="phone-pad"
                value={emergencyContact}
                onChangeText={setEmergencyContact}
                icon="call-outline"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <Button
                text={endTimeStrings.button.setTime}
                icon="time"
                size="small"
                variant="secondary"
                onPress={handleSetTime}
              />
              <Button
                text={endTimeStrings.button.exit}
                icon="close"
                size="small"
                variant="secondary"
                onPress={() =>
                  navigation.navigate("Dashboard", {
                    tripStarted: false,
                    selectedSpot,
                    weather,
                    endTime: 0,
                    startTime: 0,
                    endDate: "",
                  })
                }
              />
            </View>
            {selectedDateTime ? (
              <Button
                text={endTimeStrings.button.continue}
                icon="arrow-forward"
                onPress={handleContinue}
              />
            ) : (
              <Button
                text={endTimeStrings.button.skip}
                icon="arrow-forward"
                onPress={handleSkip}
              />
            )}
          </View>

          <Modal
            visible={showPicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowPicker(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  value={
                    selectedDateTime ? new Date(selectedDateTime) : new Date()
                  }
                  mode="datetime"
                  display="spinner"
                  onChange={handleTimeChange}
                  style={styles.picker}
                />
                <View style={styles.buttonContainerModal}>
                  <Button
                    text="Done"
                    icon="checkmark-circle"
                    size="small"
                    variant="primary"
                    onPress={() => setShowPicker(false)}
                  />
                  <Button
                    text="Cancel"
                    icon="close"
                    size="small"
                    variant="secondary"
                    onPress={() => setShowPicker(false)}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </TripAssistantBase>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
