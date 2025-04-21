import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../types/NavigationTypes";
import { LOGIN_SCREENS, SCREENS } from "../constants/screens";
import { resetToMain } from "../navigation/RootNavigation";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";
import { BlurView } from "expo-blur";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  typeof LOGIN_SCREENS.Login
>;

const { height } = Dimensions.get("window");
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const scale = useSharedValue(1);
  const inputScale = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: inputScale.value }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleInputFocus = () => {
    inputScale.value = withSequence(withSpring(1.02), withSpring(1));
  };

  const handleButtonPressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handleButtonPressOut = () => {
    buttonScale.value = withSpring(1);
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
      console.log("✅ Successfully logged in");
      resetToMain();
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/childHero.jpg")}
          resizeMode="cover"
          style={styles.bg}
        >
          <StatusBar barStyle="light-content" />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.container}
          >
            {/* Top gradient overlay */}
            <LinearGradient
              colors={["rgba(0,0,0,0.7)", "transparent"]}
              style={styles.topGradient}
            />

            {/* Swirl container */}
            <Animated.View
              entering={FadeInUp.duration(800).springify()}
              style={styles.swirlContainer}
            >
              {/* Swirl shape */}
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

              {/* Content */}
              <View style={styles.contentContainer}>
                <Animated.View
                  entering={FadeInUp.duration(600).delay(200).springify()}
                >
                  <Text style={styles.heading}>Welcome Back</Text>
                  <Text style={styles.subtitle}>
                    Let's get you back on the water
                  </Text>
                </Animated.View>

                <Animated.View
                  entering={FadeInUp.duration(600).delay(400).springify()}
                  style={styles.inputContainer}
                >
                  <View style={styles.inputWrapper}>
                    <Animated.View
                      style={[styles.inputBlurContainer, inputAnimatedStyle]}
                    >
                      <BlurView
                        intensity={25}
                        tint="dark"
                        style={styles.inputBlur}
                      >
                        <View style={styles.inputContent}>
                          <Icon
                            name="mail-outline"
                            size={20}
                            color="#00b4d8"
                            style={styles.inputIcon}
                          />
                          <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="rgba(255,255,255,0.6)"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            value={email}
                            onFocus={handleInputFocus}
                          />
                        </View>
                      </BlurView>
                    </Animated.View>
                  </View>

                  <View style={styles.inputWrapper}>
                    <Animated.View
                      style={[styles.inputBlurContainer, inputAnimatedStyle]}
                    >
                      <BlurView
                        intensity={25}
                        tint="dark"
                        style={styles.inputBlur}
                      >
                        <View style={styles.inputContent}>
                          <Icon
                            name="lock-closed-outline"
                            size={20}
                            color="#00b4d8"
                            style={styles.inputIcon}
                          />
                          <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="rgba(255,255,255,0.6)"
                            secureTextEntry
                            onChangeText={setPassword}
                            value={password}
                            onFocus={handleInputFocus}
                          />
                        </View>
                      </BlurView>
                    </Animated.View>
                  </View>
                </Animated.View>

                <Animated.View
                  entering={FadeInUp.duration(600).delay(600).springify()}
                  style={styles.buttonContainer}
                >
                  <AnimatedTouchableOpacity
                    style={[styles.loginButton, buttonAnimatedStyle]}
                    onPress={handleLogin}
                    onPressIn={handleButtonPressIn}
                    onPressOut={handleButtonPressOut}
                  >
                    <LinearGradient
                      colors={["#00b4d8", "#0077b6"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.gradient}
                    >
                      <Icon name="log-in-outline" size={20} color="#fff" />
                      <Text style={styles.buttonText}>Login</Text>
                    </LinearGradient>
                  </AnimatedTouchableOpacity>

                  <TouchableOpacity
                    style={styles.signupLink}
                    onPress={() => navigation.navigate(LOGIN_SCREENS.Signup)}
                  >
                    <Text style={styles.signupText}>
                      Don't have an account?{" "}
                      <Text style={styles.signupHighlight}>Sign Up</Text>
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: "center",
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
  },
  swirlContainer: {
    position: "absolute",
    top: height * 0.2,
    left: 0,
    right: 0,
    bottom: 0,
  },
  swirlShape: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 50,
    overflow: "hidden",
  },
  swirlGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 50,
  },
  contentContainer: {
    position: "absolute",
    top: height * 0.1,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
    fontFamily: "System",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    marginBottom: 24,
    fontFamily: "System",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  inputWrapper: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputBlurContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  inputBlur: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    marginBottom: 12,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#00b4d8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  signupLink: {
    marginTop: 6,
  },
  signupText: {
    color: "#e0e0e0",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  signupHighlight: {
    color: "#00b4d8",
    fontWeight: "600",
  },
});
