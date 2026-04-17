import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedTheme = await AsyncStorage.getItem("theme");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedTheme) setTheme(storedTheme);
      } catch (e) {
        console.log(e);
      }
    };

    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};