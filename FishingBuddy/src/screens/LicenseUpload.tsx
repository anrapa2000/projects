import React, { useState } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Background from "../components/Background";
import Button from "../components/Button/Button";
import Text from "../components/Text/Text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../theme/colors";
import { licenseUploadStyles as styles } from "./licenseUploadStyles";
import { LOGIN_SCREENS } from "../constants/screens";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { LoginStackParamList } from "../types/navigationTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type LicenseUploadRouteProp = RouteProp<LoginStackParamList, "LicenseUpload">;
type LicenseUploadNavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  "LicenseUpload"
>;

export default function LicenseUpload() {
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation<LicenseUploadNavigationProp>();
  const route = useRoute<LicenseUploadRouteProp>();
  const { basicProfile } = route.params;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    navigation.navigate(LOGIN_SCREENS.ProfileSetupPreferences, {
      basicProfile: {
        ...basicProfile,
        licenseImage: image,
      },
    });
  };

  const handleSkip = () => {
    navigation.navigate(LOGIN_SCREENS.ProfileSetupPreferences, {
      basicProfile: {
        ...basicProfile,
        licenseImage: null,
      },
    });
  };

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text variant="heading2" style={styles.title}>
            Upload Your Fishing License
          </Text>
          <Text variant="subtitle">
            Please upload a clear photo of your valid fishing license.*
          </Text>

          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.placeholderContainer}>
                <Icon
                  name="file-image-plus"
                  size={48}
                  color={colors.text.secondary}
                />
                <Text variant="body" style={styles.placeholderText}>
                  Tap to select license photo
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <Text variant="subtitle" style={styles.subtitle}>
            *The license is securely stored and kept private. You can access it
            anytime through the app's menu.
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              text={image ? "Continue" : "Skip"}
              icon="arrow-forward"
              onPress={image ? handleContinue : handleSkip}
              variant="primary"
              size="big"
            />
          </View>
        </View>
      </View>
    </Background>
  );
}
