import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";

import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import { db, auth } from "../services/firebaseConfig";

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export default function NotesScreen({ navigation }) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  // 🔥 HEADER (UNCHANGED)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Notes",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
          <Ionicons name="log-out-outline" size={24} color="#189a9a" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // 📡 FIXED: FETCH ONLY CURRENT USER NOTES
  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return;

    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid) // 🔥 MAIN FIX
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ➕ ADD / UPDATE NOTE (FIXED WITH UID)
  const handleSave = async () => {
    const user = auth.currentUser;

    if (!note.trim() || !user) return;

    if (editingId) {
      await updateDoc(doc(db, "notes", editingId), {
        text: note,
      });

      setEditingId(null);
    } else {
      await addDoc(collection(db, "notes"), {
        text: note,
        createdAt: new Date(),
        uid: user.uid, // 🔥 MAIN FIX
      });
    }

    setNote("");
    Keyboard.dismiss();
  };

  // ✏️ EDIT
  const startEdit = (item) => {
    setNote(item.text);
    setEditingId(item.id);
  };

  // ❌ CANCEL
  const cancelEdit = () => {
    setNote("");
    setEditingId(null);
  };

  // 🗑️ DELETE
  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  // 🔐 LOGOUT
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Auth");
  };

  return (
    <View style={styles.container}>
      {/* UI UNCHANGED */}
      <View style={styles.inputContainer}>
        <Text style={styles.header}>
          {editingId ? "Edit Note ✏️" : "Add New Note 📝"}
        </Text>

        <Input
          placeholder="Write something..."
          value={note}
          onChangeText={setNote}
        />

        <Button
          title={editingId ? "Update Note" : "Add Note"}
          onPress={handleSave}
        />

        {editingId && (
          <TouchableOpacity onPress={cancelEdit}>
            <Text style={styles.cancelText}>Cancel Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* CONTENT UNCHANGED */}
      {loading ? (
        <ActivityIndicator size="large" color="#189a9a" />
      ) : notes.length === 0 ? (
        <Text style={styles.emptyText}>No notes yet 📝</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card>
              <View style={styles.cardContent}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.noteText}>{item.text}</Text>

                  <Text style={styles.timeText}>
                    {item.createdAt?.toDate?.().toLocaleString() || ""}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => startEdit(item)}
                  style={styles.editBtn}
                >
                  <Ionicons name="create-outline" size={18} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleteNote(item.id)}
                  style={styles.deleteBtn}
                >
                  <Ionicons name="trash-outline" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </Card>
          )}
        />
      )}
    </View>
  );
}

/* ❗ STYLES UNCHANGED (YOUR UI PRESERVED) */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0c6363",
  },

  inputContainer: {
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 20,
    elevation: 5,
  },

  cancelText: {
    textAlign: "center",
    marginTop: 10,
    color: "#FF4D4D",
    fontWeight: "600",
  },

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  noteText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#178181",
  },

  timeText: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },

  editBtn: {
    backgroundColor: "#189a9a",
    padding: 8,
    borderRadius: 10,
    marginLeft: 10,
  },

  deleteBtn: {
    backgroundColor: "#FF4D4D",
    padding: 8,
    borderRadius: 10,
    marginLeft: 10,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 60,
    color: "#999",
    fontSize: 16,
  },
});