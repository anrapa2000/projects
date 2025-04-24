import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { TRIP_SCREENS } from "../../../constants/screens";
import { TripChecklistScreenNavigationProp } from "../../../types/navigationTypes";
import { TripAssistantStorageKeys } from "../../../constants/storageConstants";
import Button from "../../../components/Button/Button";
import InputField from "../../../components/InputField/InputField";
import TripProgressBar from "../TripProgressBar";
import { checkListStyles as styles } from "./checkListStyles";
import BackButton from "../../../components/Button/BackButton";
import { strings } from "../../../common/strings";
import Background from "../../../components/Background/Background";

const checkListStrings = strings.tripAssistant.checkList.items;

const DEFAULT_ITEMS = [
  checkListStrings.fishingLicense,
  checkListStrings.fishingRod,
  checkListStrings.fishingLine,
  checkListStrings.hooks,
  checkListStrings.sinkers,
  checkListStrings.lures,
  checkListStrings.bait,
  checkListStrings.pliers,
  checkListStrings.net,
  checkListStrings.firstAidKit,
  checkListStrings.sunscreen,
  checkListStrings.hat,
];

export function TripChecklist() {
  const [items, setItems] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>("");
  const navigation = useNavigation<TripChecklistScreenNavigationProp>();

  useEffect(() => {
    const loadData = async () => {
      const savedItems = await AsyncStorage.getItem(
        TripAssistantStorageKeys.tripChecklistItems
      );
      const savedChecked = await AsyncStorage.getItem(
        TripAssistantStorageKeys.tripChecklistChecked
      );

      if (savedItems) setItems(JSON.parse(savedItems));
      else setItems(DEFAULT_ITEMS);

      if (savedChecked) setCheckedItems(JSON.parse(savedChecked));
    };

    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      TripAssistantStorageKeys.tripChecklistItems,
      JSON.stringify(items)
    );
  }, [items]);

  useEffect(() => {
    AsyncStorage.setItem(
      TripAssistantStorageKeys.tripChecklistChecked,
      JSON.stringify(checkedItems)
    );
  }, [checkedItems]);

  const toggleItem = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const removeItem = (item: string) => {
    setItems((prev) => prev.filter((i) => i !== item));
    setCheckedItems((prev) => prev.filter((i) => i !== item));
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems((prev) => [...prev, newItem.trim()]);
      setNewItem("");
    }
  };

  return (
    <Background>
      <View style={styles.overlay}>
        <View style={styles.gradient}>
          <BackButton />
          <View style={styles.progressContainer}>
            <TripProgressBar />
          </View>

          <Text style={styles.title}>Trip Checklist</Text>
          <Text style={styles.subtitle}>
            Tap each item once you've packed it
          </Text>

          <View style={styles.inputContainer}>
            <InputField
              icon="add-circle-outline"
              placeholder="Add custom item..."
              value={newItem}
              onChangeText={setNewItem}
            />
            <Button
              text="Add Item"
              icon="add-outline"
              variant="primary"
              size="big"
              onPress={handleAddItem}
            />
          </View>

          <FlatList
            data={items}
            keyExtractor={(item) => item}
            style={styles.list}
            renderItem={({ item }) => {
              const checked = checkedItems.includes(item);
              const isDefault = DEFAULT_ITEMS.includes(item);

              return (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => toggleItem(item)}
                  activeOpacity={0.7}
                >
                  <BlurView intensity={50} tint="dark" style={styles.itemBlur}>
                    <View style={styles.itemContent}>
                      <Text
                        style={[styles.itemText, checked && styles.checkedText]}
                      >
                        {item}
                      </Text>
                      {!isDefault && (
                        <TouchableOpacity
                          onPress={() => removeItem(item)}
                          style={styles.removeButton}
                        >
                          <Text style={styles.removeText}>Remove</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </BlurView>
                </TouchableOpacity>
              );
            }}
          />

          <View style={styles.buttonContainer}>
            <Button
              text="Reset"
              icon="refresh-outline"
              variant="secondary"
              size="small"
              onPress={() => {
                setItems(DEFAULT_ITEMS);
                setCheckedItems([]);
              }}
            />
            <Button
              text="Continue"
              icon="arrow-forward-outline"
              variant="primary"
              size="small"
              onPress={() => navigation.navigate(TRIP_SCREENS.TripLocation)}
            />
          </View>
        </View>
      </View>
    </Background>
  );
}
