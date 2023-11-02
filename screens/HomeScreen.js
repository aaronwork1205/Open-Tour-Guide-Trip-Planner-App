import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";
import EventList from "../components/events/EventList";
const HomeScreen = ({ navigation, route }) => {
  return (
    <View styles={styles.screen}>
      <EventList tripId={route.params.tripId} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});

export default HomeScreen;
