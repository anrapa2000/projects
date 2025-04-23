import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getWeatherForCoordinatesWithCache } from "../../../services/weather";
import { TripWeatherNavigationProp } from "../../../types/navigationTypes";
import TripProgressBar from "../TripProgressBar";
import Button from "../../../components/Button/Button";
import { colors } from "../../../theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { strings } from "../../../common/strings";
import { weatherStyles as styles } from "./weatherStyles";

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
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{weatherStrings.loading}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[colors.map.background, colors.map.overlay]}
      style={styles.container}
    >
      <TripProgressBar />
      <Text style={styles.title}>
        {weatherStrings.title.replace("{{spotName}}", selectedSpot.name)}
      </Text>

      <View style={styles.weatherBox}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${
              weather.icon || "01d"
            }@2x.png`,
          }}
          style={styles.weatherIcon}
        />
        <Text style={styles.info}>
          {weather.description}, {weather.temperature}°C
        </Text>
        <Text style={styles.subInfo}>
          {weatherStrings.wind.replace("{{windSpeed}}", weather.windSpeed)}
        </Text>
        {updatedAgo && (
          <Text style={styles.updated}>
            {weatherStrings.updated.replace("{{timeAgo}}", updatedAgo)}
          </Text>
        )}
      </View>

      {isGreatWeather() ? (
        <Text style={styles.good}>{weatherStrings.good}</Text>
      ) : (
        <Text style={styles.bad}>{weatherStrings.bad}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          text={weatherStrings.button.next}
          icon="arrow-forward"
          onPress={() =>
            navigation.navigate("TripLicense", { selectedSpot, weather })
          }
        />
        <Button
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
    </LinearGradient>
  );
}
