import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { getCatches } from "../services/storage";
import { CatchEntry } from "../types/types";

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
      <Text style={styles.fish}>{item.fishType}</Text>
      <Text>Size: {item.size}</Text>
      <Text>Date: {new Date(item.timestamp).toLocaleString()}</Text>
      <Text>
        Location: {item.location.lat.toFixed(2)}, {item.location.lon.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📜 Your Catch History</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : catches.length === 0 ? (
        <Text style={styles.empty}>No catches logged yet.</Text>
      ) : (
        <FlatList
          data={catches}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  image: { width: "100%", height: 200, borderRadius: 8, marginBottom: 10 },
  fish: { fontSize: 18, fontWeight: "600", marginBottom: 6 },
  empty: { textAlign: "center", marginTop: 40, fontSize: 16 },
});
