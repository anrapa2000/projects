import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TRIP_SCREENS } from "../../constants/screens";
import { TripStackParamList } from "../../types/NavigationTypes";

const STORAGE_KEY_ITEMS = "trip_checklist_items";
const STORAGE_KEY_CHECKED = "trip_checklist_checked";

const DEFAULT_ITEMS = [
  "🎣 Rod & Reel",
  "🪱 Bait / Lures",
  "🦺 Life Jacket",
  "📱 Phone / GPS",
  "🧢 Hat & Sunscreen",
  "🧊 Cooler Box",
  "📜 Fishing License",
];

type TripChecklistScreenNavigationProp = NativeStackNavigationProp<
  TripStackParamList,
  typeof TRIP_SCREENS.TripChecklist
>;

export function TripChecklistScreen() {
  const [items, setItems] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>("");
  const navigation = useNavigation<TripChecklistScreenNavigationProp>();

  useEffect(() => {
    const loadData = async () => {
      const savedItems = await AsyncStorage.getItem(STORAGE_KEY_ITEMS);
      const savedChecked = await AsyncStorage.getItem(STORAGE_KEY_CHECKED);

      if (savedItems) setItems(JSON.parse(savedItems));
      else setItems(DEFAULT_ITEMS); // first time load

      if (savedChecked) setCheckedItems(JSON.parse(savedChecked));
    };

    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY_CHECKED, JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const isNextEnabled =
    checkedItems.includes("🎣 Rod & Reel") &&
    checkedItems.includes("🦺 Life Jacket");

    const removeItem = (item: string) => {
        setItems((prev) => prev.filter((i) => i !== item));
        setCheckedItems((prev) => prev.filter((i) => i !== item));
      };
      

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧳 Trip Checklist</Text>
      <Text style={styles.subtitle}>
        Tap each item once you've packed it. Make sure you're ready!
      </Text>
      <View style={styles.addItemRow}>
        <TextInput
          value={newItem}
          onChangeText={setNewItem}
          placeholder="Add custom item..."
          style={styles.input}
        />
        <Button
          title="➕"
          onPress={() => {
            if (newItem.trim()) {
              setItems((prev) => [...prev, newItem.trim()]);
              setNewItem("");
            }
          }}
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
            const checked = checkedItems.includes(item);
            const isDefault = DEFAULT_ITEMS.includes(item);
          
            return (
              <View style={styles.itemRow}>
                <TouchableOpacity
                  style={[styles.item, checked && styles.checkedItem]}
                  onPress={() => toggleItem(item)}
                >
                  <Text style={checked ? styles.checkedText : styles.itemText}>
                    {checked ? "✅" : "⬜️"} {item}
                  </Text>
                </TouchableOpacity>
          
                {!isDefault && (
                  <TouchableOpacity onPress={() => removeItem(item)}>
                    <Text style={styles.removeBtn}>🗑️</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
      />
      <Button
  title="🔄 Reset to Default Items"
  onPress={() => {
    setItems(DEFAULT_ITEMS);
    setCheckedItems([]);
  }}
  color="#888"
/>


      <View style={{ marginTop: 24 }}>
        <Button
          title="Next ➡️"
          onPress={() => navigation.navigate(TRIP_SCREENS.TripLocation)}
          disabled={!isNextEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 12 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  item: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#e0f7fa",
  },
  checkedItem: {
    backgroundColor: "#c8e6c9",
  },
  itemText: {
    fontSize: 16,
  },
  checkedText: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "green",
  },
  addItemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  removeBtn: {
    fontSize: 18,
    paddingHorizontal: 8,
    color: "red",
  },
  
});
