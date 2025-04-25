import React from "react";
import { View, SafeAreaView } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase/firebase";
import { HamburgerMenuNavProp } from "../../types/navigationTypes";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../constants/screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetToLogin } from "../../navigation/RootNavigation";
import { deleteProfile } from "../../services/profileStorage/profileStorage";
import { hamburgerMenuStyles as styles } from "./hamburgerMenuStyles";
import Button from "../../components/Button/Button";
import Background from "../../components/Background/Background";
import { strings } from "../../common/strings";
import Text from "../../components/Text/Text";
import BackButton from "../../components/Button/BackButton";

const hamburgerMenuStrings = strings.hamburgerMenu;

export default function HamburgerMenu() {
  const navigation = useNavigation<HamburgerMenuNavProp>();

  const handleLogout = async () => {
    await deleteProfile();
    await signOut(auth);
    resetToLogin();
  };

  const menuItems = [
    {
      title: hamburgerMenuStrings.logCatch,
      icon: "fish",
      onPress: () => navigation.navigate(SCREENS.LogCatch),
    },
    {
      title: hamburgerMenuStrings.viewCatchHistory,
      icon: "eye",
      onPress: () => navigation.navigate(SCREENS.CatchHistory),
    },
    {
      title: hamburgerMenuStrings.viewMap,
      icon: "location",
      onPress: () => navigation.navigate(SCREENS.Map),
    },
    {
      title: hamburgerMenuStrings.profile,
      icon: "person",
      onPress: () => navigation.navigate(SCREENS.Profile),
    },
    {
      title: hamburgerMenuStrings.helpfulLinks,
      icon: "link",
      onPress: () => navigation.navigate(SCREENS.HelpFulLinks),
    },
  ];

  const handleBackPress = () => {
    navigation.navigate(SCREENS.Dashboard);
  };

  return (
    <View style={styles.container}>
      <Background>
        <BackButton onPress={handleBackPress} />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text variant="heading" style={styles.title}>
              {strings.appName}
            </Text>
          </View>

          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <Button
                key={item.title}
                testID="menu-item"
                variant="menuItem"
                text={item.title}
                onPress={item.onPress}
                icon={item.icon}
              />
            ))}
          </View>

          <View style={styles.footer}>
            <Button
              testID="logout-button"
              variant="DANGER"
              text={hamburgerMenuStrings.logout}
              icon="log-out"
              onPress={handleLogout}
            />
          </View>
        </SafeAreaView>
      </Background>
    </View>
  );
}
