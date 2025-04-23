import { colors } from "../../../theme/colors";
import { StyleSheet } from "react-native";

export const licenseStyles = StyleSheet.create({
  contentBox: {
    backgroundColor: colors.background.input,
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
    color: colors.text.primary,
    lineHeight: 24,
  },
  note: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 16,
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
