import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "../context/AppContext";

import AuthScreen from "../screens/AuthScreen";
import TabNavigator from "./TabNavigator";
import EditProfile from "../screens/EditProfile";
import CourseDetailScreen from "../screens/CourseDetailScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useAppContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="CourseDetail" component={CourseDetailScreen}/>
        </>
      )}
    </Stack.Navigator>
  );
}