import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";
import * as Progress from "react-native-progress";
import { useRoute } from "@react-navigation/native";
import { TRIP_FLOW_STEPS } from "../../constants/screens";
import { LinearGradient } from "expo-linear-gradient";

export default function TripProgressBar() {
  const route = useRoute();
  const currentStep = route.name;

  const index = TRIP_FLOW_STEPS.indexOf(currentStep);
  const progress = (index + 1) / TRIP_FLOW_STEPS.length;

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Your Progress</Text>
        <View style={styles.progressWrapper}>
          <Progress.Bar
            progress={progress}
            width={Dimensions.get("window").width - 40}
            height={8}
            borderRadius={4}
            color="#00b4d8"
            unfilledColor="rgba(255, 255, 255, 0.97)"
            borderWidth={0}
            animated={true}
            animationType="spring"
          />
          <View style={styles.progressOverlay}>
            <LinearGradient
              colors={["rgba(0, 180, 216, 0.2)", "rgba(0, 180, 216, 0)"]}
              style={styles.progressGradient}
            />
          </View>
        </View>
        <Text style={styles.progressText}>
          {Math.round(progress * 100)}% Complete
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 180, 216, 0.1)",
  },
  progressContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
  },
  progressWrapper: {
    position: "relative",
    width: "100%",
  },
  progressOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressGradient: {
    height: "100%",
    width: "100%",
  },
  progressText: {
    fontSize: 14,
    color: "#00b4d8",
    fontWeight: "500",
    marginTop: 8,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(0, 180, 216, 0.1)",
  },
  percentageContainer: {
    backgroundColor: "#00b4d8",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
  labelWrapper: {
    flex: 1,
  },
  labelText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
  },
});
