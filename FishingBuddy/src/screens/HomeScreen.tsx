import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../constants/screens";

type HomeScreenNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof SCREENS.Home
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavProp>();
  const handleLogout = async () => {
    await signOut(auth);
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
        <Button title="🚪 Log Out" color="#d9534f" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 24 },
  buttonContainer: { marginBottom: 12 },
});
