import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../../types/NavigationTypes";
import { LOGIN_SCREENS, SCREENS } from "../../constants/screens";

type PreferencesScreenNav = NativeStackNavigationProp<
  LoginStackParamList,
  typeof LOGIN_SCREENS.ProfileSetupPreferences
>;

type PreferencesRouteProp = RouteProp<
  LoginStackParamList,
  typeof LOGIN_SCREENS.ProfileSetupPreferences
>;

export default function ProfileSetupPreferencesScreen() {
  const navigation = useNavigation<PreferencesScreenNav>();
  const route = useRoute<PreferencesRouteProp>();
  const { basicProfile } = route.params;

  const [level, setLevel] = useState<string | null>(null);
  const [fishSpecies, setFishSpecies] = useState<string[]>([]);
  const [fishingTypes, setFishingTypes] = useState<string[]>([]);
  const [gear, setGear] = useState<string[]>([]);
  const [desiredCatch, setDesiredCatch] = useState<string[]>([]);

  const toggleSelection = (
    value: string,
    state: string[],
    setState: (s: string[]) => void
  ) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const OPTIONS = {
    level: ["Beginner", "Intermediate", "Pro"],
    fishSpecies: ["Bass", "Trout", "Catfish", "Salmon"],
    fishingTypes: ["Lake", "Ocean", "River", "Ice Fishing"],
    gear: ["Rod & Reel", "Net", "Fly Rod", "Hand Line"],
    desiredCatch: ["Recreation", "Food", "Trophy", "Sport"],
  };

  const handleNext = () => {
    const preferences = {
      level,
      fishSpecies,
      fishingTypes,
      gear,
      desiredCatch,
    };

    // Merge with basicProfile and move to next screen
    navigation.navigate(LOGIN_SCREENS.ProfileSetupExperience, {
      profile: {
        ...basicProfile,
        preferences,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎣 Your Fishing Preferences</Text>

      <Text style={styles.sectionTitle}>Experience Level</Text>
      <View style={styles.buttonRow}>
        {OPTIONS.level.map((l) => (
          <TouchableOpacity
            key={l}
            style={[styles.tag, level === l && styles.tagSelected]}
            onPress={() => setLevel(l)}
          >
            <Text style={styles.tagText}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Favorite Fish Species</Text>
      <View style={styles.buttonRow}>
        {OPTIONS.fishSpecies.map((species) => (
          <TouchableOpacity
            key={species}
            style={[
              styles.tag,
              fishSpecies.includes(species) && styles.tagSelected,
            ]}
            onPress={() =>
              toggleSelection(species, fishSpecies, setFishSpecies)
            }
          >
            <Text style={styles.tagText}>{species}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Preferred Fishing Type</Text>
      <View style={styles.buttonRow}>
        {OPTIONS.fishingTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.tag,
              fishingTypes.includes(type) && styles.tagSelected,
            ]}
            onPress={() => toggleSelection(type, fishingTypes, setFishingTypes)}
          >
            <Text style={styles.tagText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Gear You Use</Text>
      <View style={styles.buttonRow}>
        {OPTIONS.gear.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.tag, gear.includes(g) && styles.tagSelected]}
            onPress={() => toggleSelection(g, gear, setGear)}
          >
            <Text style={styles.tagText}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Your Goal When Fishing</Text>
      <View style={styles.buttonRow}>
        {OPTIONS.desiredCatch.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.tag, desiredCatch.includes(c) && styles.tagSelected]}
            onPress={() => toggleSelection(c, desiredCatch, setDesiredCatch)}
          >
            <Text style={styles.tagText}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 24 }}>
        <Button title="Next ➡️" onPress={handleNext} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    marginVertical: 12,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    padding: 10,
    backgroundColor: "#e1e1e1",
    borderRadius: 20,
    margin: 4,
  },
  tagSelected: {
    backgroundColor: "#007AFF",
  },
  tagText: {
    color: "#fff",
    fontWeight: "500",
  },
});
