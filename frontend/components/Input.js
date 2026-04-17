import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useAppContext } from "../context/AppContext";

export default function Input(props) {
  const { theme } = useAppContext();
  const colors = theme.colors;

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: colors.card,
          color: colors.text,
          borderColor: colors.border,
        },
      ]}
      placeholderTextColor={colors.textSecondary}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,      // 🔥 cleaner than 4
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
  },
});