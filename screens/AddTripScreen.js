import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PLACES_API_KEY } from "../config";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { addPlace } from "../firebase/database";

const AddTripScreen = ({ navigation, route }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Home", { tripId: route.params.tripId })
        }
        style={styles.button}
      >
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
      <GooglePlacesAutocomplete
        placeholder="Type a place"
        onPress={async (data, details = null) => {
          const name = data.structured_formatting.main_text;
          const detailedName = data.description;
          const location = details.geometry.location;
          await addPlace({ name, detailedName, location }, route.params.tripId);
          navigation.navigate("Home", { tripId: route.params.tripId });
        }}
        query={{ key: PLACES_API_KEY }}
        fetchDetails={true}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log("no results")}
        listEmptyComponent={() => {
          return (
            <View style={{ flex: 1 }}>
              <Text>No results were found</Text>
            </View>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    zIndex: 100,
    position: "absolute",
    right: 160,
    top: 650,
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

export default AddTripScreen;
