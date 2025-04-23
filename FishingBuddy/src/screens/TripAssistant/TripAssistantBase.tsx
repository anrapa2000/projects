import { LinearGradient } from "expo-linear-gradient";
import TripProgressBar from "./TripProgressBar";
import { colors } from "../../theme/colors";
import { StyleSheet, Text } from "react-native";
import BackButton from "../../components/Button/BackButton";

export const TripAssistantBase = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  return (
    <LinearGradient
      colors={[colors.map.background, colors.map.overlay]}
      style={styles.container}
    >
      <BackButton />
      <TripProgressBar />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    color: colors.text.secondary,
  },
});
