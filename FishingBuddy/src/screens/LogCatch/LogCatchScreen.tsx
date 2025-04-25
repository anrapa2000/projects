import React, { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  AlertButton,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { saveCatch } from "../../services/storage/storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../../components/Button/Button";
import BackButton from "../../components/Button/BackButton";
import Background from "../../components/Background/Background";
import Text from "../../components/Text/Text";
import InputField from "../../components/InputField/InputField";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../constants/screens";
import { colors } from "../../theme/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../types/navigationTypes";
import { logCatchStyles as styles } from "./logCatchStyles";

type LogCatchScreenNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

export default function LogCatchScreen() {
  const navigation = useNavigation<LogCatchScreenNavigationProp>();
  const [image, setImage] = useState<string | null>(null);
  const [fishType, setFishType] = useState("");
  const [size, setSize] = useState("");
  const [address, setAddress] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<Date>(new Date());

  const pickImage = async () => {
    try {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const galleryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraPermission.status !== "granted" ||
        galleryPermission.status !== "granted"
      ) {
        const buttons: AlertButton[] = [
          {
            text: "OK",
            onPress: () => navigation.navigate(SCREENS.HamburgerMenu),
          },
        ];
        Alert.alert(
          "Permission Denied",
          "Camera and gallery access is required to take or upload photos.",
          buttons
        );
        return;
      }

      Alert.alert("Choose Photo Source", "How would you like to add a photo?", [
        {
          text: "Take Photo",
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ["images"],
              allowsEditing: true,
              quality: 0.7,
            });

            if (!result.canceled) {
              const photoUri = result.assets[0].uri;
              console.log("📸 Photo URI:", photoUri);
              setImage(photoUri);
            }
          },
        },
        {
          text: "Choose from Gallery",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ["images"],
              allowsEditing: true,
              quality: 0.7,
            });

            if (!result.canceled) {
              const photoUri = result.assets[0].uri;
              console.log("📸 Photo URI:", photoUri);
              setImage(photoUri);
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.error("Photo error:", error);
      Alert.alert(
        "Error",
        "Something went wrong while trying to access photos."
      );
    }
  };

  const handleSave = async () => {
    if (saveDisabled) {
      Alert.alert(
        "Missing info",
        "Please fill any one of the fields or take a photo."
      );
      return;
    }

    const catchData = {
      image,
      fishType,
      size,
      timestamp: timestamp.toISOString(),
      location: address,
    };

    await saveCatch(catchData);

    const buttons: AlertButton[] = [
      {
        text: "OK",
        onPress: () => navigation.navigate(SCREENS.CatchHistory),
      },
    ];
    Alert.alert("Success", "Catch saved successfully!", buttons);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTimestamp(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    if (selectedTime) {
      const newTimestamp = new Date(timestamp);
      newTimestamp.setHours(selectedTime.getHours());
      newTimestamp.setMinutes(selectedTime.getMinutes());
      setTimestamp(newTimestamp);
    }
  };

  const saveDisabled = !(image || fishType || size);

  return (
    <Background>
      <SafeAreaView style={styles.safeArea}>
        <BackButton />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text variant="heading2">Log Your Catch</Text>
            <Text variant="subtitle2" style={styles.subtitle}>
              Record your fishing success
            </Text>
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
              <InputField
                icon="fish"
                placeholder="Type of Fish"
                value={fishType}
                onChangeText={setFishType}
              />

              <InputField
                icon="scale"
                placeholder="Size / Weight"
                value={size}
                onChangeText={setSize}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="title">Trip Info</Text>
            <View style={styles.infoContainer}>
              <View style={styles.dateTimeRow}>
                <View style={styles.dateTimeColumn}>
                  <Text variant="body" style={styles.dateTimeLabel}>
                    Date
                  </Text>
                  <View style={styles.dateTimePicker}>
                    <DateTimePicker
                      value={timestamp}
                      mode="date"
                      display="default"
                      onChange={onDateChange}
                    />
                  </View>
                </View>

                <View style={styles.dateTimeColumn}>
                  <Text variant="body" style={styles.dateTimeLabel}>
                    Time
                  </Text>
                  <View style={styles.dateTimePicker}>
                    <DateTimePicker
                      value={timestamp}
                      mode="time"
                      display="default"
                      onChange={onTimeChange}
                    />
                  </View>
                </View>
              </View>

              <Text variant="body" style={styles.dateTimeLabel}>
                Location
              </Text>
              <InputField
                icon="location"
                placeholder="Location"
                value={address || ""}
                onChangeText={setAddress}
              />
            </View>
          </View>

          <Button
            text="Save Catch"
            icon="save"
            onPress={handleSave}
            disabled={saveDisabled}
          />
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}

// TODO: Error handling for location and image picking
