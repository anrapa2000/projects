import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../../types/navigationTypes";
import { resetToMain } from "../../navigation/RootNavigation";
import Background from "../../components/Background/Background";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import { colors } from "../../theme/colors";
import { useProfile } from "../../contexts/ProfileContext";
import BackButton from "../../components/Button/BackButton";

type OtpVerificationRouteProp = RouteProp<
  LoginStackParamList,
  "OtpVerification"
>;
type OtpVerificationNavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  "OtpVerification"
>;
// OTPVerification component handles the verification of the OTP sent to the user's email.
export const OTPVerification = () => {
  const navigation = useNavigation<OtpVerificationNavigationProp>();
  const route = useRoute<OtpVerificationRouteProp>();
  const { sentOtp, email, password } = route.params;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { profile, loading } = useProfile();

  const handleVerify = async () => {
    if (otp === sentOtp && profile) {
      console.log("OTP verified");
      Alert.alert("Successfully verified", "Welcome to Fishing Buddy!");
      resetToMain();
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <Background>
      <BackButton />
      <View style={styles.container}>
        <Text variant="heading" style={styles.title}>
          Verify Your Email
        </Text>
        <Text variant="subtitle" style={styles.subtitle}>
          We've sent a verification code to {email}
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter OTP"
            keyboardType="numeric"
            maxLength={6}
            testID="otp-input"
          />
        </View>

        {error ? (
          <Text variant="body" style={styles.error}>
            {error}
          </Text>
        ) : null}

        <Button 
          text="Verify" 
          onPress={handleVerify} 
          variant="primary" 
          testID="otp-verify-button"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.backButton}
          testID="otp-login-button"
        >
          <Text variant="link">Back to Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
    color: colors.text.primary,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    color: colors.text.secondary,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.background.input,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: colors.text.primary,
  },
  error: {
    textAlign: "center",
    marginBottom: 20,
    color: colors.error,
  },
  backButton: {
    alignItems: "center",
  },
});
