import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  variant?: "primary" | "secondary";
  icon?: string;
  text?: string;
  disabled?: boolean;
  size?: "big" | "small";
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function Button({
  onPress,
  variant = "primary",
  icon = "log-in-outline",
  text = "Login",
  disabled = false,
  size = "big",
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.5 : 1,
  }));

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.95);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1);
    }
  };

  const handlePress = (event: GestureResponderEvent) => {
    if (!disabled) {
      onPress(event);
    }
  };

  if (variant === "primary") {
    return (
      <AnimatedTouchable
        style={[styles.primaryButton, animatedStyle, size === "small" ? styles.smallButton : null]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <LinearGradient
          colors={disabled ? ["#666", "#444"] : ["#00b4d8", "#0077b6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Icon name={icon} size={20} color="#fff" />
          <Text style={styles.primaryText}>{text}</Text>
        </LinearGradient>
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedTouchable
      style={[styles.secondaryButton, animatedStyle, size === "small" ? styles.smallButton : null]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Icon name={icon} size={20} color={disabled ? "#666" : "#00b4d8"} />
      <Text
        style={[styles.secondaryText, { color: disabled ? "#666" : "#00b4d8" }]}
      >
        {text}
      </Text>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#00b4d8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  secondaryButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#00b4d8",
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  smallButton: {
    width: "48%",
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 20,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  secondaryText: {
    color: "#00b4d8",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
