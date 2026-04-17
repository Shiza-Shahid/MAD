import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppContext } from "../context/AppContext";

export default function Card({ children }) {
  const { theme } = useAppContext();
  const colors = theme.colors;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 16,
    marginVertical: 10,

    elevation: 4,        // Android shadow
    borderWidth: 1,      // 🔥 THIS FIXES MERGING
  },
});