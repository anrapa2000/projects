import { Alert, Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkTripEndAndAlert } from "./tripMonitorAlert";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
  Linking: {
    openURL: jest.fn(),
  },
  Platform: {
    OS: "ios", // Default to iOS for testing
  },
}));

describe("checkTripEndAndAlert", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should do nothing if no trip data is found", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    await checkTripEndAndAlert();

    expect(Alert.alert).not.toHaveBeenCalled();
    expect(Linking.openURL).not.toHaveBeenCalled();
  });

  it("should do nothing if no emergency contact is found", async () => {
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce(JSON.stringify({ endTime: Date.now() + 10000 }))
      .mockResolvedValueOnce(null);

    await checkTripEndAndAlert();

    expect(Alert.alert).not.toHaveBeenCalled();
    expect(Linking.openURL).not.toHaveBeenCalled();
  });

  it("should show an alert if the trip end time has passed", async () => {
    const endTime = Date.now() - 10000; // Trip has ended
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce(JSON.stringify({ endTime }))
      .mockResolvedValueOnce("1234567890");

    await checkTripEndAndAlert();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Trip Ended",
      "Your fishing trip's scheduled end time has passed. Do you want to notify your emergency contact?",
      expect.any(Array)
    );
  });

  it("should send an alert message when 'Send Alert' is pressed", async () => {
    const endTime = Date.now() - 10000; // Trip has ended
    const emergencyContact = "1234567890";
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce(JSON.stringify({ endTime }))
      .mockResolvedValueOnce(emergencyContact);

    const alertButtons: any[] = [];
    (Alert.alert as jest.Mock).mockImplementation(
      (_title, _message, buttons) => {
        alertButtons.push(...buttons);
      }
    );

    await checkTripEndAndAlert();

    // Simulate pressing the "Send Alert" button
    const sendAlertButton = alertButtons.find(
      (button) => button.text === "Send Alert"
    );
    sendAlertButton.onPress();

    const encodedMessage = encodeURIComponent(
      "I haven't returned from my fishing trip as scheduled. Please check in on me!"
    );
    const expectedSmsURL = `sms:${emergencyContact}&body=${encodedMessage}`;

    expect(Linking.openURL).toHaveBeenCalledWith(expectedSmsURL);
  });

  it("should not send an alert message when 'I'm Safe' is pressed", async () => {
    const endTime = Date.now() - 10000; // Trip has ended
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce(JSON.stringify({ endTime }))
      .mockResolvedValueOnce("1234567890");

    const alertButtons: any[] = [];
    (Alert.alert as jest.Mock).mockImplementation(
      (_title, _message, buttons) => {
        alertButtons.push(...buttons);
      }
    );

    await checkTripEndAndAlert();

    // Simulate pressing the "I'm Safe" button
    const safeButton = alertButtons.find(
      (button) => button.text === "I'm Safe"
    );
    safeButton.onPress?.();

    expect(Linking.openURL).not.toHaveBeenCalled();
  });
});
