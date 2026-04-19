import React from 'react';
import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";

export default function App() {

const [modalVisible, setModalVisible] = useState(false);

return (
<View style={styles.container}>

<View style={{ marginTop: 200 }}>
<Button 
title="Open Modal" 
onPress={() => setModalVisible(true)} 
/>
</View>

<Modal visible={modalVisible}>

<View style={styles.modalView}>

<Text>This is global styled modal</Text>

<View style={{ marginTop: 200 }}>
<Button 
title="Close" 
onPress={() => setModalVisible(false)} 
/>
</View>

</View>

</Modal>

</View>
);
}

const styles = StyleSheet.create({
container: {
flex:1,
alignItems:"center"
},
modalView: {
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:"lightblue"
}
});