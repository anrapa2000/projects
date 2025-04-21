import { SCREENS } from "../constants/screens";

export type RootStackParamList = {
  [key in (typeof SCREENS)[keyof typeof SCREENS]]: undefined;
};
