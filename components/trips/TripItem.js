import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { clearUsers } from "../../firebase/database";
import colors from "../../config/colors";

const TripItem = ({ tripId, title, startDate, endDate, setTripId }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        setTripId(tripId);
        navigation.navigate("Home", {
          tripId: tripId,
        });
      }}
    >
      <View style={styles.card}>
        <Text style={{ fontSize: 20, paddingBottom: 5 }}>{title}</Text>
        <Text>Start Date: {startDate}</Text>
        <Text>End Date: {endDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#c5c5c5",
    backgroundColor: colors.trips,
    borderRadius: 25,
    margin: 10,
    marginVertical: 10,
    padding: 20,
  },
});

export default TripItem;
