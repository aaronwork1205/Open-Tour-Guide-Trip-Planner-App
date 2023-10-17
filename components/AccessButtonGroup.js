import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function AccessButtonGroup({ onSelectionChange }) {
  const [selected, setSelected] = useState("View"); // Default to "View"

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, selected === "View" && styles.buttonSelected]}
        onPress={() => {
          setSelected("View");
          onSelectionChange("View");
        }}
      >
        <Text style={styles.text}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selected === "Edit" && styles.buttonSelected]}
        onPress={() => {
          setSelected("Edit");
          onSelectionChange("Edit");
        }}
      >
        <Text style={styles.text}>Edit</Text>
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
