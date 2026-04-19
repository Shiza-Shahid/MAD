import React from "react";
import { View, TextInput, Button } from "react-native";
import { Formik } from "formik";

export default function App() {

return (

<Formik
initialValues={{ name: "" }}
onSubmit={(values) => {
console.log(values);
}}
>

{(props) => (

<View>

<TextInput style={{marginTop: 200}}
placeholder="Enter name"
onChangeText={props.handleChange("name")}
value={props.values.name}
/>

<Button title="Submit" onPress={props.handleSubmit} />

</View>

)}

</Formik>

);
}