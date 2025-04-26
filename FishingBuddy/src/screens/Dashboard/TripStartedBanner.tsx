import { Animated, TouchableOpacity, View } from "react-native";
import { dashboardStyles as styles } from "./dashboardStyles";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Text } from "react-native";

type TripStartedBannerProps = {
  routeParams: any;
  handleStopTrip: () => void;
};
// This component displays a banner when a trip is started, showing the trip details and a button to stop the trip.
export default function TripStartedBanner({
  routeParams,
  handleStopTrip,
}: TripStartedBannerProps) {
  const { tripStarted, selectedSpot, startTime, endTime, endDate } =
    routeParams;
  const opacity = useSharedValue(0);
  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    tripStarted && (
      <Animated.View style={[styles.tripBanner, cardStyle]}>
        <View style={styles.tripBannerContent}>
          <Text style={styles.tripText}>
            Trip in progress at {selectedSpot?.name}
          </Text>
          <Text style={styles.tripSubtext}>
            Started on:{" "}
            {new Date(startTime).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            {new Date(startTime).toLocaleTimeString()}
          </Text>
          {endTime && (
            <Text style={styles.tripSubtext}>
              Ends on: {endDate} {new Date(endTime).toLocaleTimeString()}
            </Text>
          )}

          <TouchableOpacity
            style={styles.stopTripButton}
            onPress={handleStopTrip}
          >
            <Text style={styles.stopTripButtonText}>Stop Trip</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  );
}
