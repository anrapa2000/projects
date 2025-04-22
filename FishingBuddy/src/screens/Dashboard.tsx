import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  SafeAreaView,
  Button,
  ActivityIndicator,
} from "react-native";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import { mockWeather, mockUser } from "../data/mockData";
import { SCREENS } from "../constants/screens";
import {
  getWeatherForCoordinatesWithCache,
  WeatherData,
} from "../services/weather";
import { FISHING_SPOTS, SPOT_IMAGES } from "../data/fishingSpots";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

export default function HomeDashboardScreen() {
  const [favoritesWithWeather, setFavoritesWithWeather] = useState<
    {
      id: string;
      name: string;
      weather: WeatherData;
      updatedAgo: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeatherForFavorites = async () => {
      const saved = await AsyncStorage.getItem("favouriteSpots");
      if (!saved) {
        setLoading(false);
        return;
      }

      const favoriteIds: string[] = JSON.parse(saved);

      const results = await Promise.all(
        favoriteIds.map(async (id) => {
          const spot = FISHING_SPOTS.find((s) => s.id === id);
          if (!spot) return null;

          const weather = await getWeatherForCoordinatesWithCache(
            spot.lat,
            spot.lon,
            spot.id
          );
          if (weather) {
            const ageMinutes = Math.round(
              (Date.now() - weather.timestamp) / 60000
            );
            return {
              id: spot.id,
              name: spot.name,
              weather: weather.data,
              updatedAgo: `${ageMinutes} min${ageMinutes !== 1 ? "s" : ""} ago`,
            };
          }
        })
      );

      const filtered = results.filter(Boolean) as {
        id: string;
        name: string;
        weather: WeatherData;
        updatedAgo: string;
      }[];

      setFavoritesWithWeather(filtered);
      setLoading(false);
    };

    loadWeatherForFavorites();
  }, []);

  const navigation = useNavigation();
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const isAmazingWeather = (weather: WeatherData) => {
    return (
      ["clear sky", "few clouds"].includes(weather.description.toLowerCase()) &&
      weather.temperature >= 18 &&
      weather.temperature <= 28 &&
      weather.windSpeed <= 10
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>{greeting},</Text>
              <Text style={styles.tagline}>Ready to catch some fish?</Text>
            </View>
            <View style={styles.profileContainer}>
              <View style={styles.profileImageWrapper}>
                <Image
                  source={{ uri: mockUser.photo }}
                  style={styles.profileImage}
                />
              </View>
            </View>
          </View>

          <View style={styles.weatherSection}>
            <WeatherCard
              location={mockWeather.location}
              temperature={mockWeather.temp}
              condition={mockWeather.condition}
              suggestion={mockWeather.suggestion}
            />
          </View>
          {/* {Temporary Button} */}
          <Button
            title="Go to Home Screen"
            onPress={() => navigation.navigate(SCREENS.Home)}
          />
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>🎣 Your Favorite Spots</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : favoritesWithWeather.length === 0 ? (
              <Text style={styles.text}>
                You haven’t saved any favorites yet.
              </Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {favoritesWithWeather.map((spot) => {
                  const image = SPOT_IMAGES[spot.name];
                  const amazing =
                    spot.weather && isAmazingWeather(spot.weather);

                  return (
                    <View key={spot.id} style={styles.card}>
                      <Text style={styles.spotTitle}>{spot.name}</Text>

                      {image && (
                        <Image
                          source={{ uri: image }}
                          style={styles.image}
                          resizeMode="cover"
                        />
                      )}

                      {spot.weather ? (
                        <Text style={styles.weather}>
                          {spot.weather.description}, {spot.weather.temperature}
                          °C, Wind: {spot.weather.windSpeed} km/h
                        </Text>
                      ) : (
                        <Text style={styles.weather}>
                          ❌ Weather unavailable
                        </Text>
                      )}

                      {amazing && (
                        <>
                          <Text style={styles.goFish}>
                            🌟 Great weather to go fish!
                          </Text>
                          <Button
                            title="Go Fish 🎣"
                            onPress={() => {
                              // Replace this with navigation to Checklist later
                              console.log(
                                "🎣 Start fishing trip at",
                                spot.name
                              );
                            }}
                          />
                        </>
                      )}
                      <Text style={styles.updatedText}>
                        ⏱️ Updated {spot.updatedAgo}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </ScrollView>

          {/* TODO: Catch Stats, etc. */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // Deep navy
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    paddingTop: 16,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    color: "#e0f2fe",
    fontSize: 18,
    fontWeight: "600",
    opacity: 0.9,
  },
  profileContainer: {
    marginLeft: 20,
  },
  profileImageWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  weatherSection: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  spotCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#f0f8ff",
    borderColor: "#007AFF",
    borderWidth: 1,
  },
  spotTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
  },
  goFish: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "green",
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  card: {
    width: 280,
    marginRight: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f0f8ff",
    borderColor: "#007AFF",
    borderWidth: 1,
  },
  weather: {
    fontSize: 14,
    marginBottom: 6,
  },
  updatedText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
  },
});
