import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../context/AppContext";
import { globalStyles } from "../theme/globalStyles";
import { lightTheme, darkTheme } from "../theme/theme";

export default function AuthScreen() {
  const { setUser, theme } = useContext(AppContext);
  const styles = globalStyles(theme === "light" ? lightTheme : darkTheme);

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (isSignup) {
      const newUser = {
        name: "Shiza",
        sap: "12345",
        semester: "1",
        gpa: "3.0",
        cgpa: "3.5",
        email,
        password,
      };

      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      Alert.alert("Success", "Account Created");
    } else {
      const stored = await AsyncStorage.getItem("user");
      if (!stored) return Alert.alert("Error", "Signup first");

      const user = JSON.parse(stored);

      if (user.email === email && user.password === password) {
        setUser(user);
        Alert.alert("Success", "Login Successful");
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    }
  };

  return (
    <ImageBackground source={require("../assets/img.jpg")} style={{ flex: 1 }}>
      <View style={[styles.container, { justifyContent: "center" }]}>
        
        {/* Card */}
        <View style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 15,
          elevation: 5
        }}>

          <Text style={styles.title}>{isSignup ? "Signup" : "Login"}</Text>

          <Text style={styles.text}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.text}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>
              {isSignup ? "Signup" : "Login"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
            <Text style={styles.text}>
              {isSignup ? "Login instead" : "Create account"}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}