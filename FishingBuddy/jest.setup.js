jest.setTimeout(10000); 
jest.mock("expo-modules-core", () => ({
  EventEmitter: jest.fn(() => ({
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  })),
  requireNativeModule: jest.fn(),
  requireOptionalNativeModule: jest.fn(),
  requireNativeViewManager: jest.fn(),
}));

// Mock PixelRatio
jest.mock("react-native/Libraries/Utilities/PixelRatio", () => ({
  get: jest.fn().mockReturnValue(2),
  getFontScale: jest.fn().mockReturnValue(2),
  getPixelSizeForLayoutSize: jest
    .fn()
    .mockImplementation((size) => Math.round(size * 2)),
  roundToNearestPixel: jest
    .fn()
    .mockImplementation((size) => Math.round(size * 2)),
}));

// Mock StyleSheet
jest.mock("react-native/Libraries/StyleSheet/StyleSheet", () => ({
  create: jest.fn().mockImplementation((styles) => styles),
  compose: jest.fn().mockImplementation((style1, style2) => ({
    ...style1,
    ...style2,
  })),
  flatten: jest.fn(),
  // hairlineWidth: 1,
  // absoluteFill: {},
  // absoluteFillObject: {},
  roundToNearestPixel: jest
    .fn()
    .mockImplementation((size) => Math.round(size * 2)),
}));

// Mock Dimensions
jest.mock("react-native/Libraries/Utilities/Dimensions", () => ({
  get: jest.fn((key) => {
    if (key === "screen") {
      return { width: 375, height: 812, scale: 2, fontScale: 2 }; // Mock screen dimensions
    }
    if (key === "window") {
      return { width: 375, height: 812, scale: 2, fontScale: 2 }; // Mock window dimensions
    }
    return { width: 0, height: 0, scale: 1, fontScale: 1 };
  }),
  set: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

jest.mock("react-native", () => {
  const ReactNative = jest.requireActual("react-native");
  return {
    ...ReactNative,
    Platform: {
      OS: "ios", // or "android", depending on your test environment
      select: jest.fn((obj) => obj.ios),
    },
    NativeModules: {
      ...ReactNative.NativeModules,
      SettingsManager: {
        settings: {
          AppleLocale: "en_US", // Mock locale for iOS
          AppleLanguages: ["en"], // Mock languages for iOS
        },
      },
      I18nManager: {
        allowRTL: jest.fn(),
        forceRTL: jest.fn(),
        isRTL: false,
      },
    },
    Dimensions: {
      get: jest.fn().mockImplementation((key) => {
        if (key === "screen") {
          return { width: 375, height: 667 }; // Mock screen dimensions
        }
        if (key === "window") {
          return { width: 375, height: 667 }; // Mock window dimensions
        }
        return { width: 0, height: 0 };
      }),
      set: jest.fn((dims) => {
        // Mock the set method to update dimensions
        if (dims.screen) {
          global.__mockedScreenDimensions = dims.screen;
        }
        if (dims.window) {
          global.__mockedWindowDimensions = dims.window;
        }
      }),
    },
    Alert: {
      alert: jest.fn(),
    },
    KeyboardAvoidingView: (props) => {
      const { View } = require("react-native");
      return <View {...props} />;
    },
  };
});

jest.mock("react-native/Libraries/TurboModule/TurboModuleRegistry", () => ({
  get: jest.fn().mockReturnValue({
    getConstants: () => ({
      settings: {
        AppleLocale: "en_US",
      },
    }),
  }),
  getEnforcing: jest.fn().mockReturnValue({
    getConstants: () => ({
      settings: {
        AppleLocale: "en_US",
      },
    }),
  }),
}));

jest.mock("expo-font", () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn().mockReturnValue(true),
}));

jest.mock(
  "react-native/Libraries/Components/StatusBar/NativeStatusBarManagerIOS",
  () => ({
    setStyle: jest.fn(),
    setHidden: jest.fn(),
    setNetworkActivityIndicatorVisible: jest.fn(),
    getConstants: jest.fn(() => ({
      HEIGHT: 20,
    })),
  })
);

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: jest.fn(({ children }) => children),
}));

// // Mock the navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock("expo-blur", () => ({
  BlurView: jest.fn(() => null),
}));
