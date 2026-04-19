import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Input from "../components/Input";
import Button from "../components/Button";

import { auth } from "../services/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSignup = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please fill all fields");
    }

    if (!isValidEmail(email)) {
      return Alert.alert("Error", "Enter a valid email");
    }

    if (password.length < 6) {
      return Alert.alert("Error", "Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert("Success", "Account created 🎉");
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }

    setLoading(false);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please fill all fields");
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace("Main");
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* 🔥 PREMIUM HEADER */}
      <View style={styles.header}>
        <Text style={styles.appName}>NoteFlix</Text>

        <View style={styles.tagRow}>
          <Ionicons name="document-text-outline" size={14} color="#EAF2FF" />
          <Text style={styles.tagText}> Notes</Text>

          <Text style={{ color: "#EAF2FF" }}> • </Text>

          <Ionicons name="film-outline" size={14} color="#EAF2FF" />
          <Text style={styles.tagText}> Movies</Text>
        </View>

        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>
          Save your ideas & explore movies in one place
        </Text>
      </View>

      {/* 🧊 CARD */}
      <View style={styles.card}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
        />

        {/* PASSWORD */}
        <View style={styles.passwordContainer}>
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secure={secure}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setSecure(!secure)}
          >
            <Ionicons
              name={secure ? "eye-off" : "eye"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* BUTTONS */}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Button title="Login" onPress={handleLogin} />
            <Button title="Signup" onPress={handleSignup} />
          </>
        )}
      </View>

      {/* FOOTER */}
      <Text style={styles.footerText}>
        Secure login powered by Firebase 🔐
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    padding: 20,
  },

  header: {
    backgroundColor: "#189a9a",
    padding: 25,
    borderRadius: 25,
    marginBottom: 25,
  },

  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },

  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },

  tagText: {
    color: "#EAF2FF",
    fontSize: 13,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 14,
    color: "#EAF2FF",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  passwordContainer: {
    position: "relative",
  },

  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 18,
  },

  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontSize: 12,
  },
});