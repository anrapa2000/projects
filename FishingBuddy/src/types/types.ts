import { KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { FISHING_SPOTS } from "../data/fishingSpots";
import { TripLocationScreenNavigationProp } from "./navigationTypes";
import { variants } from "../components/Text/Text";
import { Ionicons } from "@expo/vector-icons";

export type TripLocationOverlayProps = {
  location: {
    coords: {
      latitude: number;
      longitude: number;
    };
  };
  selectedSpot: (typeof FISHING_SPOTS)[number];
  navigation: TripLocationScreenNavigationProp;
};

export type CatchEntry = {
  image: string;
  fishType: string;
  size: string;
  timestamp: string;
  location: string;
};

export interface MenuButtonProps {
  title: string;
  icon: string;
  onPress: () => void;
  isDanger?: boolean;
}

export type WelcomeContentProps = {
  onSignIn: () => void;
  onCreateProfile: () => void;
};

export interface ButtonProps {
  onPress: () => void;
  variant?: "primary" | "secondary" | "menuItem" | "DANGER";
  icon?: string;
  text: string;
  disabled?: boolean;
  size?: "big" | "small";
  testID?: string;
}

export interface InputFieldProps {
  icon: string;
  placeholder: string;
  secure?: boolean;
  value: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  readOnly?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  testID?: string;
}

export interface TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: keyof typeof variants;
}

export type WeatherCardProps = {
  location: string;
  temperature: number;
  condition: string;
  suggestion: string;
};

export type AppInfoFeatures = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};