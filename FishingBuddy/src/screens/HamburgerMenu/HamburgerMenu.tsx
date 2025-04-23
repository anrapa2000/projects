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
import { hamburgerMenuStyles as styles } from "./hamburgerMenuStyles";
import { MenuButtonProps } from "../../types/types";
import Button from "../../components/Button/Button";
import Background from "../../components/Background";

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

  const menuItems = [
    {
      title: "Log a Catch",
      icon: "fish",
      onPress: () => navigation.navigate(SCREENS.LogCatch),
    },
    {
      title: "View Catch History",
      icon: "view",
      onPress: () => navigation.navigate(SCREENS.CatchHistory),
    },
    {
      title: "View Map",
      icon: "map-marker",
      onPress: () => navigation.navigate(SCREENS.Map),
    },
    {
      title: "Profile",
      icon: "profile",
      onPress: () => navigation.navigate(SCREENS.Profile),
    },
    {
      title: "Helpful Links",
      icon: "link",
      onPress: () => navigation.navigate(SCREENS.HelpFulLinks),
    },
  ];

  return (
    <View style={styles.container}>
      <Background>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.title}>FishingBuddy</Text>
          </View>

          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <Button
                key={item.title}
                variant="menuItem"
                text={item.title}
                onPress={item.onPress}
                icon={item.icon}
              />
            ))}
          </View>

          <View style={styles.footer}>
            <Button
              variant="DANGER"
              text="Log Out"
              icon="logout"
              onPress={handleLogout}
            />
            <Button
              variant="DANGER"
              text="Reset Storage"
              icon="delete"
              onPress={handleDevReset}
            />
          </View>
        </SafeAreaView>
      </Background>
    </View>
  );
}
