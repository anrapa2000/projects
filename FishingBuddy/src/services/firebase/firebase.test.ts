import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Mock Firebase modules
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(),
  getApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

describe("Firebase Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Firebase Initialization", () => {
    it("initializes Firebase app when no apps exist", () => {
      (getApps as jest.Mock).mockReturnValue([]);
      const mockApp = { name: "test-app" };
      (initializeApp as jest.Mock).mockReturnValue(mockApp);

      // Re-import to trigger initialization
      jest.isolateModules(() => {
        require("./firebase");
      });

      expect(getApps).toHaveBeenCalled();
      expect(initializeApp).toHaveBeenCalledWith(expect.any(Object));
      expect(getApp).not.toHaveBeenCalled();
    });

    it("uses existing app when apps exist", () => {
      const mockApp = { name: "test-app" };
      (getApps as jest.Mock).mockReturnValue([mockApp]);
      (getApp as jest.Mock).mockReturnValue(mockApp);

      // Re-import to trigger initialization
      jest.isolateModules(() => {
        require("./firebase");
      });

      expect(getApps).toHaveBeenCalled();
      expect(initializeApp).not.toHaveBeenCalled();
      expect(getApp).toHaveBeenCalled();
    });

    it("initializes auth with the correct app", () => {
      const mockApp = { name: "test-app" };
      (getApps as jest.Mock).mockReturnValue([mockApp]);
      (getApp as jest.Mock).mockReturnValue(mockApp);
      const mockAuth = { app: mockApp };
      (getAuth as jest.Mock).mockReturnValue(mockAuth);

      // Re-import to trigger initialization
      jest.isolateModules(() => {
        require("./firebase");
      });

      expect(getAuth).toHaveBeenCalledWith(mockApp);
    });
  });

  describe("Firebase Configuration", () => {
    it("has correct configuration values", () => {
      const mockApp = { name: "test-app" };
      (getApps as jest.Mock).mockReturnValue([]);
      (initializeApp as jest.Mock).mockReturnValue(mockApp);

      // Re-import to trigger initialization
      jest.isolateModules(() => {
        require("./firebase");
      });

      expect(initializeApp).toHaveBeenCalledWith({
        apiKey: "AIzaSyBQCfF5FvIGNpgZY3vKfdAMM-0eTWzZPrw",
        authDomain: "fishingbuddy-e8769.firebaseapp.com",
        projectId: "fishingbuddy-e8769",
        storageBucket: "fishingbuddy-e8769.firebasestorage.app",
        messagingSenderId: "30244891570",
        appId: "1:30244891570:web:a4cfcb5a783285fd3bd2ab",
      });
    });
  });

  describe("Auth Export", () => {
    it("exports auth instance", () => {
      const mockApp = { name: "test-app" };
      const mockAuth = { app: mockApp };
      (getApps as jest.Mock).mockReturnValue([mockApp]);
      (getApp as jest.Mock).mockReturnValue(mockApp);
      (getAuth as jest.Mock).mockReturnValue(mockAuth);

      // Re-import to trigger initialization
      jest.isolateModules(() => {
        const { auth } = require("./firebase");
        expect(auth).toBe(mockAuth);
      });
    });
  });
});
