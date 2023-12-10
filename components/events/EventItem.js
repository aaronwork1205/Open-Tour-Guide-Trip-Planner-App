import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../../config/colors";

const EventItem = ({ id, title, description }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Event", { eventId: id, title, description })
      }
    >
      <Text>{title}</Text>
      <Text>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#c5c5c5",
    backgroundColor: colors.places,
    borderRadius: 25,
    margin: 10,
    marginVertical: 10,
    padding: 20,
  },
});

export default EventItem;
