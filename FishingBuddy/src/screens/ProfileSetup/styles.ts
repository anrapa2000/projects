import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const preferencesStyles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  swirlContainer: {
    flex: 1,
    marginTop: height * 0.08,
  },
  swirlShape: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  swirlGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    flexGrow: 1,
  },
  contentWrapper: {
    padding: 20,
    paddingBottom: 40,
    marginTop: 20
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
    fontFamily: "System",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    marginBottom: 10,
    fontFamily: "System",
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 12,
    fontWeight: "600",
    fontFamily: "System",
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    margin: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  tagSelected: {
    backgroundColor: "#00b4d8",
    borderColor: "#00b4d8",
  },
  tagText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: "#00b4d8",
    paddingVertical: 14,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
