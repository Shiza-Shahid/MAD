import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { lightTheme, darkTheme } from "../theme/theme";
import { globalStyles } from "../theme/globalStyles";

const { theme } = useContext(AppContext);
const currentTheme = theme === "dark" ? darkTheme : lightTheme;
const styles = globalStyles(currentTheme);  
<View style={styles.container}></View>

export default function Courses({ navigation }) {
  const courses = [
    { id: 1, name: "MAD" },
    { id: 2, name: "AI" },
    { id: 3, name: "DBMS" },
  ];

  return (
    <View style={{ padding: 20 }}>
      {courses.map((c) => (
        <TouchableOpacity
          key={c.id}
          onPress={() => navigation.navigate("CourseDetail", { course: c })}
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 10,
            marginBottom: 15,
            elevation: 3,
          }}
        >
          <Text>{c.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}