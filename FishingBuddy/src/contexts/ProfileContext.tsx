import React, { createContext, useContext, useEffect, useState } from "react";
import { loadProfile } from "../services/profileStorage/profileStorage";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase/firebase";
import { Profile, ProfileContextType } from "./profileContextTypes";

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Provides the `ProfileContext` to its children, managing the user's profile, authentication state,
// and loading state. This context is responsible for fetching, clearing, and refreshing the user's profile.
export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Fetches the user's profile from storage and updates the state.
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
  // Clears the user's profile from the state.
  const clearProfile = () => {
    setProfile(null);
  };

  useEffect(() => {
    // Sets up an authentication state listener to update the user state
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchProfile();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

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

// Custom hook to access the `ProfileContext`. It throws an error if used outside of a `ProfileProvider`.
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
