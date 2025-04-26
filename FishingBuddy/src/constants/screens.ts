// Constants for the screens
export const SCREENS = {
  Welcome: "Welcome",
  HamburgerMenu: "HamburgerMenu",
  LogCatch: "LogCatch",
  CatchHistory: "CatchHistory",
  Map: "Map",
  Profile: "Profile",
  Dashboard: "Dashboard",
  HelpFulLinks: "HelpFulLinks",
  LicenseUpload: "LicenseUpload",
};

// Constants for the login screens
export const LOGIN_SCREENS = {
  OtpVerification: "OtpVerification",
  ProfileSetupUserAccount: "ProfileSetupUserAccount",
  ProfileSetupPreferences: "ProfileSetupPreferences",
  ProfileSetupExperience: "ProfileSetupExperience",
  LicenseUpload: "LicenseUpload",
  Signup: "Signup",
  Login: "Login",
  AppInformation: "AppInformation",
  ResetPassword: "ResetPassword",
  Welcome: "Welcome",
} as const;

// Constants for the root screens
export const ROOT_SCREENS = {
  Entry: "Entry",
  Main: "Main",
};

// Constants for the trip assistant screens
export const TRIP_SCREENS = {
  TripIntro: "TripIntro",
  TripChecklist: "TripChecklist",
  TripLocation: "TripLocation",
  TripWeather: "TripWeather",
  TripLicense: "TripLicense",
  TripEndTime: "TripEndTime",
  TripStart: "TripStart",
} as const;

// Constants for the trip flow steps
export const TRIP_FLOW_STEPS = [
  "TripIntro",
  "TripChecklist",
  "TripLocation",
  "TripWeather",
  "TripLicense",
  "TripEndTime",
  "TripStart",
];
