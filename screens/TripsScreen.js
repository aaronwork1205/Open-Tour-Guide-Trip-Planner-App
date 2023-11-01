import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";
import EventList from "../components/events/EventList";
import TripList from "../components/trips/TripList";
const TripsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View styles={styles.screen}>
      <TripList />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});

export default TripsScreen;
