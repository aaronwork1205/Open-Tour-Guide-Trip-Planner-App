import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AppText from "../components/AppText";

function CollaboratorDetail({ route }) {
  const { collaborator } = route.params;
  const [access, setAccess] = useState(collaborator.access);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={collaborator.image} style={styles.image} />
      <AppText style={styles.name}>{collaborator.name}</AppText>

      <View style={styles.section}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.content}>{collaborator.email}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.accessTouchable}
        >
          <Text style={styles.label}>Access:</Text>
          <Text style={[styles.content, styles.accessContent]}>{access}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Picker
            selectedValue={access}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              setAccess(itemValue);
              setIsModalVisible(false);
            }}
          >
            <Picker.Item label="View" value="View" />
            <Picker.Item label="Edit" value="Edit" />
          </Picker>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    textAlign: "right",
  },
  accessContent: {
    backgroundColor: "#e8e8e8",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8, // Let's try a bigger value here
    overflow: "hidden", // Ensure content doesn't overflow the boundaries
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: 150,
    borderRadius: 30,
  },
  accessTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});

export default CollaboratorDetail;
