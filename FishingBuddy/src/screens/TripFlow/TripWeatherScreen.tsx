import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getWeatherForCoordinatesWithCache } from "../../services/weather";
import { TRIP_SCREENS } from "../../constants/screens";
import { TripStackParamList } from "../../types/NavigationTypes";

type TripWeatherScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList,
  typeof TRIP_SCREENS.TripWeather
>;

export function TripWeatherScreen() {
  const [weather, setWeather] = useState<any | null>(null);
  const [updatedAgo, setUpdatedAgo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<TripWeatherScreenNavigationProp>();
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
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Checking the weather...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤️ Weather at {selectedSpot.name}</Text>

      <View style={styles.weatherBox}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${
              weather.icon || "01d"
            }@2x.png`,
          }}
          style={{ width: 64, height: 64 }}
        />
        <Text style={styles.info}>
          {weather.description}, {weather.temperature}°C
        </Text>
        <Text style={styles.subInfo}>Wind: {weather.windSpeed} km/h</Text>
        {updatedAgo && (
          <Text style={styles.updated}>⏱️ Updated {updatedAgo}</Text>
        )}
      </View>

      {isGreatWeather() ? (
        <Text style={styles.good}>🎣 Perfect weather to go fishing!</Text>
      ) : (
        <Text style={styles.bad}>⚠️ Conditions may not be ideal today.</Text>
      )}

      <View style={{ marginTop: 24 }}>
        <Button
          title="Next ➡️"
          onPress={() =>
            navigation.navigate("TripLicense", { selectedSpot, weather })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  weatherBox: {
    alignItems: "center",
    backgroundColor: "#e0f7fa",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  info: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  subInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  updated: {
    fontSize: 12,
    marginTop: 6,
    color: "#777",
    fontStyle: "italic",
  },
  good: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
  },
  bad: {
    fontSize: 16,
    color: "#d9534f",
    textAlign: "center",
  },
});
