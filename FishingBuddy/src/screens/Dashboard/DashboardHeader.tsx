import { Animated, Button, TouchableOpacity, View } from "react-native";
import { dashboardStyles as styles } from "./dashboardStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { mockUser } from "../../data/mockData";
import { Image, Text } from "react-native";
import { DashboardScreenNavigationProp } from "../../types/navigationTypes";
import { useProfile } from "../../contexts/ProfileContext";
export default function DashboardHeader({
  navigation,
}: {
  navigation: DashboardScreenNavigationProp;
}) {
  const { profile } = useProfile();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const headerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HamburgerMenu")}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={28} color="#2d3748" testID="menu-button" />
      </TouchableOpacity>
      <Animated.View style={[styles.greetingContainer, headerStyle]}>
        <Text style={styles.greeting}>
          {greeting}, {profile?.name || mockUser.name}
        </Text>
      </Animated.View>

      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            testID="profile-image"
          >
            <Image
              source={{ uri: profile?.photo || mockUser.photo }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
