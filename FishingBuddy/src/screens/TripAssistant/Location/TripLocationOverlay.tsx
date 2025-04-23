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
              style={[
                styles.legendDot,
                { backgroundColor: colors.spot.default },
              ]}
            />
            <Text style={styles.legendText}>
              {tripLocationStrings.key.spots}
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: colors.spot.favorite },
              ]}
            />
            <Text style={styles.legendText}>
              {tripLocationStrings.key.favorite}
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: colors.spot.selected },
              ]}
            />
            <Text style={styles.legendText}>
              {tripLocationStrings.key.selected}
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: colors.spot.user }]}
            />
            <Text style={styles.legendText}>{tripLocationStrings.key.you}</Text>
          </View>
        </View>

        {selectedSpot ? (
          <View style={styles.selectedSpotContainer}>
            <Text style={styles.selectedSpotText}>{selectedSpot.name}</Text>
            <Button
              text={tripLocationStrings.button.next}
              icon="arrow-forward"
              onPress={() =>
                navigation.navigate("TripWeather", { selectedSpot })
              }
              variant="primary"
              size="small"
            />
          </View>
        ) : (
          <View style={styles.noSpotContainer}>
            <Text style={styles.noSpotText}>
              {tripLocationStrings.overlay.noSpot}
            </Text>
            <Button
              text={tripLocationStrings.button.skip}
              icon="arrow-forward"
              onPress={() =>
                navigation.navigate("TripWeather", {
                  selectedSpot: {
                    id: "default",
                    name: "No specific spot",
                    lat: location.coords.latitude,
                    lon: location.coords.longitude,
                  },
                })
              }
              variant="secondary"
              size="small"
            />
          </View>
        )}
      </View>
    </View>
  );
}
