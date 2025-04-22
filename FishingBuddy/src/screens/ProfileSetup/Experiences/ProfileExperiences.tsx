import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
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
              <TextInput
                style={[
                  styles.tag,
                  { padding: 12, backgroundColor: "rgba(255, 255, 255, 0.1)" },
                ]}
                placeholder="e.g. 50"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                keyboardType="numeric"
                value={totalCaught}
                onChangeText={setTotalCaught}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Biggest Catch</Text>
              <TextInput
                style={[
                  styles.tag,
                  { padding: 12, backgroundColor: "rgba(255, 255, 255, 0.1)" },
                ]}
                placeholder="e.g. 15lb Trout"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={biggestCatch}
                onChangeText={setBiggestCatch}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Locations You've Fished</Text>
              <TextInput
                style={[
                  styles.tag,
                  {
                    padding: 12,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    height: 80,
                    textAlignVertical: "top",
                  },
                ]}
                placeholder="e.g. Lake Tahoe, Silver River, etc."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={locationsFished}
                onChangeText={setLocationsFished}
                multiline
              />
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={handleFinish}>
              <Text style={styles.nextButtonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
