import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SCREENS } from "../constants/screens";
import { TRIP_SCREENS } from "../constants/screens";

export type TripStackParamList = {
  [TRIP_SCREENS.TripIntro]: undefined;
  [TRIP_SCREENS.TripChecklist]: undefined;
  [TRIP_SCREENS.TripLocation]: undefined;
  [TRIP_SCREENS.TripWeather]: {
    selectedSpot: {
      id: string;
      name: string;
      lat: number;
      lon: number;
    };
  };
  [TRIP_SCREENS.TripLicense]: {
    selectedSpot: {
      id: string;
      name: string;
      lat: number;
      lon: number;
    };
    weather: {
      description: string;
      temperature: number;
      windSpeed: number;
      icon: string;
    };
  };
  [TRIP_SCREENS.TripEndTime]: {
    selectedSpot: {
      id: string;
      name: string;
      lat: number;
      lon: number;
    };
    weather: {
      description: string;
      temperature: number;
      windSpeed: number;
      icon: string;
    };
  };
  [TRIP_SCREENS.TripStart]: {
    selectedSpot: {
      id: string;
      name: string;
      lat: number;
      lon: number;
    };
    weather: {
      description: string;
      temperature: number;
      windSpeed: number;
      icon: string;
    };
    endTime: number | null;
    logCatches: boolean;
  };
};

export type MainStackParamList = {
  [key in (typeof SCREENS)[keyof typeof SCREENS]]: undefined;
} & {
  TripFlow: {
    screen: keyof TripStackParamList;
  };
  Dashboard: {
    tripStarted: boolean;
    selectedSpot: {
      id: string;
      name: string;
      lat: number;
      lon: number;
    };
    weather: {
      description: string;
      temperature: number;
      windSpeed: number;
      icon: string;
    };
    endTime: number;
    logCatches: boolean;
    startTime: number;
  };
};

export type LoginStackParamList = {
  ProfileSetupUserAccount: undefined;
  ProfileSetupPreferences: {
    basicProfile: {
      name: string;
      email: string;
      age?: number;
      photo?: string | null;
      location?: {
        latitude: number;
        longitude: number;
      } | null;
    };
  };
  ProfileSetupExperience: {
    profile: {
      name: string;
      email: string;
      password: string;
      age?: number;
      photo?: string | null;
      location?: {
        latitude: number;
        longitude: number;
      } | null;
      preferences: {
        level: string | null;
        fishSpecies: string[];
        fishingTypes: string[];
        gear: string[];
        desiredCatch: string[];
      };
    };
  };
  Signup: undefined;
  Login: undefined;
  AppInformation: undefined;
  ResetPassword: undefined;
};

export type TripIntroScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList,
  typeof TRIP_SCREENS.TripIntro
>;

export type CatchEntry = {
  image: string;
  fishType: string;
  size: string;
  timestamp: string;
  location: {
    lat: number;
    lon: number;
  };
};
