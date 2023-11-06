import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function AccessButtonGroup({ onSelectionChange }) {
  const [selected, setSelected] = useState("Viewer"); // Default to "View"

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, selected === "Admin" && styles.buttonSelected]}
        onPress={() => {
          setSelected("Admin");
          onSelectionChange("Admin");
        }}
      >
        <Text style={styles.text}>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selected === "Collaborator" && styles.buttonSelected,
        ]}
        onPress={() => {
          setSelected("Collaborator");
          onSelectionChange("Collaborator");
        }}
      >
        <Text style={styles.text}>Collaborator</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selected === "Viewer" && styles.buttonSelected]}
        onPress={() => {
          setSelected("Viewer");
          onSelectionChange("Viewer");
        }}
      >
        <Text style={styles.text}>Viewer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
  },
  button: {
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "lightgray",
    marginHorizontal: 5,
  },
  buttonSelected: {
    backgroundColor: "gray",
  },
  text: {
    color: "white",
  },
});
