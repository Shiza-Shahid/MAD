import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppContext } from "../context/AppContext";
import { lightTheme, darkTheme } from "../theme/theme";

import HomeScreen from "../screens/HomeScreen";
import Courses from "../screens/CoursesScreen";
import Settings from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme } = useContext(AppContext);
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: currentTheme.background },
        tabBarActiveTintColor: currentTheme.primary,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={Courses} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}