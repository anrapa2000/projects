import * as Location from "expo-location";

export const getReversedAddress = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const reversedAddress = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reversedAddress && reversedAddress.length > 0) {
      const address = reversedAddress[0];
      const parts = [];
      if (address.street) parts.push(address.street);
      if (address.city) parts.push(address.city);
      if (address.region) parts.push(address.region);
      if (address.country) parts.push(address.country);
      return parts.join(", ");
    }
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  } catch (error) {
    console.error("Error getting reversed address:", error);
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  }
};

export const getDistanceInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const toRad = (val: number) => (val * Math.PI) / 180;

  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
