import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../services/firebase";
import { LoginStackParamList } from "../../types/NavigationTypes";
import { LOGIN_SCREENS } from "../../constants/screens";

export default function ProfileSetupBasicScreen() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        LoginStackParamList,
        typeof LOGIN_SCREENS.ProfileSetupBasic
      >
    >();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const passwordsMatch = password === confirmPassword;

  const isNextEnabled =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    isEmailValid &&
    isPasswordValid &&
    passwordsMatch &&
    emailAvailable !== false;

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (isEmailValid) {
      fetchSignInMethodsForEmail(auth, email)
        .then((methods) => setEmailAvailable(methods.length === 0))
        .catch(() => setEmailAvailable(null));
    }
  }, [email]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library denied");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;
    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  const validate = () => {
    const newErrors: string[] = [];

    if (!name.trim()) newErrors.push("Name is required.");
    if (!isEmailValid) newErrors.push("Invalid email format.");
    if (emailAvailable === false) newErrors.push("Email already registered.");
    if (!isPasswordValid)
      newErrors.push("Password must be at least 6 characters.");
    if (!passwordsMatch) newErrors.push("Passwords do not match.");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;

    const basicProfile = {
      name,
      email,
      password,
      age: age ? Number(age) : undefined,
      location,
      photo,
    };

    navigation.navigate(LOGIN_SCREENS.ProfileSetupPreferences, {
      basicProfile,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>🛠️ Setup your account</Text>

      <TouchableOpacity onPress={pickImage} style={styles.avatarBox}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <Text style={styles.addPhoto}>+ Add Photo</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Name *"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />

      <TextInput
        placeholder="Email *"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password *"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Confirm Password *"
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Age (optional)"
        style={styles.input}
        onChangeText={setAge}
        value={age}
        keyboardType="numeric"
      />

      {errors.length > 0 && (
        <View style={styles.errorBox}>
          {errors.map((err, idx) => (
            <Text key={idx} style={styles.errorText}>
              ❌ {err}
            </Text>
          ))}
        </View>
      )}

      <Button title="Next ➡️" onPress={handleNext} disabled={!isNextEnabled} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  avatarBox: {
    alignSelf: "center",
    backgroundColor: "#e0e0e0",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addPhoto: {
    fontSize: 14,
    color: "#555",
  },
  errorBox: {
    backgroundColor: "#ffe6e6",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  errorText: {
    color: "#cc0000",
    fontSize: 14,
  },
});
