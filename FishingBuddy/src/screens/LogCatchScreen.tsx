import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { saveCatch } from "../services/storage";

export default function LogCatchScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [fishType, setFishType] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<Date>(new Date());

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location access is required to tag catch."
        );
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      const reversedAddress = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (reversedAddress.length > 0) {
        const geoCodedAddress = reversedAddress[0];
        const formattedAddress = `${geoCodedAddress.street}, ${geoCodedAddress.city}, ${geoCodedAddress.region}, ${geoCodedAddress.country}, ${geoCodedAddress.postalCode}`;
        setAddress(formattedAddress);
      } else {
        console.log("📍 Unable to fetch location");
      }
    })();
  }, []);

  // Pick image from camera or gallery
  const pickImage = async () => {
    try {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (cameraPermission.status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Camera access is required to take a photo."
        );
        return;
      }

      console.log("Opening camera...");

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        const photoUri = result.assets[0].uri;
        console.log("📸 Photo URI:", photoUri);
        setImage(photoUri);
      } else {
        console.log("📸 Photo capture cancelled");
      }
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert(
        "Camera Error",
        "Something went wrong while trying to open the camera."
      );
    }
  };

  const handleSave = async () => {
    if (!image || !fishType || !size || !location) {
      Alert.alert(
        "Missing info",
        "Please fill out all fields and take a photo."
      );
      return;
    }

    const catchData = {
      image,
      fishType,
      size,
      timestamp: timestamp.toISOString(),
      location: {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      },
    };

    await saveCatch(catchData);

    Alert.alert("Success", "Catch saved locally!");
    setFishType("");
    setSize("");
    setImage(null);
    // TODO: Firebase can be integrated later on
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Log Your Catch 🎣</Text>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button
        title={image ? "Retake Photo" : "Take Photo"}
        onPress={pickImage}
      />

      <TextInput
        placeholder="Type of Fish"
        style={styles.input}
        value={fishType}
        onChangeText={setFishType}
      />

      <TextInput
        placeholder="Size / Weight"
        style={styles.input}
        value={size}
        onChangeText={setSize}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Date/Time: {timestamp.toLocaleString()}</Text>

      {location ? (
        <Text style={styles.label}>
          Location: {address}
        </Text>
      ) : (
        <Text style={styles.label}>Fetching location...</Text>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Save Catch" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flexGrow: 1 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  label: { marginTop: 10, fontSize: 16 },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 12,
    borderRadius: 12,
  },
});

// TODO: Error handling for location and image picking
