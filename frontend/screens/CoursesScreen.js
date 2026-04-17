import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppContext } from "../context/AppContext";
const courses = [
  {
    name: "Artificial Intelligence",
    instructor: "Dr. Ali",
    time: "Mon 10AM",
    credits: 3,
    progress: 70,
    colors: ["#667eea", "#764ba2"],
  },
  {
    name: "Machine Learning",
    instructor: "Dr. Ahmed",
    time: "Tue 12PM",
    credits: 3,
    progress: 45,
    colors: ["#43cea2", "#185a9d"],
  },
  {
    name: "Database Systems",
    instructor: "Dr. Sara",
    time: "Wed 2PM",
    credits: 3,
    progress: 85,
    colors: ["#f7971e", "#ffd200"],
  },
  {
    name: "Computer Networks",
    instructor: "Dr. Hassan",
    time: "Thu 11AM",
    credits: 3,
    progress: 60,
    colors: ["#36d1dc", "#5b86e5"],
  },
  {
    name: "Software Engineering",
    instructor: "Dr. Fatima",
    time: "Fri 1PM",
    credits: 3,
    progress: 30,
    colors: ["#ff7e5f", "#feb47b"],
  },
  {
    name: "Operating Systems",
    instructor: "Dr. Usman",
    time: "Mon 2PM",
    credits: 3,
    progress: 55,
    colors: ["#7d462a", "#b85c0c"],
  },
  {
    name: "Cyber Security",
    instructor: "Dr. Bilal",
    time: "Thu 3PM",
    credits: 3,
    progress: 80,
    colors: ["#47a0b8", "#021c3b"],
  },
];

export default function CoursesScreen({ navigation }) {
  const { theme } = useAppContext();
  const colors = theme.colors;

  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("ALL");
 
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      


      {/* SEARCH */}
      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons name="search" size={18} color={colors.textSecondary} />
        <TextInput
          placeholder="Search courses..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
          style={{
            marginLeft: 8,
            flex: 1,
            color: colors.text,
          }}
        />
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View
          style={[
            styles.statBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.statValue, { color: colors.text }]}>
            {courses.length}
          </Text>
          <Text style={{ color: colors.textSecondary }}>Courses</Text>
        </View>

        <View
          style={[
            styles.statBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.statValue, { color: colors.text }]}>
            {Math.round(
              courses.reduce((sum, c) => sum + c.progress, 0) /
                courses.length
            )}
            %
          </Text>
          <Text style={{ color: colors.textSecondary }}>Avg Progress</Text>
        </View>
      </View>

      {/* ✅ FILTER (NOW SEPARATE ROW) */}
      <View style={styles.filterRow}>
        {["ALL", "HIGH", "LOW"].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[
              styles.filterBtn,
              {
                backgroundColor:
                  filter === f ? colors.primary : colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                color: filter === f ? "#fff" : colors.text,
                fontWeight: "600",
              }}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* COURSES */}
      {courses
        .filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((c) => {
          if (filter === "HIGH") return c.progress >= 60;
          if (filter === "LOW") return c.progress < 60;
          return true;
        })
        .map((c, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("CourseDetail", { course: c })
            }
          >
            <LinearGradient colors={c.colors} style={styles.card}>
              {/* TOP */}
              <View style={styles.row}>
                <View style={styles.titleRow}>
                  <Ionicons name="book" size={20} color="#fff" />
                  <Text style={styles.title}>{c.name}</Text>
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{c.credits}</Text>
                </View>
              </View>

              {/* INFO */}
              <Text style={styles.text}>
                <Ionicons name="person-outline" size={14} color="#fff" />{" "}
                {c.instructor}
              </Text>

              <Text style={styles.text}>
                <Ionicons name="time-outline" size={14} color="#fff" />{" "}
                {c.time}
              </Text>

              {/* PROGRESS */}
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${c.progress}%` },
                  ]}
                />
              </View>

              {/* BOTTOM */}
              <View style={styles.bottomRow}>
                <Text style={styles.progressText}>
                  {c.progress}% Completed
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#fff"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statBox: {
    width: "48%",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  /* ✅ FILTER */
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    marginBottom: 15,
  },

  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
  },

  card: {
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  text: {
    color: "#fff",
    marginTop: 6,
    fontSize: 13,
  },

  badge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  progressContainer: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 5,
    marginTop: 12,
    overflow: "hidden",
  },

  progressFill: {
    height: 6,
    backgroundColor: "#fff",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },

  progressText: {
    color: "#fff",
    fontSize: 12,
  },
});