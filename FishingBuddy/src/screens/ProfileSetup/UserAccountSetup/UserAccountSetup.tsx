import "react-native-reanimated"; //  <-- keep first!
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../../../types/navigationTypes";
import { LOGIN_SCREENS } from "../../../constants/screens";
import { LinearGradient } from "expo-linear-gradient";
import InputField from "../../../components/InputField/InputField";
import Button from "../../../components/Button/Button";
import { userAccountStyles as styles } from "./userAccountStyles";
import { useLocation, useEmailValidation } from "./hooks";
import { validateForm } from "./formValidation";
import { BasicProfile } from "./types";

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
    navigation.navigate(LOGIN_SCREENS.ProfileSetupPreferences, {
      basicProfile,
    });
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/fisherman.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={60}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            {/* Profile Photo Section */}
            {/* <Animated.View
              entering={FadeInUp.duration(600).delay(200)}
              style={styles.photoSection}
            >
              <Pressable onPress={pickImage} style={styles.photoWrapper}>
                <BlurView intensity={30} tint="dark" style={styles.photoBlur}>
                  {photo ? (
                    <Image source={{ uri: photo }} style={styles.photo} />
                  ) : (
                    <Text style={styles.addPhotoText}>Add Photo</Text>
                  )}
                </BlurView>
              </Pressable>
            </Animated.View> */}

            {/* Form Section */}
            <Animated.View
              entering={FadeInUp.duration(600).delay(400)}
              style={styles.formSection}
            >
              <Text style={styles.heading}>Create Your Account</Text>
              <Text style={styles.subtitle}>
                Let's get you started with your fishing journey
              </Text>

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
                    <Text key={i} style={styles.errorText}>
                      • {err}
                    </Text>
                  ))}
                </View>
              )}

              <Button
                text="Continue"
                icon="arrow-forward-outline"
                onPress={handleNext}
                variant="primary"
                disabled={!isNextEnabled}
              />
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ImageBackground>
  );
}
