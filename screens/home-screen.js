import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";
import EventList from "../components/events/event-list";
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View styles={styles.screen}>
      <EventList />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});

export default HomeScreen;
