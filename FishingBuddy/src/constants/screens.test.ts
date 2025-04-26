import {
  SCREENS,
  LOGIN_SCREENS,
  ROOT_SCREENS,
  TRIP_SCREENS,
  TRIP_FLOW_STEPS,
} from "./screens";

describe("Constants in screens.ts", () => {
  describe("SCREENS", () => {
    it("should have the correct screen names", () => {
      expect(SCREENS).toEqual({
        Welcome: "Welcome",
        HamburgerMenu: "HamburgerMenu",
        LogCatch: "LogCatch",
        CatchHistory: "CatchHistory",
        Map: "Map",
        Profile: "Profile",
        Dashboard: "Dashboard",
        HelpFulLinks: "HelpFulLinks",
        LicenseUpload: "LicenseUpload",
      });
    });
  });

  describe("LOGIN_SCREENS", () => {
    it("should have the correct login screen names", () => {
      expect(LOGIN_SCREENS).toEqual({
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
      });
    });
  });

  describe("ROOT_SCREENS", () => {
    it("should have the correct root screen names", () => {
      expect(ROOT_SCREENS).toEqual({
        Entry: "Entry",
        Main: "Main",
      });
    });
  });

  describe("TRIP_SCREENS", () => {
    it("should have the correct trip screen names", () => {
      expect(TRIP_SCREENS).toEqual({
        TripIntro: "TripIntro",
        TripChecklist: "TripChecklist",
        TripLocation: "TripLocation",
        TripWeather: "TripWeather",
        TripLicense: "TripLicense",
        TripEndTime: "TripEndTime",
        TripStart: "TripStart",
      });
    });
  });

  describe("TRIP_FLOW_STEPS", () => {
    it("should have the correct trip flow steps", () => {
      expect(TRIP_FLOW_STEPS).toEqual([
        "TripIntro",
        "TripChecklist",
        "TripLocation",
        "TripWeather",
        "TripLicense",
        "TripEndTime",
        "TripStart",
      ]);
    });

    it("should be an array of strings", () => {
      TRIP_FLOW_STEPS.forEach((step) => {
        expect(typeof step).toBe("string");
      });
    });
  });
});
