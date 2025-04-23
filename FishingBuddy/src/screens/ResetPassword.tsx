import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigation } from "@react-navigation/native";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Email required", "Please enter your registered email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert(
        "Password Reset Email Sent",
        "Check your inbox and follow the link to reset your password.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Reset Your Password</Text>
      <TextInput
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Send Reset Link" onPress={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 24 },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
});
