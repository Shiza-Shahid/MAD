import React, { useState } from "react";
import { View, Text, Button, Modal } from "react-native";
import { globalStyles } from "./globalStyles";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={globalStyles.container}>

      <View style={globalStyles.buttonSpacing}>
        <Button
          title="Open Modal"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <Modal visible={modalVisible}>
        <View style={globalStyles.modalView}>

          <Text>This is global styled modal</Text>

          <View style={globalStyles.buttonSpacing}>
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