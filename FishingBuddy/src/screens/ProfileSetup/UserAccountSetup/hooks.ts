import { useState, useEffect } from "react";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../../services/firebase/firebase";
import * as Location from "expo-location";
import { getReversedAddress } from "../../../utils/location/locationUtils";
import { LocationCoordinates } from "./types";

export const useLocation = () => {
  const [location, setLocation] = useState<LocationCoordinates | null>(null);
  const [locationString, setLocationString] = useState("");
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(status === "granted");
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        const newLocation = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
        setLocation(newLocation);
        const address = await getReversedAddress(
          newLocation.latitude,
          newLocation.longitude
        );
        setLocationString(address);
      }
    })();
  }, []);

  return { location, locationString, hasLocationPermission };
};

export const useEmailValidation = (email: string) => {
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    if (email && /\S+@\S+\.\S+/.test(email)) {
      fetchSignInMethodsForEmail(auth, email)
        .then((methods) => setEmailAvailable(methods.length === 0))
        .catch(() => setEmailAvailable(null));
    }
  }, [email]);

  return emailAvailable;
}; 