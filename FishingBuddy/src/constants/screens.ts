export const SCREENS = {
  Welcome: "Welcome",
  HamburgerMenu: "HamburgerMenu",
  LogCatch: "LogCatch",
  CatchHistory: "CatchHistory",
  Map: "Map",
  Profile: "Profile",
  Dashboard: "Dashboard",
  HelpFulLinks: "HelpFulLinks",
};

export const LOGIN_SCREENS = {
  ProfileSetupUserAccount: "ProfileSetupUserAccount",
  ProfileSetupPreferences: "ProfileSetupPreferences",
  ProfileSetupExperience: "ProfileSetupExperience",
  Signup: "Signup",
  Login: "Login",
  AppInformation: "AppInformation",
  ResetPassword: "ResetPassword",
} as const;

export const ROOT_SCREENS = {
  Entry: "Entry",
  Main: "Main",
};

export const TRIP_SCREENS = {
  TripIntro: "TripIntro",
  TripChecklist: "TripChecklist",
  TripLocation: "TripLocation",
  TripWeather: "TripWeather",
  TripLicense: "TripLicense",
  TripEndTime: "TripEndTime",
  TripStart: "TripStart",
} as const;

export const TRIP_FLOW_STEPS = [
  "TripIntro",
  "TripChecklist",
  "TripLocation",
  "TripWeather",
  "TripLicense",
  "TripEndTime",
  "TripStart",
];
