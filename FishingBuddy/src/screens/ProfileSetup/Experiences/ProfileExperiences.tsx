import React, { useState } from "react";
import { View, Text, ScrollView, Alert, StatusBar } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../../../types/navigationTypes";
import { MainStackParamList } from "../../../types/navigationTypes";
import { saveProfile } from "../../../services/profileStorage/profileStorage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase/firebase";
import { resetToMain } from "../../../navigation/RootNavigation";
import { preferencesStyles as styles } from "../styles";
import Button from "../../../components/Button/Button";
import InputField from "../../../components/InputField/InputField";
import Background from "../../../components/Background/Background";
import { waitForAuthUser } from "../../../utils/authentication/authentication";
import BackButton from "../../../components/Button/BackButton";

type ExperienceRouteProp = RouteProp<
  LoginStackParamList,
  "ProfileSetupExperience"
>;

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function ProfileSetupExperienceScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ExperienceRouteProp>();
  const { profile } = route.params;

  const [totalCaught, setTotalCaught] = useState("");
  const [biggestCatch, setBiggestCatch] = useState("");
  const [locationsFished, setLocationsFished] = useState("");

  const handleFinish = async () => {
    const experience = {
      totalCaught: Number(totalCaught) || 0,
      biggestCatch,
      locationsFished,
    };

    const finalProfile = {
      ...profile,
      experience,
    };

    try {
      await createUserWithEmailAndPassword(
        auth,
        finalProfile.email,
        finalProfile.password
      );
      await waitForAuthUser();
      await saveProfile(finalProfile);
      Alert.alert("Profile Saved", "Welcome to Fishing Buddy!");
      resetToMain();
    } catch (error: any) {
      console.error("Error in handleFinish:", error);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Account exists", "Try logging in instead.", [
          {
            text: "Okay",
            onPress: () => {
              navigation.navigate("Login");
            },
          },
        ]);
      } else {
        Alert.alert("Error", error.message || "Failed to create profile");
      }
    }
  };

  return (
    <Background style={styles.bg}>
      <BackButton />
      <StatusBar barStyle="light-content" />
      <View style={styles.swirlContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.contentWrapper}>
            <Text style={styles.heading}>Your Fishing Experience</Text>
            <Text style={styles.subtitle}>
              Share your fishing journey with us
            </Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Total Catches</Text>
              <InputField
                icon="fish-outline"
                placeholder="e.g. 50"
                value={totalCaught}
                onChangeText={setTotalCaught}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Biggest Catch</Text>
              <InputField
                icon="trophy-outline"
                placeholder="e.g. 15lb Trout"
                value={biggestCatch}
                onChangeText={setBiggestCatch}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Locations You've Fished</Text>
              <InputField
                icon="location-outline"
                placeholder="e.g. Lake Tahoe, Silver River, etc."
                value={locationsFished}
                onChangeText={setLocationsFished}
                multiline
              />
            </View>

            <Button
              onPress={handleFinish}
              text="Finish"
              icon="checkmark-circle-outline"
            />
          </View>
        </ScrollView>
      </View>
    </Background>
  );
}
