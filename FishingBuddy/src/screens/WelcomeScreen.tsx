import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/NavigationTypes";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../services/firebase";
import { SCREENS } from "../constants/screens";

type WelcomeNavProp = NativeStackNavigationProp<
MainStackParamList,
  typeof SCREENS.Welcome
>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeNavProp>();

  const continueAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎣 Welcome to FishingBuddy</Text>
      <View style={styles.button}>
        <Button title="Log In" onPress={() => navigation.navigate("Login")} />
      </View>
      <View style={styles.button}>
        <Button title="Sign Up" onPress={() => navigation.navigate("Signup")} />
      </View>
      <View style={styles.button}>
        <Button title="Continue as Guest" onPress={continueAsGuest} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 32 },
  button: { marginVertical: 10 },
});
