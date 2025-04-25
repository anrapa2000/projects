import React from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TripLicenseScreenNavigationProp } from "../../../types/navigationTypes";
import { strings } from "../../../common/strings";
import Button from "../../../components/Button/Button";
import { TripAssistantBase } from "../TripAssistantBase";
import { licenseStyles as styles } from "./licenseStyles";

const licenseStrings = strings.tripAssistant.license;

export function TripLicense() {
  const navigation = useNavigation<TripLicenseScreenNavigationProp>();
  const route = useRoute<any>();
  const { selectedSpot, weather } = route.params;

  return (
    <TripAssistantBase title={licenseStrings.title}>
      <View style={styles.contentBox}>
        <Text testID="license-text" style={styles.text}>{licenseStrings.text}</Text>
        <Text testID="license-note" style={styles.note}>{licenseStrings.note}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <Button
            testID="skip-button"
            text={licenseStrings.button.skip}
            icon="close"
            size="small"
            variant="secondary"
            onPress={() =>
              navigation.navigate("TripEndTime", { selectedSpot, weather })
            }
          />
          <Button
            testID="exit-button"
            text={licenseStrings.button.exit}
            icon="enter"
            size="small"
            variant="secondary"
            onPress={() =>
              navigation.navigate("Dashboard", {
                tripStarted: false,
                selectedSpot,
                weather,
                endTime: 0,
                startTime: 0,
              })
            }
          />
        </View>
        <Button
          testID="next-button"
          text={licenseStrings.button.next}
          icon="checkmark-circle"
          onPress={() =>
            navigation.navigate("TripEndTime", { selectedSpot, weather })
          }
        />
      </View>
    </TripAssistantBase>
  );
}
