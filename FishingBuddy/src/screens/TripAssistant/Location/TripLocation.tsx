import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import {
  getCurrentLocation,
  getNearbySpots,
  getFavoriteSpotIds,
} from "../../../utils/map/mapUtils";
import { FISHING_SPOTS } from "../../../data/fishingSpots";
import { TripLocationScreenNavigationProp } from "../../../types/navigationTypes";
import TripProgressBar from "../TripProgressBar";
import BackButton from "../../../components/Button/BackButton";
import { colors } from "../../../theme/colors";
import { tripLocationStyles as styles } from "./tripLocationStyles";
import TripLocationOverlay from "./TripLocationOverlay";
import { strings } from "../../../common/strings";

const tripLocationStrings = strings.tripAssistant.location;

export default function TripLocation() {
  const [location, setLocation] = useState<any>(null);
  const [nearbySpots, setNearbySpots] = useState<typeof FISHING_SPOTS>([]);
  const [favoriteSpots, setFavoriteSpots] = useState<string[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<any | null>(null);
  const navigation = useNavigation<TripLocationScreenNavigationProp>();

  useEffect(() => {
    (async () => {
      const loc = await getCurrentLocation();
      if (!loc) {
        Alert.alert("Location Error", "Unable to fetch location.");
        return;
      }

      setLocation(loc);
      setNearbySpots(getNearbySpots(loc));
      setFavoriteSpots(await getFavoriteSpotIds());
    })();
  }, []);

  const getMarkerColor = (spotId: string) => {
    if (selectedSpot?.id === spotId) return colors.spot.selected;
    if (favoriteSpots.includes(spotId)) return colors.spot.favorite;
    return colors.spot.default;
  };

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.spot.default} />
        <Text style={styles.loadingText}>
          {tripLocationStrings.map.loading}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TripProgressBar />
      </View>
      <Text style={styles.heading}>{tripLocationStrings.title}</Text>
      <BackButton />

      <MapView
        style={styles.map}
        showsUserLocation
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title={tripLocationStrings.map.yourLocation}
          pinColor={colors.spot.user}
        />
        {nearbySpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.lat, longitude: spot.lon }}
            title={spot.name}
            pinColor={getMarkerColor(spot.id)}
            onPress={() => setSelectedSpot(spot)}
          />
        ))}
      </MapView>
      <TripLocationOverlay
        location={location}
        selectedSpot={selectedSpot}
        navigation={navigation}
      />
    </View>
  );
}
