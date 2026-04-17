import React from "react";
import { View, Text } from "react-native";

export default function CourseDetail({ route }) {
  const { course } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text>{course} Details</Text>
    </View>
  );
}