import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SCREENS } from "../../../constants/screens";
import { TripStartNavigationProp } from "../../../types/navigationTypes";
import Button from "../../../components/Button/Button";
import { colors } from "../../../theme/colors";
import { strings } from "../../../common/strings";
import ConfettiCannon from "react-native-confetti-cannon";
import { TripAssistantBase } from "../TripAssistantBase";

const startStrings = strings.tripAssistant.start;

export default function TripStart() {
  const navigation = useNavigation<TripStartNavigationProp>();
  const route = useRoute<any>();
  const { selectedSpot, weather, endTime, logCatches, endDate } = route.params;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

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
            startDate: new Date(),
            endDate,
          },
        },
      ],
    });
  };

  return (
    <TripAssistantBase
      title={startStrings.title}
      subtitle={startStrings.subtitle.replace(
        "{{spotName}}",
        selectedSpot.name
      )}
    >
      {showConfetti && (
        <ConfettiCannon
          testID="confetti-cannon"
          count={200}
          origin={{ x: -10, y: 0 }}
          autoStart={true}
          fadeOut={true}
          colors={[colors.primary, colors.spot.selected, colors.spot.favorite]}
        />
      )}
      <View testID="info-box" style={styles.infoBox}>
        <Text testID="weather-info" style={styles.infoText}>
          {startStrings.weather
            .replace("{{description}}", weather.description)
            .replace("{{temperature}}", weather.temperature.toString())}
        </Text>
        <Text testID="wind-info" style={styles.infoText}>
          {startStrings.wind.replace(
            "{{windSpeed}}",
            weather.windSpeed.toString()
          )}
        </Text>
        {endTime && (
          <Text testID="end-time-info" style={styles.infoText}>
            {startStrings.endTime.replace(
              "{{time}}",
              new Date(endTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            )}
          </Text>
        )}
      </View>
      <View testID="button-container" style={styles.buttonContainer}>
        <Button
          testID="start-button"
          text={startStrings.button.start}
          icon="fish"
          onPress={handleStartTrip}
        />
      </View>
    </TripAssistantBase>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: colors.background.input,
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.background.input,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 12,
    color: colors.text.primary,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
