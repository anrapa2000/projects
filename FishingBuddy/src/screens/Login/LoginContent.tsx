import React from "react";
import { View, TouchableOpacity } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import { loginScreenStyles as styles } from "./loginStyles";

type LoginContentProps = {
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  handleLogin: () => void;
  navigateToSignup: () => void;
  navigateToResetPassword: () => void;
};

const LoginContent: React.FC<LoginContentProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  navigateToSignup,
  navigateToResetPassword,
}) => (
  <View style={styles.contentContainer}>
    <Animated.View entering={FadeInUp.duration(600).delay(200).springify()}>
      <Text variant="heading">Welcome Back</Text>
      <Text variant="subtitle">Let's get you back on the water</Text>
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

      <Text variant="body" style={styles.signupText}>
        Don't have an account?{" "}
        <TouchableOpacity style={styles.signupLink} onPress={navigateToSignup}>
          <Text variant="link">Sign Up</Text>
        </TouchableOpacity>
      </Text>
      <TouchableOpacity onPress={navigateToResetPassword}>
        <Text variant="link" style={styles.forgotPassword}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </Animated.View>
  </View>
);

export default LoginContent;
