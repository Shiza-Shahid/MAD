import { DefaultTheme, DarkTheme as NavDarkTheme } from "@react-navigation/native";

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    background: "#F5F7FB",
    card: "#FFFFFF",
    text: "#1A1A1A",
    textSecondary: "#6B7280",
    placeholder: "#9CA3AF",   
        border: "#E5E7EB",

    primary: "#4A90E2",
    danger: "#E53935",
  },
};

export const DarkTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,

    background: "#0F172A",
    card: "#4d525b",
    text: "#F9FAFB",
    textSecondary: "#94A3B8",
    placeholder: "#64748B",   // 🔥 ADD THIS
    border: "#334155",

    primary: "#4A90E2",
    danger: "#E53935",
  },
};