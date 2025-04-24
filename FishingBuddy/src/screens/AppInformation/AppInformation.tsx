import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LOGIN_SCREENS } from "../../constants/screens";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button/Button";
import Background from "../../components/Background/Background";
import Text from "../../components/Text/Text";
import { colors } from "../../theme/colors";
import { appInfoStyles as styles } from "./appInfoStyles";
import { appInfoFeatures } from "../../data/appInfoData";
import { strings } from "../../common/strings";
export default function AppFeaturesScreen() {
  const navigation = useNavigation<any>();

  return (
    <Background>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text variant="heading2" style={styles.headerTitle}>
              {strings.appInfo.title}
            </Text>
            <Text variant="subtitle" style={styles.headerSubtitle}>
              {strings.appInfo.subtitle}
            </Text>
          </View>

          <View style={styles.cardContainer}>
            <ScrollView
              testID="features-scrollview"
              contentContainerStyle={styles.cardContainer}
              showsVerticalScrollIndicator={false}
            >
              {appInfoFeatures.map((feat) => (
                <View
                  key={feat.title}
                  testID="feature-card"
                  style={styles.card}
                >
                  <View testID="feature-icon" style={styles.iconContainer}>
                    <Ionicons
                      name={feat.icon}
                      size={20}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text variant="title" style={styles.cardTitle}>
                      {feat.title}
                    </Text>
                    <Text variant="body" style={styles.cardDesc}>
                      {feat.description}
                    </Text>
                  </View>
                </View>
              ))}

              <View style={styles.buttonContainer}>
                <Button
                  onPress={() =>
                    navigation.navigate(LOGIN_SCREENS.ProfileSetupUserAccount)
                  }
                  variant="primary"
                  text="Get Started"
                />
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </Background>
  );
}
