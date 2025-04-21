import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_KEY = "@user_profile";

export const saveProfile = async (profile: any) => {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const loadProfile = async () => {
  const json = await AsyncStorage.getItem(PROFILE_KEY);
  return json ? JSON.parse(json) : null;
};

export const deleteProfile = async () => {
  await AsyncStorage.removeItem(PROFILE_KEY);
};
