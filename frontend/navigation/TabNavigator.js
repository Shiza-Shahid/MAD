import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppContext } from "../context/AppContext";
import HomeScreen from "../screens/HomeScreen";
import CoursesScreen from "../screens/CoursesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme } = useAppContext();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,

        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },

        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}