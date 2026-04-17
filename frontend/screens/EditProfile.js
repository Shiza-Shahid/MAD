import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAppContext } from "../context/AppContext";

export default function EditProfile({navigation}) {
  const { user, updateUser, theme } = useAppContext();
  const colors = theme.colors;

  const [name, setName] = useState(user?.name || "");
  const [sap, setSap] = useState(user?.sap || "");
  const [department, setDepartment] = useState(user?.department || "");
  const [semester, setSemester] = useState(user?.semester || "");
  const [gpa, setGpa] = useState(user?.gpa || "");
  const [cgpa, setCgpa] = useState(user?.cgpa || "");
  const [attendance, setAttendance] = useState(user?.attendance || "");
  const [image, setImage] = useState(user?.image || "");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    updateUser({
      ...user,
      name,
      sap,
      department,
      semester,
      gpa,
      cgpa,
      attendance,
      image,
    });

    Alert.alert("Success ✅", "Profile updated successfully");
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* 🔥 HEADER */}
      <LinearGradient
  colors={["#667eea", "#764ba2"]}
  style={styles.header}
>
   {/* 🔙 BACK BUTTON */}
       <TouchableOpacity
         style={styles.backBtn}
         onPress={() => navigation.goBack()}
       >
         <Ionicons name="arrow-back" size={24} color={colors.text} />
       </TouchableOpacity>

  <Text style={styles.headerText}>Edit Profile</Text>
</LinearGradient>

      {/* PROFILE IMAGE */}
      <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
        <Image
          source={{
            uri:
              image ||
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces",
          }}
          style={styles.avatar}
        />

        <View style={styles.cameraIcon}>
          <Ionicons name="camera" size={18} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* FORM CARD */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Personal Information
        </Text>

        <Input value={name} onChangeText={setName} placeholder="Name" icon="person" />
        <Input value={sap} onChangeText={setSap} placeholder="SAP ID" icon="school" />
        <Input value={department} onChangeText={setDepartment} placeholder="Department" icon="book" />
        <Input value={semester} onChangeText={setSemester} placeholder="Semester" icon="calendar" />
      </View>

      {/* ACADEMIC CARD */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Academic Details
        </Text>

        <Input value={gpa} onChangeText={setGpa} placeholder="GPA" icon="stats-chart" />
        <Input value={cgpa} onChangeText={setCgpa} placeholder="CGPA" icon="analytics" />
        <Input value={attendance} onChangeText={setAttendance} placeholder="Attendance %" icon="checkmark-done" />
      </View>

      {/* SAVE BUTTON */}
      <View style={{ marginHorizontal: 20 }}>
        <Button title="Save Profile" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 140,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "flex-end",
    padding: 20,
  },

  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  backBtn: {
  position: "absolute",
  top: 60,
  left: 20,
  zIndex: 10,
},

  imageWrapper: {
    alignSelf: "center",
    marginTop: -50,
    marginBottom: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#fff",
  },

  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#000",
    borderRadius: 15,
    padding: 6,
  },

  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
}); 