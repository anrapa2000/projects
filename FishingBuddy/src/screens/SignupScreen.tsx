import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../types/NavigationTypes";
import { LOGIN_SCREENS } from "../constants/screens";

type NavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  typeof LOGIN_SCREENS.Signup
>;

export default function SignupScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎣 Welcome to Fishing Buddy</Text>
      <Text style={styles.subtitle}>Start fresh or log into an existing profile</Text>

      <View style={styles.buttonWrapper}>
        <Button
          title="🔐 Log In"
          onPress={() => navigation.navigate(LOGIN_SCREENS.Login)}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="🆕 Create Profile"
          onPress={() => navigation.navigate(LOGIN_SCREENS.ProfileSetupBasic)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "600", textAlign: "center", marginBottom: 12 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 24, color: "#666" },
  buttonWrapper: { marginVertical: 8 },
});
