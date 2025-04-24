import React, { createContext, useContext, useEffect, useState } from "react";
import { loadProfile } from "../services/profileStorage";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../theme/colors";
import Text from "../components/Text/Text";

type Profile = Awaited<ReturnType<typeof loadProfile>>;

type ProfileContextType = {
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  user: User | null;
  clearProfile: () => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await loadProfile();
      setProfile(data);
    } catch (error) {
      console.error("Failed to load profile:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const clearProfile = () => {
    setProfile(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>No profile found</Text>
      </View>
    );
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        refreshProfile: fetchProfile,
        clearProfile,
        user,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
