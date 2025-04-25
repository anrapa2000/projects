import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getWeatherForCoordinatesWithCache } from "../../../services/weather/weather";
import { TripWeatherNavigationProp } from "../../../types/navigationTypes";
import Button from "../../../components/Button/Button";
import { colors } from "../../../theme/colors";
import { strings } from "../../../common/strings";
import { weatherStyles as styles } from "./weatherStyles";
import { TripAssistantBase } from "../TripAssistantBase";

const weatherStrings = strings.tripAssistant.weather;

export function TripWeather() {
  const [weather, setWeather] = useState<any | null>(null);
  const [updatedAgo, setUpdatedAgo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<TripWeatherNavigationProp>();
  const route = useRoute<any>();

  const { selectedSpot } = route.params;

  useEffect(() => {
    (async () => {
      const result = await getWeatherForCoordinatesWithCache(
        selectedSpot.lat,
        selectedSpot.lon,
        selectedSpot.id || `${selectedSpot.lat}-${selectedSpot.lon}`
      );
      if (result) {
        setWeather(result.data);
        const minsAgo = Math.round((Date.now() - result.timestamp) / 60000);
        setUpdatedAgo(`${minsAgo} min${minsAgo !== 1 ? "s" : ""} ago`);
      }
      setLoading(false);
    })();
  }, []);

  const isGreatWeather = () => {
    if (!weather) return false;
    return (
      ["clear sky", "few clouds"].includes(weather.description.toLowerCase()) &&
      weather.temperature >= 18 &&
      weather.temperature <= 28 &&
      weather.windSpeed <= 10
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator testID="loading-indicator" size="large" color={colors.primary} />
        <Text testID="loading-text" style={styles.loadingText}>{weatherStrings.loading}</Text>
      </View>
    );
  }

  return (
    <TripAssistantBase
      title={weatherStrings.title.replace("{{spotName}}", selectedSpot.name)}
    >
      <View testID="weather-box" style={styles.weatherBox}>
        <Image
          testID="weather-icon"
          source={{
            uri: `https://openweathermap.org/img/wn/${
              weather.icon || "01d"
            }@2x.png`,
          }}
          style={styles.weatherIcon}
        />
        <Text testID="weather-info" style={styles.info}>
          {weather.description}, {weather.temperature}°C
        </Text>
        <Text testID="weather-wind" style={styles.subInfo}>
          {weatherStrings.wind.replace("{{windSpeed}}", weather.windSpeed)}
        </Text>
        {updatedAgo && (
          <Text testID="weather-updated" style={styles.updated}>
            {weatherStrings.updated.replace("{{timeAgo}}", updatedAgo)}
          </Text>
        )}
      </View>

      {isGreatWeather() ? (
        <Text testID="weather-good" style={styles.good}>{weatherStrings.good}</Text>
      ) : (
        <Text testID="weather-bad" style={styles.bad}>{weatherStrings.bad}</Text>
      )}

      <View testID="button-container" style={styles.buttonContainer}>
        <Button
          testID="next-button"
          text={weatherStrings.button.next}
          icon="arrow-forward"
          onPress={() =>
            navigation.navigate("TripLicense", { selectedSpot, weather })
          }
        />
        <Button
          testID="exit-button"
          text={weatherStrings.button.exit}
          icon="close"
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
    </TripAssistantBase>
  );
}
