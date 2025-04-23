import React, { useState } from "react";
import { View, Text, Alert, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TRIP_SCREENS } from "../../../constants/screens";
import { TripEndTimeScreenNavigationProp } from "../../../types/navigationTypes";
import Button from "../../../components/Button/Button";
import { strings } from "../../../common/strings";
import { TripAssistantBase } from "../TripAssistantBase";
import { endTimeStyles as styles } from "./endTimeStyles";

const endTimeStrings = strings.tripAssistant.endTime;

export function TripEndTime() {
  const navigation = useNavigation<TripEndTimeScreenNavigationProp>();
  const route = useRoute<any>();
  const { selectedSpot, weather } = route.params;

  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const handleSetTime = () => {
    setShowPicker(true);
  };

  const handleTimeChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedTime(date.getTime());
    }
    setShowPicker(false);
  };

  const handleContinue = () => {
    navigation.navigate(TRIP_SCREENS.TripStart, {
      selectedSpot,
      weather,
      endTime: selectedTime,
      logCatches: true,
    });
  };

  const handleSkip = () => {
    Alert.alert(endTimeStrings.alert.title, endTimeStrings.alert.message, [
      { text: endTimeStrings.alert.cancel, style: "cancel" },
      { text: endTimeStrings.alert.proceed, onPress: handleContinue },
    ]);
  };

  return (
    <TripAssistantBase
      title={endTimeStrings.title}
      subtitle={endTimeStrings.subtitle}
    >
      <View style={styles.timeBox}>
        {selectedTime ? (
          <Text style={styles.timeText}>
            {new Date(selectedTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        ) : (
          <Text style={styles.timeText}>{endTimeStrings.noTime}</Text>
        )}
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
                logCatches: false,
                startTime: 0,
              })
            }
          />
        </View>
        {selectedTime ? (
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
              value={selectedTime ? new Date(selectedTime) : new Date()}
              mode="time"
              is24Hour={false}
              display="spinner"
              onChange={handleTimeChange}
              style={styles.picker}
            />
            <View style={styles.buttonContainerModal}>
              <Button
                text="Done"
                icon="checkmark-circle"
                size="small"
                variant="secondary"
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
  );
}
