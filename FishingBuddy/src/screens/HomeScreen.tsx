import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/NavigationTypes";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { SCREENS } from "../constants/screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetToLogin } from "../navigation/RootNavigation";
import { deleteProfile } from "../services/profileStorage";

type HomeScreenNavProp = NativeStackNavigationProp<
  MainStackParamList,
  typeof SCREENS.Home
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavProp>();
  const handleLogout = async () => {
    console.log("🚪 Logging out...");
    await deleteProfile();
    await signOut(auth);
    resetToLogin();
  };

  const handleDevReset = async () => {
    await AsyncStorage.clear(); // or deleteProfile()

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎣 FishingBuddy</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="➕ Log a Catch"
          onPress={() => navigation.navigate(SCREENS.LogCatch)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="📜 View Catch History"
          onPress={() => navigation.navigate(SCREENS.CatchHistory)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="🗺️ View Map"
          onPress={() => navigation.navigate(SCREENS.Map)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Profile"
          onPress={() => navigation.navigate(SCREENS.Profile)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="🚪 Log Out" color="#d9534f" onPress={handleLogout} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Reset Storage"
          color="#d9534f"
          onPress={handleDevReset}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 24 },
  buttonContainer: { marginBottom: 12 },
});
