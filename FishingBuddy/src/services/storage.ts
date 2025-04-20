// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const CATCHES_KEY = '@catch_log';

export const saveCatch = async (newCatch: any) => {
  try {
    const json = await AsyncStorage.getItem(CATCHES_KEY);
    const current = json ? JSON.parse(json) : [];
    const updated = [...current, newCatch];
    await AsyncStorage.setItem(CATCHES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Error saving catch:", err);
  }
};

export const getCatches = async () => {
  try {
    const json = await AsyncStorage.getItem(CATCHES_KEY);
    return json ? JSON.parse(json) : [];
  } catch (err) {
    console.error("Error loading catches:", err);
    return [];
  }
};

export const clearCatches = async () => {
  try {
    await AsyncStorage.removeItem(CATCHES_KEY);
  } catch (err) {
    console.error("Error clearing catches:", err);
  }
};
