import { FISHING_SPOTS } from "../data/fishingSpots";
import { TripLocationScreenNavigationProp } from "./navigationTypes";

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
  location: {
    lat: number;
    lon: number;
  };
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
}
