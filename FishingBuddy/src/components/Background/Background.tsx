
// A reusable background component that provides a consistent gradient background
// with an SVG overlay for the entire application. This component is
// memoized for performance optimization.
import React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";
import { backgroundSvg } from "../../assets/svg/backgroundSvg";

// Style definitions for the Background component
const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    transform: [{ scale: 1 }],
  },
  svgBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  contentContainer: { flex: 1 },
});

const GRADIENT_COLORS = ["#000000", "#0a2540", "#1a365d"] as const;

// Used memoised react component for performance optimization
const Background = React.memo(
  ({
    children,
    style,
  }: {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
  }) => (
    <View testID="background-container" style={[styles.container, style]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        testID="gradient-background"
        colors={GRADIENT_COLORS}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SvgXml
          testID="svg-background"
          xml={backgroundSvg}
          style={styles.svgBackground}
          width="100%"
          height="100%"
        />
        <View testID="content-container" style={styles.contentContainer}>
          {children}
        </View>
      </LinearGradient>
    </View>
  )
);

Background.displayName = "Background";

export default Background;
