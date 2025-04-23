import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: "center",
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
  },
  swirlContainer: {
    position: "absolute",
    top: height * 0.2,
    left: 0,
    right: 0,
    bottom: 0,
  },
  swirlShape: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 50,
    overflow: "hidden",
  },
  swirlGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 50,
  },
  contentContainer: {
    position: "absolute",
    top: height * 0.1,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
    fontFamily: "System",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    marginBottom: 24,
    fontFamily: "System",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  signupLink: {
    marginTop: 6,
  },
  signupText: {
    color: "#e0e0e0",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  signupHighlight: {
    color: "#00b4d8",
    fontWeight: "600",
  },
  forgotPassword: {
    color: "#e0e0e0",
    fontSize: 14,
    letterSpacing: 0.3,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
  },
});
