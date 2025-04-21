import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../types/NavigationTypes";
import { LOGIN_SCREENS } from "../constants/screens";
import Icon from "react-native-vector-icons/Ionicons";

type Nav = NativeStackNavigationProp<
  LoginStackParamList,
  typeof LOGIN_SCREENS.Signup
>;
const { height, width } = Dimensions.get("window");

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function SignupScreen() {
  const nav = useNavigation<Nav>();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <ImageBackground
      source={require("../assets/images/kayakHero.jpg")}
      resizeMode="cover"
      style={styles.bg}
    >
      <StatusBar barStyle="light-content" />

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
        <View style={styles.contentContainer}>
          <Animated.View
            entering={FadeInUp.duration(600).delay(200).springify()}
          >
            <Text style={styles.heading}>Welcome Aboard</Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(600).delay(400).springify()}
          >
            <Text style={styles.caption}>
              The water is calm • Perfect time to fish
            </Text>
          </Animated.View>

          <View style={styles.buttonContainer}>
            <AnimatedTouchableOpacity
              style={[styles.primaryBtn, animatedStyle]}
              onPress={() => nav.navigate(LOGIN_SCREENS.Login)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              entering={FadeInUp.duration(600).delay(600).springify()}
            >
              <LinearGradient
                colors={["#00b4d8", "#0077b6"]}
                style={styles.primaryGradient}
              >
                <Icon name="log-in-outline" size={20} color="#fff" />
                <Text style={styles.primaryText}>Sign In</Text>
              </LinearGradient>
            </AnimatedTouchableOpacity>

            <AnimatedTouchableOpacity
              style={[styles.secondaryBtn, animatedStyle]}
              onPress={() => nav.navigate(LOGIN_SCREENS.ProfileSetupBasic)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              entering={FadeInUp.duration(600).delay(800).springify()}
            >
              <Icon name="person-add-outline" size={20} color="#00b4d8" />
              <Text style={styles.secondaryText}>Create Profile</Text>
            </AnimatedTouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "flex-end",
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
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
  },
  swirlShape: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
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
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: height * 0.08,
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
    fontFamily: "System",
  },
  caption: {
    fontSize: 16,
    color: "#e0e0e0",
    marginBottom: 16,
    fontFamily: "System",
  },
  buttonContainer: {
    marginTop: 8,
  },
  primaryBtn: {
    marginBottom: 14,
    borderRadius: 20,
    overflow: "hidden",
  },
  primaryGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 20,
  },
  primaryText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#00b4d8",
    paddingVertical: 14,
    borderRadius: 20,
  },
  secondaryText: {
    color: "#00b4d8",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
