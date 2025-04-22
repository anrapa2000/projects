import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import { mockWeather, mockUser } from "../../data/mockData";
import { SCREENS, TRIP_SCREENS } from "../../constants/screens";
import {
  getWeatherForCoordinatesWithCache,
  WeatherData,
} from "../../services/weather";
import { FISHING_SPOTS, SPOT_IMAGES } from "../../data/fishingSpots";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../types/NavigationTypes";
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
import { LinearGradient } from "expo-linear-gradient";
import { dashboardStyles as styles } from "./dashboardStyles";
import DashboardHeader from "./DashboardHeader";
import Button from "../../components/Button/Button";
import TripStartedBanner from "./TripStartedBanner";
export type DashboardScreenNavigationProp = NativeStackNavigationProp<
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
      <LinearGradient colors={["#f8f9fa", "#e9ecef"]} style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" />
          <ScrollView contentContainerStyle={styles.content}>
            <DashboardHeader navigation={navigation} />
            <TripStartedBanner
              tripStarted={tripStarted}
              selectedSpot={selectedSpot}
              startTime={startTime}
              endTime={endTime}
              handleStopTrip={handleStopTrip}
            />

            <Button
              onPress={() =>
                navigation.navigate("TripFlow", {
                  screen: TRIP_SCREENS.TripIntro,
                })
              }
              variant="primary"
              icon="fish"
              text="Ready to Catch Fish?"
            />

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
                  <Ionicons name="fish" size={24} color="#3182ce" />
                </Animated.View>
                <Text style={styles.heading}>Your Favorite Spots</Text>
              </View>

              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#3182ce" />
                  <Text style={styles.loadingText}>
                    Catching the latest weather...
                  </Text>
                </View>
              ) : favoritesWithWeather.length === 0 ? (
                <View style={styles.emptyState}>
                  <Animated.View style={fishStyle}>
                    <Ionicons name="fish-outline" size={48} color="#3182ce" />
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
                            <Ionicons
                              name="location"
                              size={20}
                              color="#3182ce"
                            />
                            <Text style={styles.spotTitle}>{spot.name}</Text>
                          </View>

                          {image ? (
                            <View style={styles.imageContainer}>
                              <Image
                                source={{ uri: image }}
                                style={styles.image}
                                resizeMode="cover"
                              />
                              <LinearGradient
                                colors={["transparent", "rgba(0,0,0,0.3)"]}
                                style={styles.imageGradient}
                              />
                            </View>
                          ) : (
                            <View style={styles.placeholderContainer}>
                              <Text style={styles.placeholderText}>
                                No Image Available
                              </Text>
                            </View>
                          )}

                          {spot.weather ? (
                            <View style={styles.weatherInfo}>
                              <Ionicons
                                name="cloud"
                                size={16}
                                color="#4a5568"
                              />
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
                            <View style={styles.goFishContainer}>
                              <Animated.View style={fishStyle}>
                                <Ionicons
                                  name="fish"
                                  size={20}
                                  color="#38a169"
                                />
                              </Animated.View>
                              <Text style={styles.goFish}>
                                Great weather to go fish!
                              </Text>
                            </View>
                          )}

                          <View style={styles.cardFooter}>
                            <View style={styles.updatedContainer}>
                              <Ionicons name="time" size={14} color="#718096" />
                              <Text style={styles.updatedText}>
                                Updated {spot.updatedAgo}
                              </Text>
                            </View>
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
      </LinearGradient>
    </View>
  );
}
