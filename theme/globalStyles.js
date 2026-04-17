import { StyleSheet } from "react-native";

export const globalStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },

    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 20,
      textAlign: "center",
    },

    text: {
      color: theme.text,
      marginBottom: 8,
      fontSize: 16,
    },

    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 12,
      borderRadius: 10,
      marginBottom: 15,
      backgroundColor: "#fff",
    },

    button: {
      backgroundColor: theme.primary,
      padding: 15,
      borderRadius: 10,
      marginTop: 10,
      elevation: 3,
    },

    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },
  });