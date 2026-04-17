import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppContext } from "../context/AppContext";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const { user, theme } = useAppContext();
  const colors = theme.colors;

  //  NEW STATE (Announcements)
  const [announcements, setAnnouncements] = React.useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = React.useState(false);

  //  FETCH ANNOUNCEMENTS
  React.useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoadingAnnouncements(true);
    try {
     const res = await fetch("https://dummyjson.com/posts");
const data = await res.json();
setAnnouncements(data.posts.slice(0, 3));
    } catch (err) {
      console.log("Announcement Error:", err);
    }
    setLoadingAnnouncements(false);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Hello, {user?.name} 👋
          </Text>
          <Text style={[styles.sub, { color: colors.textSecondary }]}>
            Welcome back
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.profileWrapper}
        >
          <LinearGradient
            colors={["#4A90E2", "#4A90E2"]}
            style={styles.outerRing}
          >
            <View style={styles.innerRing}>
              <Image
                source={{
                  uri:
                    user?.image ||
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces",
                }}
                style={styles.avatar}
              />
            </View>
          </LinearGradient>

          <View style={styles.editIcon}>
            <Ionicons name="create" size={15} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          {user?.name}
        </Text>

        <Text style={[styles.cardText, { color: colors.text }]}>
          🎓 SAP: {user?.sap || "12345"}
        </Text>
        <Text style={[styles.cardText, { color: colors.text }]}>
          📚 Dept: {user?.department || "CS"}
        </Text>
        <Text style={[styles.cardText, { color: colors.text }]}>
          📅 Semester: {user?.semester || "6"}
        </Text>
        <Text style={[styles.cardText, { color: colors.text }]}>
          📊 GPA: {user?.gpa || "3.5"}
        </Text>
        <Text style={[styles.cardText, { color: colors.text }]}>
          📈 CGPA: {user?.cgpa || "3.75"}
        </Text>
        <Text style={[styles.cardText, { color: colors.text }]}>
          ✅ Attendance: {user?.attendance || "85"}%
        </Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity
        style={[styles.editProfileBtn, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Stats */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Overview
      </Text>

      <View style={styles.stats}>
        {[
          { label: "GPA", value: user?.gpa || "3.5", icon: "school" },
          { label: "CGPA", value: user?.cgpa || "3.75", icon: "analytics" },
          {
            label: "Attendance",
            value: `${user?.attendance || "85"}%`,
            icon: "checkmark-done",
          },
          { label: "Courses", value: "7", icon: "book" },
        ].map((item, index) => (
          <View
            key={index}
            style={[
              styles.statCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons name={item.icon} size={40} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>
              {item.value}
            </Text>
            <Text
              style={[styles.statLabel, { color: colors.textSecondary }]}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Classes */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Upcoming Classes
      </Text>

      <View
        style={[
          styles.cardSmall,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.classTitle, { color: colors.text }]}>
          Artificial Intelligence
        </Text>
        <Text style={[styles.classSub, { color: colors.textSecondary }]}>
          Mon • 10:00 AM
        </Text>
      </View>

      <View
        style={[
          styles.cardSmall,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.classTitle, { color: colors.text }]}>
          Database Systems
        </Text>
        <Text style={[styles.classSub, { color: colors.textSecondary }]}>
          Tue • 12:00 PM
        </Text>
      </View>

      {/* ✅ ANNOUNCEMENTS (DYNAMIC NOW) */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Announcements
      </Text>

      {loadingAnnouncements ? (
        <Text style={{ color: colors.text }}>Loading announcements...</Text>
      ) : (
        announcements.map((item, index) => (
          <View
            key={index}
            style={[
              styles.cardSmall,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={{ color: colors.text }}>
              📢 {item.title}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 22,
    fontWeight: "bold",
  },

  sub: {
    fontSize: 19,
    fontFamily: "PoppinsBlack",
  },

  profileWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  outerRing: {
    padding: 3,
    borderRadius: 50,
    elevation: 6,
  },

  innerRing: {
    backgroundColor: "#fff",
    padding: 3,
    borderRadius: 50,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#3370b5",
    borderRadius: 12,
    padding: 5,
  },

  card: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    elevation: 3,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },

  cardText: {
    color: "#fff",
    marginTop: 8,
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },

  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48%",
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    alignItems: "center",
    borderWidth: 1,
    elevation: 2,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },

  statLabel: {
    color: "#737272",
    fontSize: 12,
  },

  cardSmall: {
    padding: 12,
    borderRadius: 22,
    marginVertical: 5,
    borderWidth: 1,
    elevation: 2,
  },

  classTitle: {
    fontWeight: "bold",
    color: "#fff",
  },

  classSub: {
    color: "#eaf4ff",
  },

  editProfileBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8e9fb1",
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#151414",
  },

  editProfileText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});