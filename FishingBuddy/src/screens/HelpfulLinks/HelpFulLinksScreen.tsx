import React from "react";
import {
  StyleSheet,
  ScrollView,
  Linking,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import BackButton from "../../components/Button/BackButton";
import Background from "../../components/Background/Background";
import Text from "../../components/Text/Text";
import { colors } from "../../theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// HelpfulLinksScreen component renders a screen with various helpful links for the user.
export default function HelpfulLinksScreen() {
  const openLink = (url: string) => Linking.openURL(url);
  // Array of helpful links with titles, icons, and URLs
  const helpFulLinks = [
    {
      title: "Tutorial Videos",
      icon: "video",
      links: [
        {
          url: "https://www.youtube.com/watch?v=5ZFZO7B2304&ab_channel=FishcareVictoriaInc.",
          text: "How to Cast a Line",
          testID: "link-cast-line",
        },
      ],
      testID: "tutorial-videos",
    },
    {
      title: "Regional Info",
      icon: "map-marker",
      links: [
        {
          url: "https://wildlife.ca.gov/Licensing",
          text: "Buy a Fishing License",
          testID: "link-buy-license",
        },
        {
          url: "https://www.fws.gov/law/general-fishing-laws",
          text: "U.S. Fishing Laws & Regulations",
          testID: "link-fishing-laws",
        },
      ],
      testID: "regional-info",
    },
    {
      title: "Gear Resources",
      icon: "fishing",
      links: [
        {
          url: "https://www.basspro.com/",
          text: "Bass Pro Shops",
          testID: "link-bass-pro",
        },
        {
          url: "https://www.cabelas.com/",
          text: "Cabela's",
          testID: "link-cabelas",
        },
      ],
      testID: "gear-resources",
    },
  ];

  return (
    <Background>
      <SafeAreaView style={styles.safeArea}>
        <BackButton />
        <ScrollView contentContainerStyle={styles.container}>
          <Text variant="heading2" style={styles.title}>
            Helpful Links
          </Text>

          {helpFulLinks.map((section, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.sectionHeader} testID={section.testID}>
                <Text variant="menuItemTitle" style={styles.sectionTitle}>
                  {section.title}
                </Text>
              </View>

              {section.links.map((link, linkIndex) => (
                <TouchableOpacity
                  key={linkIndex}
                  onPress={() => openLink(link.url)}
                  style={styles.linkRow}
                  activeOpacity={0.6}
                  testID={link.testID}
                >
                  <Icon name="chevron-right" size={18} color="#2c5282" />
                  <Text variant="link" style={styles.linkText}>
                    {link.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
    gap: 8,
    marginTop: 80,
  },
  title: {
    color: colors.text.primary,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#1a202c",
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "600",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    marginLeft: 4,
  },
  linkText: {
    color: "#2b6cb0",
    fontSize: 15,
    marginLeft: 6,
    textDecorationLine: "underline",
  },
});
