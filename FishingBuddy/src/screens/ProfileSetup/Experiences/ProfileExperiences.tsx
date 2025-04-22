import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  ImageBackground,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { LoginStackParamList } from "../../../types/NavigationTypes";
import { MainStackParamList } from "../../../types/NavigationTypes";
import { saveProfile } from "../../../services/profileStorage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { resetToMain } from "../../../navigation/RootNavigation";
import { preferencesStyles as styles } from "../styles";
import Button from "../../../components/Button/Button";
import InputField from "../../../components/InputField/InputField";

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
      totalCaught: Number(totalCaught),
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
      console.log(finalProfile);
      await saveProfile(finalProfile);
      Alert.alert("✅ Profile Saved", "Welcome to Fishing Buddy!");
      resetToMain();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Account exists", "Try logging in instead.");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/fishingHero.jpg")}
      resizeMode="cover"
      style={styles.bg}
    >
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "transparent"]}
        style={styles.topGradient}
      />

      <View style={styles.swirlContainer}>
        <View style={styles.swirlShape}>
          <LinearGradient
            colors={[
              "transparent",
              "rgba(0,0,0,0.2)",
              "rgba(0,0,0,0.8)",
              "#000",
            ]}
            style={styles.swirlGradient}
          />
        </View>

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
    </ImageBackground>
  );
}
