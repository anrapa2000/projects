import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { getCatches } from "../../services/storage/storage";
import { CatchEntry } from "../../types/types";
import { colors } from "../../theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BackButton from "../../components/Button/BackButton";
import Background from "../../components/Background/Background";
import Text from "../../components/Text/Text";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../constants/screens";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../types/navigationTypes";
import { catchHistoryStyles as styles } from "./catchHistoryStyles";

type CatchHistoryScreenNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

export default function CatchHistoryScreen() {
  const navigation = useNavigation<CatchHistoryScreenNavigationProp>();
  const [catches, setCatches] = useState<CatchEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCatches = async () => {
      const storedCatches = await getCatches();
      setCatches(storedCatches.reverse());
      setLoading(false);
    };

    loadCatches();
  }, []);

  const handleBackPress = () => {
    navigation.navigate(SCREENS.HamburgerMenu);
  };

  const renderItem = ({ item }: { item: CatchEntry }) => (
    <View style={styles.card}>
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          testID="catch-image"
        />
      )}
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          {item.fishType && (
            <Text variant="menuItemTitle" style={styles.fishType}>
              {item.fishType}
            </Text>
          )}
        </View>

        <View style={styles.infoContainer}>
          {item.size && (
            <View style={styles.infoRow}>
              <Icon name="ruler" size={20} color={colors.text.secondary} />
              <Text variant="body" style={styles.infoText}>
                Size: {item.size}
              </Text>
            </View>
          )}

          {item.timestamp && (
            <View style={styles.infoRow}>
              <Icon name="clock" size={20} color={colors.text.secondary} />
              <Text variant="body" style={styles.infoText}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Icon name="map-marker" size={20} color={colors.text.secondary} />
            <Text variant="body" style={styles.infoText}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <Background>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <BackButton onPress={handleBackPress} />
          <Text variant="heading2" style={styles.title}>
            Your Catch History
          </Text>
        </View>

        <View style={styles.content}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="large"
                color={colors.primary}
                testID="activity-indicator"
              />
              <Text variant="body" style={styles.loadingText}>
                Loading your catches...
              </Text>
            </View>
          ) : catches.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon
                name="fish-off"
                size={48}
                color={colors.text.secondary}
                testID="fish-off-icon"
              />
              <Text variant="heading" style={styles.emptyText}>
                No catches logged yet
              </Text>
              <Text variant="body" style={styles.emptySubtext}>
                Time to cast your line!
              </Text>
            </View>
          ) : (
            <FlatList
              data={catches}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              testID="catches-list"
            />
          )}
        </View>
      </SafeAreaView>
    </Background>
  );
}
