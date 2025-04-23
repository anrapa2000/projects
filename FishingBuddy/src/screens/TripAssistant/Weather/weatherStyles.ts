import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

export const weatherStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.map.background,
  },
  loadingText: {
    color: colors.text.primary,
    marginTop: 16,
    fontSize: 16,
  },
  weatherBox: {
    alignItems: "center",
    backgroundColor: colors.background.input,
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  weatherIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  info: {
    fontSize: 20,
    fontWeight: "600",
    textTransform: "capitalize",
    color: colors.text.primary,
    marginBottom: 8,
  },
  subInfo: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 4,
  },
  updated: {
    fontSize: 14,
    marginTop: 8,
    color: colors.text.secondary,
    fontStyle: "italic",
  },
  good: {
    fontSize: 18,
    color: colors.spot.selected,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 24,
  },
  bad: {
    fontSize: 18,
    color: colors.error,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
});
