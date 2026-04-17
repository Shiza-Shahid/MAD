import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Button({ title, onPress, icon, loading, variant = "primary" }) {
  const bgColor =
    variant === "danger" ? "#e74c3c" :
    variant === "secondary" ? "#95a5a6" :
    "#4A90E2";

  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: bgColor }]} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={18} color="#fff" style={{ marginRight: 8 }} />}
          <Text style={styles.text}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 4,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
});