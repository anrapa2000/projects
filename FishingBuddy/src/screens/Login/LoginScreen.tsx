import React, { useState } from "react";
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../../types/NavigationTypes";
import { LOGIN_SCREENS } from "../../constants/screens";
import { resetToMain } from "../../navigation/RootNavigation";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import LoginContent from "./LoginContent";
import { loginScreenStyles as styles } from "./loginStyles";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  typeof LOGIN_SCREENS.Login
>;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleAuthError = (errorCode: string) => {
    const errorMessages: Record<string, string> = {
      "auth/user-not-found":
        "No account found for this email. Please sign up first.",
      "auth/wrong-password": "The password is incorrect.",
      "auth/invalid-email": "The email address is not valid.",
      "auth/invalid-credential":
        "The provided credentials are invalid. Please check your email and password.",
    };

    Alert.alert(
      "Login Error",
      errorMessages[errorCode] ||
        "An unexpected error occurred. Please try again."
    );
  };

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
      console.log("Successfully logged in");
      resetToMain();
    } catch (error: any) {
      console.error("Auth error:", error.code);
      handleAuthError(error.code);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate(LOGIN_SCREENS.Signup);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/childHero.jpg")}
          resizeMode="cover"
          style={styles.bg}
        >
          <StatusBar barStyle="light-content" />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.container}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.7)", "transparent"]}
              style={styles.topGradient}
            />

            <Animated.View
              entering={FadeInUp.duration(800).springify()}
              style={styles.swirlContainer}
            >
              <View style={styles.swirlShape}>
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(0,0,0,0.2)",
                    "rgba(0,0,0,0.8)",
                    "#000",
                  ]}
                  style={styles.swirlGradient}
                />
              </View>

              <LoginContent
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                navigateToSignup={navigateToSignup}
              />
            </Animated.View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
