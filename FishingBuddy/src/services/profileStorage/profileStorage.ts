import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase/supabase";
import { waitForAuthUser } from "../../utils/authentication/authentication";

import { encryptData, decryptData } from "../../utils/encryption/encryption";
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

  const encryptedData = encryptData(profile);

  const { error, data } = await supabase
    .from("profiles")
    .upsert([
      {
        id: user.uid,
        email: profile.email,
        encrypted_data: encryptedData,
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
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  const decryptedData = decryptData(data.encrypted_data);
  return decryptedData;
};
