import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import { deleteProfile } from "../../services/profileStorage/profileStorage";
import { colors } from "../../theme/colors";
import Button from "../../components/Button/Button";
import Background from "../../components/Background/Background";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BackButton from "../../components/Button/BackButton";
import Text from "../../components/Text/Text";
import { useProfile } from "../../contexts/ProfileContext";
import { resetToLogin } from "../../navigation/RootNavigation";
import { deleteUser } from "firebase/auth";
import { auth } from "../../services/firebase/firebase";
import { supabase } from "../../services/supabase/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: License can be viewed in the profile screen

// profile screen displays the user's profile information, including personal details, preferences, and experience.
export default function ProfileScreen() {
  const { profile, loading, clearProfile } = useProfile();

  const handleDelete = async () => {
    Alert.alert(
      "Delete Profile?",
      "This will permanently delete your account and all associated data. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (!user) {
                throw new Error("No authenticated user found");
              }

              // Delete from Supabase first
              const { error: supabaseError } = await supabase
                .from("profiles")
                .delete()
                .eq("id", user.uid);

              if (supabaseError) {
                throw new Error(
                  `Supabase deletion failed: ${supabaseError.message}`
                );
              }

              // Delete from Firebase
              await deleteUser(user);

              // Clear local profile data
              await deleteProfile();
              clearProfile();
              await AsyncStorage.clear();

              // Reset to login screen
              resetToLogin();
            } catch (error) {
              console.error("Error deleting profile:", error);
              Alert.alert(
                "Error",
                "Failed to delete profile. Please try again later."
              );
            }
          },
        },
      ]
    );
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

  // No profile data found
  if (!profile) {
    return (
      <Background>
        <BackButton onPress={() => resetToLogin()} />
        <View style={styles.center}>
          <Text variant="subtitle">⚠️ No profile data found.</Text>
        </View>
      </Background>
    );
  }

  return (
    <Background>
      <BackButton />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            {profile.photo ? (
              <Image
                source={{ uri: profile.photo }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            ) : (
              <Icon name="account-circle" size={80} color={colors.primary} />
            )}
            <Text variant="heading2" style={{ paddingTop: 10 }}>
              {profile.name}
            </Text>
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
            {profile.experience.biggestCatch && (
              <View style={styles.infoRow}>
                <Text variant="body">
                  Biggest Catch: {profile.experience.biggestCatch}
                </Text>
              </View>
            )}
            {profile.experience.locationsFished && (
              <View style={styles.infoRow}>
                <Text variant="body">
                  Locations Fished: {profile.experience.locationsFished}
                </Text>
              </View>
            )}
          </View>
          {profile.licenseImage && (
            <View style={styles.section}>
              <Text variant="title">License</Text>
              <View style={styles.licenseImageContainer}>
                <Image
                  source={{ uri: profile.licenseImage }}
                  style={styles.licenseImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          )}

          <View style={styles.actions}>
            <Button
              variant="DANGER"
              text="Reset Profile"
              icon="trash-outline"
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
  licenseImageContainer: {
    width: "100%",
    height: 200,
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    overflow: "hidden",
  },
  licenseImage: {
    width: "100%",
    height: "100%",
  },
});
