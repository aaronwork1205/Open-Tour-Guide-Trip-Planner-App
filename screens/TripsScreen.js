import { View, Text, StyleSheet, Button } from "react-native";
import EventList from "../components/events/EventList";
import TripList from "../components/trips/TripList";
const TripsScreen = ({ route, navigation }) => {
  return (
    <View styles={styles.screen}>
      <TripList setTripId={route.params.setTrip} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});

export default TripsScreen;
