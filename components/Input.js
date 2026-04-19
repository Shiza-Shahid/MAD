import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function Input({ placeholder, value, onChangeText, secure }) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secure}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
});