import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const GRADIENT_HEIGHT = height * 0.3;
const SWIRL_HEIGHT = height * 0.6;
const BORDER_RADIUS = {
  topLeft: 100,
  topRight: 50,
};

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: GRADIENT_HEIGHT,
  },
  swirlContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: SWIRL_HEIGHT,
  },
  swirlShape: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: SWIRL_HEIGHT,
    borderTopLeftRadius: BORDER_RADIUS.topLeft,
    borderTopRightRadius: BORDER_RADIUS.topRight,
    overflow: "hidden",
  },
  swirlGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: BORDER_RADIUS.topLeft,
    borderTopRightRadius: BORDER_RADIUS.topRight,
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: height * 0.06,
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
  buttonContainer: {
    marginTop: 12,
  },
  primaryBtn: {
    marginBottom: 14,
    borderRadius: 20,
    overflow: "hidden",
  },
  primaryGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 20,
  },
  primaryText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#00b4d8",
    paddingVertical: 14,
    borderRadius: 20,
  },
  secondaryText: {
    color: "#00b4d8",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
