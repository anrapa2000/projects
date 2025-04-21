import { SCREENS } from "../constants/screens";

export type RootStackParamList = {
  [key in (typeof SCREENS)[keyof typeof SCREENS]]: undefined;
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
