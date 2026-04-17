import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../context/AppContext";

export default function SettingsScreen({ navigation }) {
  const { theme, toggleTheme, logout, themeMode } = useAppContext();

  
  const isDark = themeMode === "dark";

  // ✅ AUTO COLORS (NO MORE INVISIBLE TEXT)
  const textColor = isDark ? "#ffffff" : "#000000";
  const secondaryText = isDark ? "#cccccc" : "#666666";
  const borderColor = isDark ? "#444444" : "#dddddd";

  // Logout
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  // Reset
  const handleReset = () => {
    Alert.alert("Reset App", "This will delete all data.", [
      { text: "Cancel", style: "cancel" },
      { text: "Reset", style: "destructive", onPress: logout },
    ]);
  };

  // Reusable Row
  const SettingItem = ({ icon, title, onPress, right }) => (
    
    <TouchableOpacity
      style={[styles.item, { borderColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      
      <View style={styles.left}>
        <Ionicons name={icon} size={20} color={textColor} />
        <Text style={[styles.itemText, { color: textColor }]}>
          {title}
        </Text>
      </View>

      <View>
        {right || (
          <Ionicons
            name="chevron-forward"
            size={18}
            color={secondaryText} // ✅ FIXED
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* ACCOUNT */}
      <Text style={[styles.section, { color: secondaryText }]}>
        Account
      </Text>

      <SettingItem
        icon="person-outline"
        title="Edit Profile"
        onPress={() => navigation.navigate("EditProfile")}
      />

      <SettingItem
        icon="lock-closed-outline"
        title="Change Password"
        onPress={() => Alert.alert("Coming Soon")}
      />

      {/* PREFERENCES */}
      <Text style={[styles.section, { color: secondaryText }]}>
        Preferences
      </Text>

      <SettingItem
        icon="moon-outline"
        title="Dark Mode"
        right={
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: "#ccc", true: "#4A90E2" }}
            thumbColor={isDark ? "#ffffff" : "#f4f3f4"}
          />
        }
      />

      <SettingItem
        icon="notifications-outline"
        title="Notifications"
        right={<Switch value={true} />}
      />

      {/* APP */}
      <Text style={[styles.section, { color: secondaryText }]}>
        App
      </Text>

      <SettingItem
        icon="information-circle-outline"
        title="About App"
        onPress={() => Alert.alert("Student Portal App v1.0")}
      />

      <SettingItem
        icon="code-outline"
        title="Version"
        right={<Text style={{ color: secondaryText }}>1.0.0</Text>}
      />

      {/* DANGER */}
      <Text style={[styles.section, { color: "#E53935" }]}>
        Danger Zone
      </Text>

      <TouchableOpacity style={styles.dangerBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.dangerText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dangerBtn} onPress={handleReset}>
        <Ionicons name="refresh-outline" size={20} color="#fff" />
        <Text style={styles.dangerText}>Reset App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  section: {
    fontSize: 14,
    marginTop: 25,
    marginBottom: 10,
    fontWeight: "600",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemText: {
    fontSize: 16,
    marginLeft: 12,
  },

  dangerBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E53935",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 15,
    elevation: 3,
  },

  dangerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});