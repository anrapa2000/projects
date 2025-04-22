import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TRIP_SCREENS } from "../../constants/screens";
import { TripStackParamList } from "../../types/NavigationTypes";

type TripLicenseScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList,
  typeof TRIP_SCREENS.TripLicense
>;

export function TripLicenseScreen() {
  const navigation = useNavigation<TripLicenseScreenNavigationProp>();
  const route = useRoute<any>();
  const { selectedSpot, weather } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 Fishing License Reminder</Text>

      <Text style={styles.text}>
        Depending on your region, a valid fishing license may be required.
      </Text>

      <Text style={styles.note}>
        Make sure you're compliant with local fishing laws before starting your trip.
      </Text>

      <View style={styles.btnRow}>
        <Button
          title="Skip for now"
          color="#999"
          onPress={() =>
            navigation.navigate("TripEndTime", { selectedSpot, weather })
          }
        />
        <Button
          title="I'm Licensed ✅"
          onPress={() =>
            navigation.navigate("TripEndTime", { selectedSpot, weather })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 16, textAlign: "center" },
  text: { fontSize: 16, marginBottom: 10, textAlign: "center" },
  note: { fontSize: 14, color: "#777", textAlign: "center", marginBottom: 20 },
  btnRow: {
    gap: 12,
    marginTop: 20,
    justifyContent: "center",
  },
});
