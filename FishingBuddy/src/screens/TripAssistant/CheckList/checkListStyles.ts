import { StyleSheet } from "react-native";
export const checkListStyles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    gradient: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "600",
      color: "#fff",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: "rgba(255,255,255,0.7)",
      marginBottom: 15,
    },
    inputContainer: {
      marginBottom: 10,
    },
    list: {
      flex: 1,
    },
    itemContainer: {
      marginBottom: 12,
      borderRadius: 16,
      overflow: "hidden",
    },
    itemBlur: {
      overflow: "hidden",
    },
    itemContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderRadius: 16,
      backgroundColor: "rgba(255,255,255,0.05)",
    },
    itemText: {
      fontSize: 16,
      color: "#fff",
      flex: 1,
    },
    checkedText: {
      color: "#00b4d8",
      textDecorationLine: "line-through",
    },
    removeButton: {
      backgroundColor: "rgba(231,76,60,0.2)",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      marginLeft: 12,
    },
    removeText: {
      color: "#e74c3c",
      fontSize: 14,
      fontWeight: "500",
    },
    buttonContainer: {
      marginTop: 20,
      marginBottom: 30,
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 8,
    },
    progressContainer: {
      marginTop: 15,
    },
  });