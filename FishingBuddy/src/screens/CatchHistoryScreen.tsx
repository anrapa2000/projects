import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { getCatches } from "../services/storage";
import { CatchEntry } from "../types/types";
import { colors } from "../theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BackButton from "../components/Button/BackButton";
import Background from "../components/Background";
import Text from "../components/Text/Text";

export default function CatchHistoryScreen() {
  const [catches, setCatches] = useState<CatchEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCatches = async () => {
      const storedCatches = await getCatches();
      setCatches(storedCatches.reverse()); // Show latest first
      setLoading(false);
    };

    loadCatches();
  }, []);

  const renderItem = ({ item }: { item: CatchEntry }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Icon name="fish" size={24} color={colors.primary} />
          <Text variant="menuItemTitle" style={styles.fishType}>
            {item.fishType}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="ruler" size={20} color={colors.text.secondary} />
            <Text variant="body" style={styles.infoText}>
              Size: {item.size}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="clock" size={20} color={colors.text.secondary} />
            <Text variant="body" style={styles.infoText}>
              {new Date(item.timestamp).toLocaleString()}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="map-marker" size={20} color={colors.text.secondary} />
            <Text variant="body" style={styles.infoText}>
              {item.location.lat.toFixed(2)}, {item.location.lon.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <Background>
      <SafeAreaView style={styles.safeArea}>
        <BackButton />
        <View style={styles.container}>
          <Text variant="heading2" style={styles.title}>
            Your Catch History
          </Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text variant="body" style={styles.loadingText}>
                Loading your catches...
              </Text>
            </View>
          ) : catches.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="fish-off" size={48} color={colors.text.secondary} />
              <Text variant="heading" style={styles.emptyText}>
                No catches logged yet
              </Text>
              <Text variant="body" style={styles.emptySubtext}>
                Time to cast your line! 🎣
              </Text>
            </View>
          ) : (
            <FlatList
              data={catches}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: colors.text.primary,
    marginBottom: 24,
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    color: colors.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  emptyText: {
    color: colors.text.primary,
  },
  emptySubtext: {
    color: colors.text.secondary,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  fishType: {
    color: "#1a202c",
    marginLeft: 8,
  },
  infoContainer: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    color: colors.text.secondary,
  },
});
