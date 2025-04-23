import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const licenseUploadStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: colors.text.secondary,
    marginBottom: 32,
    textAlign: "center",
  },
  imageContainer: {
    width: "85%",
    aspectRatio: 3 / 4,
    backgroundColor: colors.background.input,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 32,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: "dashed",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  placeholderText: {
    color: colors.text.secondary,
    marginTop: 12,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});
