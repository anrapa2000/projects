import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { saveCatch } from "../services/storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../components/Button/Button";
import BackButton from "../components/Button/BackButton";
import Background from "../components/Background";
import Text from "../components/Text/Text";
import { colors } from "../theme/colors";

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
  };

  return (
    <Background>
      <SafeAreaView style={styles.safeArea}>
        <BackButton />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text variant="heading2">Log Your Catch</Text>
            <Text variant="subtitle2">Record your fishing success</Text>
          </View>

          <View style={styles.section}>
            <Text variant="title">Capture the Moment</Text>
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Icon name="camera" size={48} color={colors.primary} />
                  <Text variant="body">Tap to take a photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text variant="title">Catch Details</Text>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Icon
                  name="fish"
                  size={24}
                  color={colors.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Type of Fish"
                  placeholderTextColor={colors.text.secondary}
                  style={styles.input}
                  value={fishType}
                  onChangeText={setFishType}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon
                  name="ruler"
                  size={24}
                  color={colors.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Size / Weight"
                  placeholderTextColor={colors.text.secondary}
                  style={styles.input}
                  value={size}
                  onChangeText={setSize}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="title">Trip Info</Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Icon name="clock" size={20} color={colors.primary} />
                <Text variant="body">{timestamp.toLocaleString()}</Text>
              </View>

              <View style={styles.infoRow}>
                <Icon name="map-marker" size={20} color={colors.primary} />
                <Text variant="body">
                  {location ? address : "Fetching location..."}
                </Text>
              </View>
            </View>
          </View>

          <Button
            text="Save Catch"
            icon="save"
            onPress={handleSave}
            disabled={!image || !fishType || !size || !location}
          />
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  section: {
    marginBottom: 32,
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.background.input,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.input,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    color: colors.text.primary,
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: colors.background.input,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});

// TODO: Error handling for location and image picking
