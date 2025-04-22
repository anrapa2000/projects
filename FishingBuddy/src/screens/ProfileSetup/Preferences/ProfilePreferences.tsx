import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { LoginStackParamList } from "../../../types/NavigationTypes";
import { LOGIN_SCREENS } from "../../../constants/screens";
import { preferencesStyles as styles } from "../styles";

type PreferencesScreenNav = NativeStackNavigationProp<
  LoginStackParamList,
  typeof LOGIN_SCREENS.ProfileSetupPreferences
>;

type PreferencesRouteProp = RouteProp<
  LoginStackParamList,
  typeof LOGIN_SCREENS.ProfileSetupPreferences
>;

export default function ProfilePreferences() {
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

    navigation.navigate(LOGIN_SCREENS.ProfileSetupExperience, {
      profile: {
        ...basicProfile,
        preferences,
      },
    });
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/fishingHero.jpg")}
      resizeMode="cover"
      style={styles.bg}
    >
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "transparent"]}
        style={styles.topGradient}
      />

      <View style={styles.swirlContainer}>
        <View style={styles.swirlShape}>
          <LinearGradient
            colors={[
              "transparent",
              "rgba(0,0,0,0.2)",
              "rgba(0,0,0,0.8)",
              "#000",
            ]}
            style={styles.swirlGradient}
          />
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.contentWrapper}>
            <Text style={styles.heading}>Your Fishing Preferences</Text>
            <Text style={styles.subtitle}>
              Tell us about your fishing style and preferences
            </Text>

            <View style={styles.section}>
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
            </View>

            <View style={styles.section}>
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
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferred Fishing Type</Text>
              <View style={styles.buttonRow}>
                {OPTIONS.fishingTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.tag,
                      fishingTypes.includes(type) && styles.tagSelected,
                    ]}
                    onPress={() =>
                      toggleSelection(type, fishingTypes, setFishingTypes)
                    }
                  >
                    <Text style={styles.tagText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
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
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Goal When Fishing</Text>
              <View style={styles.buttonRow}>
                {OPTIONS.desiredCatch.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[
                      styles.tag,
                      desiredCatch.includes(c) && styles.tagSelected,
                    ]}
                    onPress={() =>
                      toggleSelection(c, desiredCatch, setDesiredCatch)
                    }
                  >
                    <Text style={styles.tagText}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next ➡️</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
