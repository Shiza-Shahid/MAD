import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotesScreen from "../screens/NotesScreen";
import MoviesScreen from "../screens/MoviesScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Movies" component={MoviesScreen} />
    </Tab.Navigator>
  );
}