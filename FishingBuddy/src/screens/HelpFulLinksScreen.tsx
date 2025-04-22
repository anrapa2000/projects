import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function HelpfulLinksScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Helpful Links</Text>

      <Text style={styles.sectionTitle}>Tutorial Videos</Text>
      <TouchableOpacity onPress={() => openLink("https://youtu.be/TvUJsP9LwZE")}>
        <Text style={styles.link}>How to Cast a Line</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openLink("https://youtu.be/Jzlj9YW_w-s")}>
        <Text style={styles.link}>Best Knots for Fishing</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Regional Info</Text>
      <TouchableOpacity onPress={() => openLink("https://www.fishing.ca.gov/License")}>
        <Text style={styles.link}>Buy a Fishing License</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openLink("https://www.fisheries.noaa.gov/topic/laws-policies")}>
        <Text style={styles.link}>U.S. Fishing Laws & Regulations</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Gear Resources</Text>
      <TouchableOpacity onPress={() => openLink("https://www.basspro.com/")}>
        <Text style={styles.link}>🧢 Bass Pro Shops</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openLink("https://www.cabelas.com/")}>
        <Text style={styles.link}>Cabela's</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#007AFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    marginBottom: 12,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
