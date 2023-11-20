import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TripList from "../components/trips/TripList";
import AppButton from "../components/AppButton";

const TripsScreen = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View styles={styles.screen}>
        <TripList setTripId={route.params.setTrip} />
      </View>

      <View style={styles.addButtonContainer}>
        <AppButton
          title="+ Add Trip"
          color="secondary"
          width="50%"
          alignSelf="center"
          onPress={() => navigation.navigate("AddTrip")}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("AssistantScreen")}
        style={styles.button}
      >
        <Text style={styles.btnText}>Ask me!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  addButtonContainer: {
    position: "absolute", // Position the button absolutely
    bottom: 50, // At the bottom of the parent View
    left: 0,
    right: 0,
    backgroundColor: "transparent", // Or any other background color
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
