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
});

export default TripsScreen;
