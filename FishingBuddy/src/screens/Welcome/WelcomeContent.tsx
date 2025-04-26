import React from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button/Button";
import { welcomeStyles as styles } from "./welcomeStyles";
import { WelcomeContentProps } from "../../types/types";
import { strings } from "../../common/strings";
import Animated, { FadeInUp } from "react-native-reanimated";

const welcomeStrings = strings.welcome.intro;

// WelcomeContent component renders the content of the welcome screen with a title, subtitle, and buttons for signing in and creating a profile.
const WelcomeContent: React.FC<WelcomeContentProps> = ({
  onSignIn,
  onCreateProfile,
}) => (
  <View style={styles.contentContainer}>
    <Animated.View entering={FadeInUp.duration(600).delay(200).springify()}>
      <Text style={styles.heading}>{welcomeStrings.title}</Text>
    </Animated.View>
    <Animated.View entering={FadeInUp.duration(600).delay(200).springify()}>
      <Text style={styles.subtitle}>{welcomeStrings.subtitle}</Text>
    </Animated.View>
    <Animated.View entering={FadeInUp.duration(600).delay(200).springify()}>
      <Button
        variant="primary"
        icon="log-in-outline"
        text="Sign In"
        onPress={onSignIn}
      />
    </Animated.View>
    <Animated.View entering={FadeInUp.duration(600).delay(200).springify()}>
      <Button
        variant="secondary"
        icon="person-add-outline"
        text="Create Profile"
        onPress={onCreateProfile}
      />
    </Animated.View>
  </View>
);

export default WelcomeContent;
