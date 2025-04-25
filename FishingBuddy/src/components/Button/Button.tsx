import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import Text from "../Text/Text";
import { ButtonProps } from "../../types/types";
export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = "primary",
  icon = "log-in-outline",
  text = "Login",
  disabled = false,
  size = "big",
  testID,
}) => {
  const getButtonContent = () => {
    const commonContent = (
      <>
        <Icon
          name={icon}
          size={20}
          color={
            variant === "primary"
              ? "#fff"
              : variant === "DANGER"
              ? "#dc2626"
              : "#00b4d8"
          }
          testID="button-icon"
        />
        <Text
          variant="body"
          style={[
            styles.text,
            variant === "primary" && styles.primaryText,
            variant === "secondary" && styles.secondaryText,
            variant === "menuItem" && styles.menuItemText,
            variant === "DANGER" && styles.dangerText,
          ]}
        >
          {text}
        </Text>
      </>
    );

    if (variant === "primary") {
      return (
        <LinearGradient
          colors={disabled ? ["#666", "#444"] : ["#00b4d8", "#0077b6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {commonContent}
        </LinearGradient>
      );
    }

    if (variant === "menuItem" || variant === "DANGER") {
      return (
        <LinearGradient
          colors={["#ffffff", "#f0f0f0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {commonContent}
        </LinearGradient>
      );
    }

    return commonContent;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      style={[
        styles.button,
        variant === "primary" && styles.primaryButton,
        variant === "secondary" && styles.secondaryButton,
        variant === "menuItem" && styles.menuItem,
        variant === "DANGER" && styles.dangerButton,
        size === "small" && styles.smallButton,
        disabled && styles.disabled,
      ]}
    >
      {getButtonContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 12,
  },
  primaryButton: {
    shadowColor: "#00b4d8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#00b4d8",
    paddingVertical: 12,
    borderRadius: 20,
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
  text: {
    marginLeft: 8,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryText: {
    color: "#00b4d8",
    fontSize: 16,
    fontWeight: "600",
  },
  menuItem: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  menuItemText: {
    color: "#2d3748",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  dangerButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  dangerText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
