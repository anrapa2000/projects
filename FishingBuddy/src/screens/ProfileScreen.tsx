import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { deleteProfile } from "../services/profileStorage";
import { colors } from "../theme/colors";
import Button from "../components/Button/Button";
import Background from "../components/Background";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BackButton from "../components/Button/BackButton";
import Text from "../components/Text/Text";
import { MainStackParamList } from "../types/navigationTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useProfile } from "../contexts/ProfileContext";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "Profile"
>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { profile, loading, clearProfile } = useProfile();

  const handleDelete = async () => {
    Alert.alert("Delete Profile?", "This will reset your app data.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteProfile();
            clearProfile();
            navigation.reset({
              index: 0,
              routes: [{ name: "ProfileSetupUserAccount" }],
            });
          } catch (error) {
            console.error("Error deleting profile:", error);
            Alert.alert("Error", "Failed to delete profile. Please try again.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <Background>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Background>
    );
  }

  if (!profile) {
    return (
      <Background>
        <View style={styles.center}>
          <Text variant="subtitle">⚠️ No profile data found.</Text>
        </View>
      </Background>
    );
  }

  return (
    <Background>
      <SafeAreaView style={styles.safeArea}>
        <BackButton />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Icon name="account-circle" size={80} color={colors.primary} />
            <Text variant="heading2">{profile.name}</Text>
          </View>

          <View style={styles.section}>
            <Text variant="title">Personal Information</Text>
            <View style={styles.infoRow}>
              <Text variant="body">{profile.email}</Text>
            </View>
            {profile.age && (
              <View style={styles.infoRow}>
                <Icon name="calendar" size={20} color={colors.text.secondary} />
                <Text variant="body">Age: {profile.age}</Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text variant="title">Preferences</Text>
            {profile.preferences?.level && (
              <View style={styles.infoRow}>
                <Text variant="body">Level: {profile.preferences.level}</Text>
              </View>
            )}
            {profile.preferences?.fishSpecies?.length > 0 && (
              <View style={styles.infoRow}>
                <Text variant="body">
                  Fish: {profile.preferences.fishSpecies.join(", ")}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text variant="title">Experience</Text>
            {profile.experience?.totalCaught !== undefined && (
              <View style={styles.infoRow}>
                <Text variant="body">
                  Total Caught: {profile.experience.totalCaught}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.actions}>
            <Button
              variant="DANGER"
              text="Reset Profile"
              icon="delete"
              onPress={handleDelete}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  actions: {
    marginTop: 20,
  },
});
