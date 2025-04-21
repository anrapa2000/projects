import { SCREENS } from "../constants/screens";

export type MainStackParamList = {
  [key in (typeof SCREENS)[keyof typeof SCREENS]]: undefined;
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
};

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
