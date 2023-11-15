import {View, Text, StyleSheet, Button, TouchableOpacity} from "react-native";
import EventList from "../components/events/EventList";
import TripList from "../components/trips/TripList";
import { useNavigation } from '@react-navigation/native';
import React from "react";
import AssistantScreen from './AssistantScreen';




const TripsScreen = ({ route, navigation }) => {
  return (
    <View styles={styles.screen}>
      <TripList setTripId={route.params.setTrip} />


      <TouchableOpacity onPress={() =>
          navigation.navigate("AssistantScreen")} style={styles.button}>
        <Text style={styles.btnText}>Ask me!</Text>
      </TouchableOpacity>


    </View>

  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  button: {
    zIndex: 100,
    position: "absolute",
    right: 20,
    top: 700,
    backgroundColor: "black",
    width: 100,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  btnText: {
    color: "white",
  },
});

export default TripsScreen;
