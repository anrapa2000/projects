import { StyleProp, TextStyle, StyleSheet } from "react-native";
import { Text as RNText } from "react-native";

interface TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: keyof typeof variants;
}

const variants = {
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 6,
    fontFamily: "System",
    textAlign: "center",
  },
  heading2: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 24,
    fontFamily: "System",
    textAlign: "center",
    color: "#ffffff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
    fontFamily: "System",
    textAlign: "center",
    color: "#ffffff",
  },
  menuItemTitle: {
        fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
    fontFamily: "System",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 16,
    color: "#e2e8f0",
    marginBottom: 24,
    fontFamily: "System",
    textAlign: "center",
  },
  subtitle2: {
    fontSize: 16,
    color: "#e2e8f0",
    marginBottom: 24,
    fontFamily: "System",
  },
  body: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: "System",
  },
  link: {
    fontSize: 14,
    color: "#4299e1",
    fontFamily: "System",
    textDecorationLine: "underline",
  },
  subtitleDark: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 24,
    fontFamily: "System",
    textAlign: "center",
  },
  titleDark: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
    fontFamily: "System",
    textAlign: "center",
  },
};

export default function Text({ children, style, variant = "body" }: TextProps) {
  return (
    <RNText style={[styles.text, variants[variant], style]}>{children}</RNText>
  );
}

Text.displayName = "Text";

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Regular",
  },
});
