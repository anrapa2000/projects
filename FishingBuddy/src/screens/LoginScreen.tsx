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
import {
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { SCREENS } from "../constants/screens";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof SCREENS.Login
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
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.includes("password")) {
        // User exists → Login
        await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ Signed in");
      } else if (methods.length === 0) {
        Alert.alert(
          "User not found",
          "No account exists for this email. Try signing up."
        );
      } else {
        Alert.alert(
          "Account type mismatch",
          "This email is registered with a different login method (e.g., Google)."
        );
      }
    } catch (error: any) {
      console.error("❌ Auth error:", error.code, error.message);

      if (error.code === "auth/wrong-password") {
        Alert.alert("Incorrect password", "Try again or reset your password.");
      } else {
        Alert.alert("Login failed", error.message);
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
          onPress={() => navigation.navigate("Signup")}
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
