import { StyleSheet } from "react-native";

export const weatherCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  locationContainer: {
    flex: 1,
    marginRight: 16,
  },
  location: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  weatherInfo: {
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  temp: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 4,
  },
  condition: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "500",
  },
  suggestionContainer: {
    backgroundColor: "rgba(144, 224, 239, 0.1)",
    borderRadius: 12,
    padding: 12,
  },
  suggestionLabel: {
    color: "#90e0ef",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  suggestion: {
    color: "#90e0ef",
    fontSize: 14,
    lineHeight: 20,
  },
});
