import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const TripItem = ({ tripId, title, startDate, endDate, setTripId }) => {
  const navigation = useNavigation();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setTripId(tripId);
        navigation.navigate("Home", {
          tripId,
        });
      }}
    >
      <Text style={{ fontSize: 20, paddingBottom: 5 }}>{title}</Text>
      <Text>{start.toDateString()}</Text>
      <Text>{end.toDateString()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#c5c5c5",
    borderRadius: 10,
    marginVertical: 5,
    padding: 30,
  },
});

export default TripItem;
