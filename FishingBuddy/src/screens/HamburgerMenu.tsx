import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/NavigationTypes";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { SCREENS } from "../constants/screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetToLogin } from "../navigation/RootNavigation";
import { deleteProfile } from "../services/profileStorage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type HomeScreenNavProp = NativeStackNavigationProp<
  MainStackParamList,
  typeof SCREENS.HamburgerMenu
>;
export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavProp>();
  const handleLogout = async () => {
    console.log("Logging out...");
    await deleteProfile();
    await signOut(auth);
    resetToLogin();
  };
  const handleDevReset = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Entry" }],
      })
    );
  };
  interface MenuButtonProps {
    title: string;
    icon: string;
    onPress: () => void;
    isDanger?: boolean;
  }
  const MenuButton = ({
    title,
    icon,
    onPress,
    isDanger = false,
  }: MenuButtonProps) => (
    <TouchableOpacity
      style={[styles.menuButton, isDanger && styles.dangerButton]}
      onPress={onPress}
    >
      <Icon name={icon} size={24} color={isDanger ? "#fff" : "#007AFF"} />
      <Text style={[styles.buttonText, isDanger && styles.dangerText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎣 FishingBuddy</Text>
      </View>
      <View style={styles.menuContainer}>
        <MenuButton
          title="Log a Catch"
          icon="fish"
          onPress={() => navigation.navigate(SCREENS.LogCatch)}
        />
        <MenuButton
          title="View Catch History"
          icon="history"
          onPress={() => navigation.navigate(SCREENS.CatchHistory)}
        />
        <MenuButton
          title="View Map"
          icon="map-marker"
          onPress={() => navigation.navigate(SCREENS.Map)}
        />
        <MenuButton
          title="Profile"
          icon="account"
          onPress={() => navigation.navigate(SCREENS.Profile)}
        />
        <MenuButton
          title="Helpful Links"
          icon="link"
          onPress={() => navigation.navigate(SCREENS.HelpFulLinks)}
        />
      </View>
      <View style={styles.footer}>
        <MenuButton
          title="Log Out"
          icon="logout"
          onPress={handleLogout}
          isDanger={true}
        />
        <MenuButton
          title="Reset Storage"
          icon="delete"
          onPress={handleDevReset}
          isDanger={true}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  menuContainer: {
    flex: 1,
    padding: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
  },
  dangerButton: {
    backgroundColor: "#d9534f",
  },
  dangerText: {
    color: "#fff",
  },
});
