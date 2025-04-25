import React from "react";
import { View, ImageBackground, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SignupScreenNavigationProp } from "../../types/navigationTypes";
import { LOGIN_SCREENS } from "../../constants/screens";
import WelcomeContent from "./WelcomeContent";
import { welcomeStyles as styles } from "./welcomeStyles";

export default function Welcome() {
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleSignIn = () => {
    navigation.navigate(LOGIN_SCREENS.Login);
  };

  const handleCreateProfile = () => {
    navigation.navigate(LOGIN_SCREENS.AppInformation);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/kayakHero.jpg")}
      resizeMode="cover"
      style={styles.bg}
      testID="imageBackground"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.swirlShape}>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.9)", "#000"]}
          style={styles.swirlGradient}
          testID="swirlGradient"
        />
      </View>

      <WelcomeContent
        onSignIn={handleSignIn}
        onCreateProfile={handleCreateProfile}
      />
    </ImageBackground>
  );
}
