import React, { useState } from "react";
import { View, Text, Button, Modal } from "react-native";

export default function App() {

const [modalVisible, setModalVisible] = useState(false);

return (
<View style={{ marginTop: 200 }}>

<Button 
title="Open Modal" 
onPress={() => setModalVisible(true)} 
/>

<Modal visible={modalVisible}>

<View style={{marginTop: 200}}>
<Text>This is simple modal</Text>

<Button 
title="Close Modal" 
onPress={() => setModalVisible(false)} 
/>

</View>

</Modal>

</View>
);
}