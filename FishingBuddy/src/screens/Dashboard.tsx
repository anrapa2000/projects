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
  Alert,
} from "react-native";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import { mockWeather, mockUser } from "../data/mockData";
import { SCREENS, TRIP_SCREENS } from "../constants/screens";
import {
  getWeatherForCoordinatesWithCache,
  WeatherData,
} from "../services/weather";
import { FISHING_SPOTS, SPOT_IMAGES } from "../data/fishingSpots";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/NavigationTypes";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  withSequence,
  withRepeat,
} from "react-native-reanimated";
import { useRoute } from "@react-navigation/native";

type DashboardScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  typeof SCREENS.Dashboard
>;

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
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const route = useRoute<any>();
  const { tripStarted, selectedSpot, weather, endTime, logCatches, startTime } =
    route.params || {};

  // Animation values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const fishY = useSharedValue(0);

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

      // Start animations
      opacity.value = withTiming(1, { duration: 1000 });
      scale.value = withSpring(1, { damping: 8, stiffness: 40 });
      fishY.value = withRepeat(
        withSequence(
          withTiming(10, { duration: 2000 }),
          withTiming(0, { duration: 2000 })
        ),
        -1,
        true
      );
    };

    loadWeatherForFavorites();
  }, []);

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

  // Animated styles
  const headerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const weatherStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const fishStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: fishY.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleStopTrip = () => {
    Alert.alert("End Trip", "Are you sure you want to stop your trip?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes, End Trip",
        style: "destructive",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }], // trip reset
          });

          // Optional: Navigate to trip summary or log catch screen
          // navigation.navigate("LogCatch", { tripEnded: true });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.headerRow}>
            <Ionicons
              name="menu"
              size={28}
              color="#333"
              onPress={() => navigation.navigate("HamburgerMenu")}
            />
          </View>
          <Animated.View style={[styles.header, headerStyle]}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>{greeting},</Text>
              <Text style={styles.tagline}>Ready to catch some fish? 🎣</Text>
            </View>
            <View style={styles.profileContainer}>
              <View style={styles.profileImageWrapper}>
                <Image
                  source={{ uri: mockUser.photo }}
                  style={styles.profileImage}
                />
              </View>
            </View>
          </Animated.View>

          {tripStarted && (
            <>
              <View style={styles.tripBanner}>
                <Text style={styles.tripText}>
                  🎣 Trip in progress at {selectedSpot?.name}
                </Text>
                <Text style={styles.tripText}>
                  Started at: {new Date(startTime).toLocaleTimeString()}
                </Text>
                {endTime && (
                  <Text style={styles.tripText}>
                    Ends at: {new Date(endTime).toLocaleTimeString()}
                  </Text>
                )}
              </View>
              <View style={styles.tripActions}>
                <Text style={styles.tripText}>
                  🎣 Fishing at {selectedSpot.name}
                </Text>
                <Button
                  title="🛑 Stop Trip"
                  color="#d9534f"
                  onPress={handleStopTrip}
                />
              </View>
            </>
          )}

          <View style={{ marginTop: 24 }}>
            <Button
              title="🎣 Ready to Catch Fish?"
              onPress={() =>
                navigation.navigate("TripFlow", {
                  screen: TRIP_SCREENS.TripIntro,
                })
              }
            />
          </View>

          <Animated.View style={[styles.weatherSection, weatherStyle]}>
            <WeatherCard
              location={mockWeather.location}
              temperature={mockWeather.temp}
              condition={mockWeather.condition}
              suggestion={mockWeather.suggestion}
            />
          </Animated.View>

          <View style={styles.favoritesSection}>
            <View style={styles.sectionHeader}>
              <Animated.View style={fishStyle}>
                <Ionicons name="fish" size={24} color="#60a5fa" />
              </Animated.View>
              <Text style={styles.heading}>Your Favorite Spots</Text>
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#60a5fa" />
                <Text style={styles.loadingText}>
                  Catching the latest weather...
                </Text>
              </View>
            ) : favoritesWithWeather.length === 0 ? (
              <View style={styles.emptyState}>
                <Animated.View style={fishStyle}>
                  <Ionicons name="fish-outline" size={48} color="#60a5fa" />
                </Animated.View>
                <Text style={styles.emptyStateText}>
                  No favorite spots yet. Time to cast your net! 🎣
                </Text>
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.favoritesScroll}
              >
                {favoritesWithWeather.map((spot) => {
                  const image = SPOT_IMAGES[spot.name];
                  const amazing =
                    spot.weather && isAmazingWeather(spot.weather);

                  return (
                    <Animated.View
                      key={spot.id}
                      style={[styles.card, cardStyle]}
                    >
                      <View style={styles.cardContent}>
                        <View style={styles.cardHeader}>
                          <Ionicons name="location" size={20} color="#60a5fa" />
                          <Text style={styles.spotTitle}>{spot.name}</Text>
                        </View>

                        {image && (
                          <Image
                            source={{ uri: image }}
                            style={styles.image}
                            resizeMode="cover"
                          />
                        )}

                        {spot.weather ? (
                          <View style={styles.weatherInfo}>
                            <Ionicons name="cloud" size={16} color="#e0f2fe" />
                            <Text style={styles.weather}>
                              {spot.weather.description},{" "}
                              {spot.weather.temperature}
                              °C, Wind: {spot.weather.windSpeed} km/h
                            </Text>
                          </View>
                        ) : (
                          <Text style={styles.weather}>
                            ❌ Weather unavailable
                          </Text>
                        )}

                        {amazing && (
                          <>
                            <View style={styles.goFishContainer}>
                              <Animated.View style={fishStyle}>
                                <Ionicons
                                  name="fish"
                                  size={20}
                                  color="#4ade80"
                                />
                              </Animated.View>
                              <Text style={styles.goFish}>
                                Great weather to go fish!
                              </Text>
                            </View>
                            <Button
                              title="Go Fish 🎣"
                              onPress={() => {
                                console.log(
                                  "🎣 Start fishing trip at",
                                  spot.name
                                );
                              }}
                            />
                          </>
                        )}
                        <View style={styles.updatedContainer}>
                          <Ionicons name="time" size={14} color="#94a3b8" />
                          <Text style={styles.updatedText}>
                            Updated {spot.updatedAgo}
                          </Text>
                        </View>
                      </View>
                    </Animated.View>
                  );
                })}
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
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
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  favoritesSection: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 8,
  },
  card: {
    width: 280,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  cardContent: {
    padding: 16,
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  spotTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: 8,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  weatherInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  weather: {
    fontSize: 14,
    color: "#e0f2fe",
    marginLeft: 8,
  },
  goFishContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  goFish: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4ade80",
    marginLeft: 8,
  },
  updatedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  updatedText: {
    fontSize: 12,
    color: "#94a3b8",
    marginLeft: 4,
    fontStyle: "italic",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    color: "#e0f2fe",
    marginTop: 12,
    fontSize: 16,
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    color: "#e0f2fe",
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
  },
  favoritesScroll: {
    marginTop: 8,
  },
  tripBanner: {
    backgroundColor: "#e6faff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  tripText: {
    fontSize: 14,
    color: "#007AFF",
    textAlign: "center",
  },
  tripActions: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#ffeef0",
    borderRadius: 10,
    alignItems: "center",
  },
  headerRow: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
});
