import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./supabase";
import { waitForAuthUser } from "../utils/authentication";

// TODO: Replace with a secure env var or string
const PROFILE_KEY = "user_profile";

export const deleteProfile = async () => {
  await AsyncStorage.removeItem(PROFILE_KEY);
};

export const saveProfile = async (profile: any) => {
  const user = await waitForAuthUser();
  if (!user) {
    console.error("User not authenticated");
    throw new Error("User not authenticated");
  }

  const { error, data } = await supabase
    .from("profiles")
    .upsert([
      {
        id: user.uid,
        email: profile.email,
        name: profile.name,
        age: profile.age,
        photo: profile.photo,
        license_image: profile.licenseImage,
        location: profile.location,
        preferences: profile.preferences,
        experience: profile.experience,
      },
    ])
    .select();

  if (error) {
    console.error("Supabase upsert error:", error);
    throw error;
  }
};

export const loadProfile = async () => {
  const user = await waitForAuthUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.uid)
    .single();

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return data;
};
