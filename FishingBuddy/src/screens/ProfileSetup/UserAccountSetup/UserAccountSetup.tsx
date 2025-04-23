import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../../../types/navigationTypes";
import { LOGIN_SCREENS } from "../../../constants/screens";
import { Ionicons } from "@expo/vector-icons";
import InputField from "../../../components/InputField/InputField";
import Button from "../../../components/Button/Button";
import Text from "../../../components/Text/Text";
import Background from "../../../components/Background";
import { colors } from "../../../theme/colors";
import { useLocation, useEmailValidation } from "./hooks";
import { validateForm } from "./formValidation";
import { BasicProfile } from "./types";
import { userAccountStyles as styles } from "./userAccountStyles";

export default function ProfileSetupBasicScreen() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        LoginStackParamList,
        typeof LOGIN_SCREENS.ProfileSetupUserAccount
      >
    >();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const { location, locationString, hasLocationPermission } = useLocation();
  const emailAvailable = useEmailValidation(email);

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const passwordsMatch = password === confirmPassword;

  const isNextEnabled =
    name.trim() &&
    email.trim() &&
    password &&
    confirmPassword &&
    isEmailValid &&
    isPasswordValid &&
    passwordsMatch;

  const formatLocationDisplay = (address: string) => {
    const parts = address.split(", ");
    if (parts.length >= 2) {
      return parts.slice(-2).join(", ");
    }
    return address;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your photos.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const validate = () => {
    const newErrors = validateForm({
      name,
      email,
      password,
      age: age ? Number(age) : undefined,
      location,
      photo,
    });
    if (emailAvailable === false) {
      newErrors.push("Email already registered.");
    }
    if (!passwordsMatch) {
      newErrors.push("Passwords do not match.");
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    const basicProfile: BasicProfile = {
      name,
      email,
      password,
      age: age ? Number(age) : undefined,
      location,
      photo,
    };
    navigation.navigate(LOGIN_SCREENS.LicenseUpload, {
      basicProfile,
    });
  };

  return (
    <Background>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.flex}
            keyboardVerticalOffset={60}
          >
            <ScrollView
              contentContainerStyle={styles.scroll}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.profileImageContainer}
                  onPress={pickImage}
                >
                  {photo ? (
                    <Image
                      source={{ uri: photo }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <View style={styles.profileImagePlaceholder}>
                      <Ionicons
                        name="person"
                        size={40}
                        color={colors.text.secondary}
                      />
                    </View>
                  )}
                  <View style={styles.editIconContainer}>
                    <Ionicons
                      name="camera"
                      size={16}
                      color={colors.text.primary}
                    />
                  </View>
                </TouchableOpacity>
                <Text variant="heading2" style={styles.title}>
                  Create Your Account
                </Text>
                <Text variant="subtitle" style={styles.subtitle}>
                  Get started on your fishing journey with us
                </Text>
              </View>

              <View style={styles.formSection}>
                <View style={styles.inputsContainer}>
                  <InputField
                    icon="person-outline"
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                  />
                  <InputField
                    icon="mail-outline"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <InputField
                    icon="lock-closed-outline"
                    placeholder="Password"
                    secure
                    value={password}
                    onChangeText={setPassword}
                  />
                  <InputField
                    icon="shield-checkmark-outline"
                    placeholder="Confirm Password"
                    secure
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <InputField
                    icon="calendar-outline"
                    placeholder="Age (optional)"
                    value={age}
                    onChangeText={setAge}
                  />
                  {hasLocationPermission && (
                    <InputField
                      icon="location-outline"
                      placeholder="Location"
                      value={formatLocationDisplay(locationString)}
                      readOnly={true}
                    />
                  )}
                </View>

                {errors.length > 0 && (
                  <View style={styles.errorBox}>
                    {errors.map((err, i) => (
                      <Text key={i} variant="body" style={styles.errorText}>
                        • {err}
                      </Text>
                    ))}
                  </View>
                )}

                <View style={styles.buttonContainer}>
                  <Button
                    text="Continue"
                    icon="arrow-forward-outline"
                    onPress={handleNext}
                    variant="primary"
                    disabled={!isNextEnabled}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </Background>
  );
}
