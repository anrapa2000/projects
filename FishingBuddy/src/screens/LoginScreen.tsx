import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail
  } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    try {
      // Check if the user exists
      const methods = await fetchSignInMethodsForEmail(auth, email);
  
      if (methods.length === 0) {
        // User does not exist → Create one
        console.log("Creating new user...");
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("✅ User created and signed in");
      } else {
        // User exists → Sign in
        console.log("Signing in existing user...");
        await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ User signed in");
      }
    } catch (error: any) {
      console.error("❌ Auth error:", error.code, error.message);
  
      if (error.code === 'auth/wrong-password') {
        alert("Incorrect password.");
      } else if (error.code === 'auth/email-already-in-use') {
        alert("Email already in use. Try logging in instead.");
      } else {
        alert(error.message);
      }
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CatchLog 🎣</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login / Sign Up" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 24 },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});
