import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const catchHistoryStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    header: {
      padding: 16,  
      paddingBottom: 0,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    title: {
      color: colors.text.primary,
      marginTop: 16,
      marginBottom: 24,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
    },
    loadingText: {
      color: colors.text.secondary,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
    },
    emptyText: {
      color: colors.text.primary,
    },
    emptySubtext: {
      color: colors.text.secondary,
    },
    listContent: {
      paddingBottom: 40,
    },
    card: {
      backgroundColor: colors.background.card2,
      borderRadius: 16,
      marginBottom: 16,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    image: {
      width: "100%",
      height: 200,
    },
    cardContent: {
      padding: 16,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    fishType: {
      color: colors.text.primary,
      marginLeft: 8,
    },
    infoContainer: {
      gap: 12,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    infoText: {
      color: colors.text.secondary,
    },
  });
  