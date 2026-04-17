import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';
import { lightTheme, darkTheme } from "../theme/theme";
import { globalStyles } from "../theme/globalStyles";

export default function Settings() {
  const { theme, setTheme, setUser } = useContext(AppContext);

  // ✅ Theme setup INSIDE component
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;
  const styles = globalStyles(currentTheme);

  const toggle = async () => {
    const t = theme === 'light' ? 'dark' : 'light';
    setTheme(t);
    await AsyncStorage.setItem('theme', t);
  };

  const logout = () => {
    setUser(null);
    Alert.alert("Logged out");
  };

  const reset = async () => {
    await AsyncStorage.clear();
    setUser(null);
    Alert.alert("All data cleared");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dark Mode</Text>

      <Switch 
        value={theme === 'dark'} 
        onValueChange={toggle} 
      />

      <TouchableOpacity onPress={logout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={reset} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}