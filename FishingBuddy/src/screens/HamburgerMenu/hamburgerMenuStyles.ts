import { colors } from "../../theme/colors";
import { Platform, StyleSheet } from "react-native";

export const hamburgerMenuStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      paddingTop: Platform.OS === "ios" ? 60 : 40,
      paddingBottom: 20,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text.primary,
    },
    menuContainer: {
      flex: 1,
      padding: 20,
    },
    footer: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: "rgba(255, 255, 255, 0.1)",
    },
    menuButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    buttonText: {
      marginLeft: 15,
      fontSize: 16,
    },
    dangerButton: {
      borderColor: colors.error,
    },
    dangerText: {
      color: colors.error,
    },
  });
  