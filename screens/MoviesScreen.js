import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from "react-native";
import Card from "../components/Card";

export default function MoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://reactnative.dev/movies.json")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={styles.loadingText}>Loading cinematic experience...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>🎬 Movies</Text>
        <Text style={styles.headerSubtitle}>
          Explore timeless classics & modern hits
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <Card>
              <View style={styles.card}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.releaseYear}</Text>
                </View>

                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>Movie Title</Text>
              </View>
            </Card>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
  },

  /* Loader */
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  /* Header */
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#127070",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#189a9a",
  },

  /* List */
  listContainer: {
    paddingBottom: 20,
  },

  /* Card */
  cardWrapper: {
    marginBottom: 14,
    borderRadius: 18,

    // shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    // shadow (Android)
    elevation: 3,
  },

  card: {
    padding: 16,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#189a9a",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#178181",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#9CA3AF",
  },
});