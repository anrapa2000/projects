import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import {
  useNavigation,
  useRoute,
  RouteProp,
  CommonActions,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../../types/NavigationTypes";
import { MainStackParamList } from "../../types/NavigationTypes";
import { saveProfile } from "../../services/profileStorage";
import { SCREENS } from "../../constants/screens";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { resetToMain } from "../../navigation/RootNavigation";

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📊 Fishing Experience</Text>

      <Text style={styles.label}>🎣 Total Catches</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 50"
        keyboardType="numeric"
        value={totalCaught}
        onChangeText={setTotalCaught}
      />

      <Text style={styles.label}>🏆 Biggest Catch</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 15lb Trout"
        value={biggestCatch}
        onChangeText={setBiggestCatch}
      />

      <Text style={styles.label}>🗺️ Locations You've Fished</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="e.g. Lake Tahoe, Silver River, etc."
        value={locationsFished}
        onChangeText={setLocationsFished}
        multiline
      />

      <View style={{ marginTop: 24 }}>
        <Button title="Finish ✅" onPress={handleFinish} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
  },
});
