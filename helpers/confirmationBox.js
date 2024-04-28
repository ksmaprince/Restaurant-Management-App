import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

const confirmationBox = ({ isVisible, title, message, onConfirm, onCancel }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
          <Text>{message}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Confirm" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default confirmationBox;