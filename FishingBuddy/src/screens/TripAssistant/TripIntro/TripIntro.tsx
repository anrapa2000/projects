import React from "react";
import { View, Text, ImageBackground, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TRIP_SCREENS } from "../../../constants/screens";
import Button from "../../../components/Button/Button";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "../../../components/Button/BackButton";
import { TripIntroScreenNavigationProp } from "../../../types/navigationTypes";
import { tripIntroStyles as styles } from "./tripIntroStyles";
import { strings } from "../../../common/strings";

export function TripIntro() {
  const navigation = useNavigation<TripIntroScreenNavigationProp>();

  return (
    <ImageBackground
      source={require("../../../assets/images/chillFishingHero.jpg")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.95)"]}
        style={styles.gradient}
      >
        <BackButton />
        <View style={styles.content}>
          <Text style={styles.title}>{strings.tripAssistant.intro.title}</Text>
          <Text style={styles.subtitle}>
            {strings.tripAssistant.intro.subtitle}
          </Text>
          <Button
            text={strings.tripAssistant.intro.button}
            variant="primary"
            icon="fish"
            onPress={() => navigation.navigate(TRIP_SCREENS.TripChecklist)}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
