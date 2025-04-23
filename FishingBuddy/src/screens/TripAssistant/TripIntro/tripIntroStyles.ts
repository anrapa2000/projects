import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const tripIntroStyles = StyleSheet.create({
  imageBackground: {
    width,
    height,
    },
    gradient: {
      flex: 1,
      justifyContent: "flex-end",
      paddingBottom: 48,
    },
    content: {
      paddingHorizontal: 24,
      paddingBottom: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      color: "#FFFFFF",
      marginBottom: 16,
      lineHeight: 40,
    },
    subtitle: {
      fontSize: 16,
      color: "#FFFFFF",
      opacity: 0.8,
      marginBottom: 32,
      lineHeight: 24,
    },
  });