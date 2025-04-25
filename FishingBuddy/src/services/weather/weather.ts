const API_KEY = "705d7c86f2cc37c8caaf2456bd272e71";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type WeatherData = {
  description: string;
  temperature: number;
  windSpeed: number;
};

const CACHE_PREFIX = "weather_";
const CACHE_LIFESPAN_MINUTES = 30;

export async function getWeatherForCoordinatesWithCache(
  lat: number,
  lon: number,
  spotId: string
): Promise<WeatherWithTimestamp | null> {
  const key = `${CACHE_PREFIX}${spotId}`;
  const now = Date.now();

  try {
    const cached = await AsyncStorage.getItem(key);
    if (cached) {
      const parsed: CachedWeather = JSON.parse(cached);
      const ageInMinutes = (now - parsed.timestamp) / (1000 * 60);

      if (ageInMinutes < CACHE_LIFESPAN_MINUTES) {
        return { data: parsed.data, timestamp: parsed.timestamp };
      }
    }
  } catch (err) {
    console.warn("⚠️ Failed to load cached weather:", err);
  }

  try {
    const res = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();

    const weather: WeatherData = {
      description: data.weather[0].description,
      temperature: data.main.temp,
      windSpeed: data.wind.speed,
    };
    const toCache: CachedWeather = {
      timestamp: now,
      data: weather,
    };
    await AsyncStorage.setItem(key, JSON.stringify(toCache));

    return { data: weather, timestamp: now };
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return null;
  }
}

type CachedWeather = {
  timestamp: number; // when it was saved
  data: WeatherData;
};

export type WeatherWithTimestamp = {
  data: WeatherData;
  timestamp: number; // when the data was fetched
};
