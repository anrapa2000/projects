import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { loginScreenStyles as styles } from "./loginStyles";

type LoginContentProps = {
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  handleLogin: () => void;
  navigateToSignup: () => void;
};

const LoginContent: React.FC<LoginContentProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  navigateToSignup,
}) => (
  <View style={styles.contentContainer}>
    <Animated.View entering={FadeInUp.duration(600).delay(200).springify()}>
      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={styles.subtitle}>Let's get you back on the water</Text>
    </Animated.View>

    <Animated.View
      entering={FadeInUp.duration(600).delay(400).springify()}
      style={styles.inputContainer}
    >
      <InputField
        icon="mail-outline"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        icon="lock-closed-outline"
        placeholder="Password"
        secure
        value={password}
        onChangeText={setPassword}
      />
    </Animated.View>

    <Animated.View
      entering={FadeInUp.duration(600).delay(600).springify()}
      style={styles.buttonContainer}
    >
      <Button onPress={handleLogin} />
      <TouchableOpacity style={styles.signupLink} onPress={navigateToSignup}>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text style={styles.signupHighlight}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </Animated.View>
  </View>
);

export default LoginContent;
