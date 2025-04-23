import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../theme/colors";

export const tripLocationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.map.background,
    paddingTop: 30,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.map.background,
    },
    loadingText: {
      color: "#fff",
      marginTop: 12,
      fontSize: 16,
    },
    heading: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 10,
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height * 0.75,
    },
    bottomOverlay: {
      position: "absolute",
      bottom: 20,
      left: 20,
      right: 20,
      zIndex: 10,
    },
    overlayGradient: {
      borderRadius: 16,
      padding: 16,
    },
    legendContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 16,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    legendDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 6,
    },
    legendText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "600",
    },
    selectedSpotContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    selectedSpotText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      flex: 1,
    },
    noSpotContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    noSpotText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      flex: 1,
    },
    bottomContent: {
      backgroundColor: colors.map.overlay,
      padding: 16,
      borderRadius: 16,
      width: "100%",
      marginBottom: 15,
    },
    topContainer: {
      width: "90%",
      alignSelf: "center",
      marginTop: 10,
    }
  });