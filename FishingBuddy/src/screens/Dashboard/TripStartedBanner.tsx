import { Animated, TouchableOpacity, View } from "react-native";
import { dashboardStyles as styles } from "./dashboardStyles";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Text } from "react-native";

type TripStartedBannerProps = {
  tripStarted: boolean;
  selectedSpot: any;
  startTime: any;
  endTime: any;
  handleStopTrip: () => void;
};

export default function TripStartedBanner({
  tripStarted,
  selectedSpot,
  startTime,
  endTime,
  handleStopTrip,
}: TripStartedBannerProps) {
  const opacity = useSharedValue(0);
  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    tripStarted && (
      <Animated.View style={[styles.tripBanner, cardStyle]}>
        <View style={styles.tripBannerContent}>
          <Text style={styles.tripText}>
            🎣 Trip in progress at {selectedSpot?.name}
          </Text>
          <Text style={styles.tripSubtext}>
            Started at: {new Date(startTime).toLocaleTimeString()}
          </Text>
          {endTime && (
            <Text style={styles.tripSubtext}>
              Ends at: {new Date(endTime).toLocaleTimeString()}
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
};
