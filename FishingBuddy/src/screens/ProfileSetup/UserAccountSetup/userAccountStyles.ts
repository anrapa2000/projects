import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../theme/colors";

const { width, height } = Dimensions.get("window");

const BORDER_RADIUS = 12;
const PHOTO_SIZE = 120;

export const userAccountStyles = StyleSheet.create({
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
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 8,
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  title: {
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    color: colors.text.secondary,
    textAlign: "center",
  },
  formSection: {
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  inputsContainer: {
    gap: 12,
  },
  errorBox: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  errorText: {
    color: colors.error,
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 24,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.background.input,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary,
    position: "relative",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.background.input,
  },
  passwordError: {
    color: colors.error,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
});
