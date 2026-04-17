import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppProvider, useAppContext } from "./frontend/context/AppContext";
import AppNavigator from "./frontend/navigation/AppNavigator";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";

const Main = () => {
  const { theme } = useAppContext();

  return (
    <NavigationContainer theme={theme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  const [loaded] = useFonts({
    PoppinsBlack: require("./assets/Poppins-Black.ttf"), 
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}