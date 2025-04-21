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
