import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#189a9a",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});