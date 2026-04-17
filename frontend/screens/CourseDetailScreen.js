import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../context/AppContext";

export default function CourseDetailScreen({ route, navigation }) {
  const { theme } = useAppContext();
  const colors = theme.colors;

  const { course } = route.params || {};

  const tasks = [
    { id: 1, title: "Assignment 1", status: "Pending" },
    { id: 2, title: "Quiz 2", status: "Completed" },
    { id: 3, title: "Project Proposal", status: "Pending" },
  ];

  if (!course) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>No Course Found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* 🔙 BACK BUTTON */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      {/* COURSE HEADER */}
      <View
        style={[
          styles.headerCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          {course.name}
        </Text>

        <Text style={[styles.info, { color: colors.textSecondary }]}>
          👨‍🏫 {course.instructor}
        </Text>
        <Text style={[styles.info, { color: colors.textSecondary }]}>
          ⏰ {course.time}
        </Text>
        <Text style={[styles.info, { color: colors.textSecondary }]}>
          📘 {course.credits} Credits
        </Text>
        <Text style={[styles.info, { color: colors.primary }]}>
          📊 {course.progress}% Completed
        </Text>
      </View>

      {/* TASKS */}
      <Text style={[styles.section, { color: colors.text }]}>Tasks</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.taskCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.taskTitle, { color: colors.text }]}>
              {item.title}
            </Text>

            <Text
              style={[
                styles.status,
                {
                  color:
                    item.status === "Pending"
                      ? "#E53935"
                      : "#4CAF50",
                },
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80, 
  },

  backBtn: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },

  headerCard: {
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    fontSize: 14,
    marginBottom: 4,
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  taskCard: {
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
  },

  taskTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
});