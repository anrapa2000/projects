module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "<rootDir>/jest.setup.js",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-vector-icons|expo|@expo|@unimodules|unimodules|react-navigation|@react-navigation|native-base|react-native-svg|react-native-reanimated|expo-blur|@react-native-community|expo-location|react-native-progress)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "\\.ttf$": "<rootDir>/__mocks__/fileMock.js",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.test.{js,jsx,ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};