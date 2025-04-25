import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LOGIN_SCREENS, SCREENS } from "../constants/screens";
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
    startTime: number | null;
    startDate: Date | null;
    endDate: Date | null;
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
      password: string;
      age?: number;
      photo?: string | null;
      location?: {
        latitude: number;
        longitude: number;
      } | null;
      licenseImage?: string | null;
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
      licenseImage: string | null;
      preferences: {
        level: string | null;
        fishSpecies: string[];
        fishingTypes: string[];
        gear: string[];
        desiredCatch: string[];
      };
    };
  };
  LicenseUpload: {
    basicProfile: {
      name: string;
      email: string;
      password: string;
      age?: number;
      photo?: string | null;
      location?: {
        latitude: number;
        longitude: number;
      } | null;
    };
  };
  Signup: undefined;
  Login: undefined;
  AppInformation: undefined;
  ResetPassword: undefined;
  OtpVerification: {
    sentOtp: string;
    email: string;
    password: string;
  };
  Dashboard: undefined;
};

export type TripIntroScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList,
  typeof TRIP_SCREENS.TripIntro
>;

export type TripChecklistScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList,
  typeof TRIP_SCREENS.TripChecklist
>;

export type TripLocationScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList,
  typeof TRIP_SCREENS.TripLocation
>;

type TripWeatherScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList,
  typeof TRIP_SCREENS.TripWeather
>;

export type TripWeatherNavigationProp = TripWeatherScreenNavigationProp &
  NativeStackNavigationProp<MainStackParamList>;

export type TripEndTimeScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList,
  typeof TRIP_SCREENS.TripEndTime
> &
  NativeStackNavigationProp<MainStackParamList>;

export type TripStartNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

export type TripLicenseScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList & {
    Dashboard: {
      tripStarted: boolean;
      selectedSpot: any;
      weather: any;
      endTime: number;
      startTime: number;
    };
  },
  typeof TRIP_SCREENS.TripLicense
>;

export type DashboardScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  typeof SCREENS.Dashboard
>;

export type HamburgerMenuNavProp = NativeStackNavigationProp<
  MainStackParamList,
  typeof SCREENS.HamburgerMenu
>;

export type SignupScreenNavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  typeof LOGIN_SCREENS.Signup
>;
