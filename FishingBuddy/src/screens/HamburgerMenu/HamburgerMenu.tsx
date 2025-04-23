import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { HamburgerMenuNavProp } from "../../types/navigationTypes";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../constants/screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetToLogin } from "../../navigation/RootNavigation";
import { deleteProfile } from "../../services/profileStorage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { hamburgerMenuStyles as styles } from "./hamburgerMenuStyles";
import { MenuButtonProps } from "../../types/types";

export default function HamburgerMenu() {
  const navigation = useNavigation<HamburgerMenuNavProp>();

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

  const MenuButton = ({
    title,
    icon,
    onPress,
    isDanger = false,
  }: MenuButtonProps) => (
    <TouchableOpacity
      style={[
        styles.menuButton,
        isDanger && styles.dangerButton,
        { backgroundColor: colors.background.input },
      ]}
      onPress={onPress}
    >
      <Icon
        name={icon}
        size={24}
        color={isDanger ? colors.error : colors.primary}
      />
      <Text
        style={[
          styles.buttonText,
          isDanger && styles.dangerText,
          { color: isDanger ? colors.error : colors.text.primary },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.map.background, colors.map.overlay]}
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.title}>FishingBuddy</Text>
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
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
