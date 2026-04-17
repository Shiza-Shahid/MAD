import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; 
import Input from "../components/Input";
import Button from "../components/Button";
import { useAppContext } from "../context/AppContext";

export default function AuthScreen() {
  const { login, signup, theme } = useAppContext();
  const colors = theme.colors;

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (!email || !password) return alert("Fill all fields");

    if (isSignup) {
      await signup({ email, password, name: "Student" });
    } else {
      const success = await login(email, password);
      if (!success) alert("Invalid credentials");
    }
  };

  return (

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* 🔥 HEADER */}
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>
            {isSignup ? "Join Us" : "Welcome Back"}
          </Text>
          <Text style={styles.headerSubtitle}>
            {isSignup
              ? "Create your account to continue"
              : "Login to your account"}
          </Text>
        </LinearGradient>

        {/* 🔥 CARD */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          {/* ✅ EMAIL INPUT WITH ICON */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={colors.textSecondary}
              style={styles.icon}
            />
            <Input
              placeholder="Email"
              onChangeText={setEmail}
              style={{ flex: 1 }}
            />
          </View>

          {/* ✅ PASSWORD INPUT WITH ICON */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.textSecondary}
              style={styles.icon}
            />
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={setPassword}
              style={{ flex: 1 }}
            />
          </View>

          <Button
            title={isSignup ? "Create Account" : "Login"}
            onPress={handleAuth}
          />

          {/* 🔄 SWITCH */}
          <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
            <Text style={[styles.switch, { color: colors.primary }]}>
              {isSignup
                ? "Already have an account? Login"
                : "Don’t have an account? Signup"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)", // 🔥 darkens background image
  },

  header: {
    height: 220,
    justifyContent: "flex-end",
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#e0e0e0",
    marginTop: 5,
  },

  card: {
    marginHorizontal: 20,
    marginTop: 150,
    padding: 30,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 5,
  },

  /* ✅ INPUT WITH ICON STYLE */
  inputWrapper: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 14,
  paddingHorizontal: 12,
  height: 45,              // 🔥 more height
  marginBottom: 15,
  backgroundColor: "rgba(67, 57, 57, 0.05)", // subtle glass effect
},
  icon: {
    marginRight: 8,
  },

  switch: {
    textAlign: "center",
    marginTop: 15,
    fontWeight: "600",
  },
});