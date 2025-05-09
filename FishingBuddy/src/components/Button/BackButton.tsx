import { View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps {
  onPress?: () => void;
}

// Back button component - used in the header of the app
export default function BackButton({ onPress }: BackButtonProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.backButton}>
      <Ionicons
        name="arrow-back"
        size={28}
        color="#000"
        onPress={onPress || (() => navigation.goBack())}
        testID="back-button"
      />
    </View>
  );
}

// Style definitions for the BackButton component
const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 8,
    borderRadius: 24,
  },
});
