import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LightTheme, DarkTheme } from "../theme/theme";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const savedUser = await AsyncStorage.getItem("user");
    const savedTheme = await AsyncStorage.getItem("theme");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTheme) setThemeMode(savedTheme);
  };

  const login = async (email, password) => {
    const stored = await AsyncStorage.getItem("registeredUser");
    if (!stored) return false;

    const parsed = JSON.parse(stored);
    if (parsed.email === email && parsed.password === password) {
      setUser(parsed);
      await AsyncStorage.setItem("user", JSON.stringify(parsed));
      return true;
    }
    return false;
  };

  const signup = async (data) => {
    await AsyncStorage.setItem("registeredUser", JSON.stringify(data));
    setUser(data);
    await AsyncStorage.setItem("user", JSON.stringify(data));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  const updateUser = async (updated) => {
    setUser(updated);
    await AsyncStorage.setItem("user", JSON.stringify(updated));
    await AsyncStorage.setItem("registeredUser", JSON.stringify(updated));
  };

  const toggleTheme = async () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  const resetApp = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUser,
        theme: themeMode === "light" ? LightTheme : DarkTheme,
        toggleTheme,
        themeMode,
        resetApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);