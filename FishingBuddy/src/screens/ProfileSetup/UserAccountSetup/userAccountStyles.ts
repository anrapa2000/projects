import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../theme/colors";

const { width, height } = Dimensions.get("window");

// Layout constants
const PADDING = 20;
const GAP = 16;
const INPUT_GAP = 12;
const BORDER_RADIUS = 12;
const PHOTO_SIZE = 120;

export const userAccountStyles = StyleSheet.create({
  // Container styles
  bg: {
    flex: 1,
    width,
    height,
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: height * 0.1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    justifyContent: "flex-end",
  },

  // Form section styles
  formSection: {
    padding: PADDING,
    gap: GAP,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 24,
  },

  // Input styles
  inputsContainer: {
    gap: INPUT_GAP,
  },
  inputWrapper: {
    backgroundColor: colors.background.input,
    borderRadius: BORDER_RADIUS,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 16,
  },
  inputIcon: {
    color: colors.text.secondary,
  },

  // Button styles
  button: {
    backgroundColor: colors.primary,
    borderRadius: BORDER_RADIUS,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "bold",
  },

  // Error styles
  errorBox: {
    backgroundColor: "rgba(255, 68, 68, 0.1)",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },

  // Photo upload styles (currently commented out in component)
  photoSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  photoWrapper: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
    overflow: "hidden",
  },
  photoBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  addPhotoText: {
    color: colors.text.primary,
    fontSize: 16,
  },
});
