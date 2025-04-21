import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import Button from "../../components/Button/Button";
import { signupStyles as styles } from "./signupStyles";

type SignUpContentProps = {
  onSignIn: () => void;
  onCreateProfile: () => void;
};

const SignUpContent: React.FC<SignUpContentProps> = ({
  onSignIn,
  onCreateProfile,
}) => (
  <View style={styles.contentContainer}>
    <Animated.View entering={FadeInUp.duration(600).delay(200).springify()}>
      <Text style={styles.heading}>Welcome Aboard</Text>
    </Animated.View>

    <Animated.View entering={FadeInUp.duration(600).delay(400).springify()}>
      <Text style={styles.subtitle}>
        The water is calm • Perfect time to fish
      </Text>
    </Animated.View>

    <Animated.View
      entering={FadeInUp.duration(600).delay(600).springify()}
      style={styles.buttonContainer}
    >
      <Button
        variant="primary"
        icon="log-in-outline"
        text="Sign In"
        onPress={onSignIn}
      />
      <Button
        variant="secondary"
        icon="person-add-outline"
        text="Create Profile"
        onPress={onCreateProfile}
      />
    </Animated.View>
  </View>
);

export default SignUpContent;
