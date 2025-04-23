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
  variant?: "primary" | "secondary" | "menuItem" | "DANGER";
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
        style={[
          styles.primaryButton,
          animatedStyle,
          size === "small" ? styles.smallButton : null,
        ]}
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

  if (variant === "menuItem") {
    return (
      <AnimatedTouchable
        style={[styles.menuItem, animatedStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <LinearGradient
          colors={["#ffffff", "#f0f0f0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.menuItemGradient}
        >
          <Icon name={icon} size={20} color="#00b4d8" />
          <Text style={styles.menuItemText}>{text}</Text>
        </LinearGradient>
      </AnimatedTouchable>
    );
  }

  if (variant === "DANGER") {
    return (
      <AnimatedTouchable
        style={[styles.dangerButton, animatedStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <LinearGradient
          colors={["#ffffff", "#f0f0f0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dangerGradient}
        >
          <Icon name={icon} size={20} color="#dc2626" />
          <Text style={styles.dangerText}>{text}</Text>
        </LinearGradient>
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedTouchable
      style={[
        styles.secondaryButton,
        animatedStyle,
        size === "small" ? styles.smallButton : null,
      ]}
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
  menuItem: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  menuItemGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    color: "#2d3748",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  dangerButton: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  dangerGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dangerText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
