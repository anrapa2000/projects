import { View } from "react-native";
import { tripLocationStyles as styles } from "./tripLocationStyles";
import { colors } from "../../../theme/colors";
import { Text } from "react-native";
import Button from "../../../components/Button/Button";
import { strings } from "../../../common/strings";
import { TripLocationOverlayProps } from "../../../types/types";

const tripLocationStrings = strings.tripAssistant.location;

export default function TripLocationOverlay({
  location,
  selectedSpot,
  navigation,
}: TripLocationOverlayProps) {
  return (
    <View style={styles.bottomOverlay}>
      <View style={styles.bottomContent}>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              testID="default-spot-dot"
              style={[
                styles.legendDot,
                { backgroundColor: colors.spot.default },
              ]}
            />
            <Text testID="default-spot-text" style={styles.legendText}>
              {tripLocationStrings.key.spots}
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              testID="favorite-spot-dot"
              style={[
                styles.legendDot,
                { backgroundColor: colors.spot.favorite },
              ]}
            />
            <Text testID="favorite-spot-text" style={styles.legendText}>
              {tripLocationStrings.key.favorite}
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              testID="selected-spot-dot"
              style={[
                styles.legendDot,
                { backgroundColor: colors.spot.selected },
              ]}
            />
            <Text testID="selected-spot-text" style={styles.legendText}>
              {tripLocationStrings.key.selected}
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              testID="user-dot"
              style={[styles.legendDot, { backgroundColor: colors.spot.user }]}
            />
            <Text testID="user-text" style={styles.legendText}>
              {tripLocationStrings.key.you}
            </Text>
          </View>
        </View>

        {selectedSpot && (
          <View style={styles.selectedSpotContainer}>
            <Text testID="selected-spot-name" style={styles.selectedSpotText}>
              {selectedSpot.name}
            </Text>
            <Button
              testID="next-button"
              text={tripLocationStrings.button.next}
              icon="arrow-forward"
              onPress={() =>
                navigation.navigate("TripWeather", { selectedSpot })
              }
              variant="primary"
              size="small"
            />
          </View>
        )}
      </View>
    </View>
  );
}
