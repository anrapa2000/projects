import React from "react";
import { View, ImageBackground, StatusBar, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../../types/NavigationTypes";
import { LOGIN_SCREENS } from "../../constants/screens";
import SignUpContent from "./SignUpContent";
import { signupStyles as styles } from "./signupStyles";

type Nav = NativeStackNavigationProp<
  LoginStackParamList,
  typeof LOGIN_SCREENS.Signup
>;

export default function SignupScreen() {
  const navigation = useNavigation<Nav>();

  const handleSignIn = () => {
    navigation.navigate(LOGIN_SCREENS.Login);
  };

  const handleCreateProfile = () => {
    navigation.navigate(LOGIN_SCREENS.ProfileSetupBasic);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/kayakHero.jpg")}
      resizeMode="cover"
      style={styles.bg}
    >
      <StatusBar barStyle="light-content" />

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

        <SignUpContent
          onSignIn={handleSignIn}
          onCreateProfile={handleCreateProfile}
        />
      </Animated.View>
    </ImageBackground>
  );
}
