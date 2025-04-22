import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { loadProfile, deleteProfile } from "../services/profileStorage";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadProfile().then((data) => {
      if (!data) {
        Alert.alert("Profile Not Found", "Redirecting to setup...");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Entry" }],
          })
        );
        return;
      }

      setProfile(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async () => {
    Alert.alert("Delete Profile?", "This will reset your app data.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteProfile();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Entry" }],
            })
          );
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>⚠️ No profile data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{profile.name}</Text>
      <Text>Email: {profile.email}</Text>
      {profile.age && <Text>Age: {profile.age}</Text>}
      {profile.preferences?.level && (
        <Text>Level: {profile.preferences.level}</Text>
      )}
      {profile.preferences?.fishSpecies?.length > 0 && (
        <Text>Fish: {profile.preferences.fishSpecies.join(", ")}</Text>
      )}
      {profile.experience?.totalCaught !== undefined && (
        <Text>Total Caught: {profile.experience.totalCaught}</Text>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Reset Profile" color="red" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 20 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
