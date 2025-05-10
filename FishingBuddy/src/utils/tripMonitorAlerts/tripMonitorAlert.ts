import { Alert, Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// This function checks if the trip has ended and alerts the user if necessary.
export async function checkTripEndAndAlert() {
  const data = await AsyncStorage.getItem("trip_active");
  const emergencyContact = await AsyncStorage.getItem("emergency_contact");

  if (!data || !emergencyContact) return;

  const trip = JSON.parse(data);
  const now = Date.now();

  if (trip.endTime && now >= trip.endTime) {
    // Trip time has expired

    const message = encodeURIComponent(
      "I haven't returned from my fishing trip as scheduled. Please check in on me!"
    );
    const phone = emergencyContact.trim().replace(/\s+/g, "");

    const smsURL =
      Platform.OS === "ios"
        ? `sms:${phone}&body=${message}`
        : `sms:${phone}?body=${message}`;

    Linking.openURL(smsURL);
  }
}
