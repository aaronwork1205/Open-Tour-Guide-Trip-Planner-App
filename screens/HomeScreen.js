import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";
import EventList from "../components/events/EventList";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

const HomeScreen = ({ navigation, route }) => {
  return (
    <View styles={styles.screen}>
      <EventList tripId={route.params.tripId} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AddPlace", { tripId: route.params.tripId })
        }
        style={styles.addButton}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("AssistantScreen")}
        style={styles.AIbutton}
      >
        <MaterialCommunityIcons name="robot" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  addButton: {
    zIndex: 100,
    position: "absolute",
    right: 30,
    top: 600,
    backgroundColor: "black",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // This adds a drop shadow on Android
    shadowOpacity: 0.3, // Below lines for iOS shadow
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  AIbutton: {
    zIndex: 100,
    position: "absolute",
    right: 30,
    top: 540,
    backgroundColor: "black",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // This adds a drop shadow on Android
    shadowOpacity: 0.3, // Below lines for iOS shadow
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  buttonText: {
    color: "white",
  },
});

export default HomeScreen;
