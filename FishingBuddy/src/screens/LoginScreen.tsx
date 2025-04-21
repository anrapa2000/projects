import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../types/NavigationTypes";
import { LOGIN_SCREENS, SCREENS } from "../constants/screens";
import { resetToMain } from "../navigation/RootNavigation";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  typeof LOGIN_SCREENS.Login
>;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Info", "Please enter both email and password.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Successfully logged in");
      resetToMain()
    } catch (error: any) {
      console.error("❌ Auth error:", error.code);
      switch (error.code) {
        case "auth/user-not-found":
          Alert.alert(
            "User Not Found",
            "No account found for this email. Please sign up first."
          );
          break;
        case "auth/wrong-password":
          Alert.alert("Incorrect Password", "The password is incorrect.");
          break;
        case "auth/invalid-email":
          Alert.alert("Invalid Email", "The email address is not valid.");
          break;
        default:
          Alert.alert("Login Error", error.message);
          break;
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Welcome Back 👋</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{ marginTop: 16 }}>
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => navigation.navigate(LOGIN_SCREENS.Signup)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 32 },
  input: {
    backgroundColor: "#f0f0f0",
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
});
