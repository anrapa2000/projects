import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigation } from "@react-navigation/native";
import Background from "../components/Background";
import Button from "../components/Button/Button";
import InputField from "../components/InputField/InputField";
import Text from "../components/Text/Text";

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
    <Background>
      <View style={styles.container}>
        <Text variant="title">Reset Your Password</Text>
        <InputField
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          icon={""}
          keyboardType="email-address"
        />
        <View style={styles.button}>
          <Button
            variant="primary"
            onPress={handleReset}
            icon="send"
            text="Send Reset Link"
          />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  button: {
    marginTop: 16,
  },
});
