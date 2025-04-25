import { StyleSheet, Platform } from "react-native";
import { colors } from "../../theme/colors";

export const logCatchStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
    content: {
      padding: 24,
    },
    header: {
      marginBottom: 32,
      alignItems: "center",
    },
    section: {
      marginBottom: 32,
      backgroundColor: colors.background.card2,
      borderRadius: 16,
      padding: 16,
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
    imageContainer: {
      width: "100%",
      height: 200,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: colors.background.input,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    placeholderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    formContainer: {
      gap: 16,
    },
    infoContainer: {
      gap: 16,
    },
    dateTimeRow: {
      flexDirection: "row",
      gap: 16,
      marginBottom: 16,
    },
    dateTimeColumn: {
      flex: 1,
    },
    dateTimeLabel: {
      color: colors.text.secondary,
      marginBottom: 8,
    },
    dateTimeButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 12,
      backgroundColor: colors.background.input,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    locationContainer: {
      marginTop: 8,
    },
    locationField: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 12,
      backgroundColor: colors.background.input,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    locationText: {
      flex: 1,
    },
    subtitle: {
      marginBottom: 16,
    },
    dateTimePicker: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      borderWidth: 1,
      marginTop: 8,
    },
  });   