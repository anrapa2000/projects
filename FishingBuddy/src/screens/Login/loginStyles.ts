import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  waveBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    transform: [{ scaleY: -1 }],
  },
  bubbles: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  waterRings: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    color: "#ffffff",
    marginBottom: 6,
    fontFamily: "System",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#e2e8f0",
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
    color: "#e2e8f0",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  signupHighlight: {
    color: "#4299e1",
    fontWeight: "600",
  },
  forgotPassword: {
    color: "#e2e8f0",
    fontSize: 14,
    letterSpacing: 0.3,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
  },
  sunburst: {
    position: "absolute",
    top: -100,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 0,
  },
  blurContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)", // optional fallback
  },
});
