import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PLACES_API_KEY } from "../config";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { addPlace } from "../firebase/database";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddPlaceScreen = ({ navigation, route }) => {
  const [placeDate, setPlaceDate] = useState(new Date());
  const [selectedPlace, setSelectedPlace] = useState(null); // New state for selected place

  const onPlaceDateConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || placeDate;
    setPlaceDate(currentDate);
  };

  const handlePlaceSelect = (data, details = null) => {
    // Store the selected place details in state
    const name = data.structured_formatting.main_text;
    const detailedName = data.description;
    const location = details.geometry.location;
    const date = placeDate;
    setSelectedPlace({ name, detailedName, location, date });
  };

  const handleDonePress = async () => {
    if (selectedPlace) {
      await addPlace(selectedPlace, route.params.tripId);
      navigation.navigate("Home", { tripId: route.params.tripId });
    }
  };

  return (
    <>
      <View style={styles.datePickerRow}>
        <Text style={styles.datePickerLabel}>When to visit: </Text>
        <DateTimePicker
          testID="PlaceDateTimePicker"
          value={placeDate}
          mode="date"
          display="default"
          onChange={onPlaceDateConfirm}
        />
      </View>

      <TouchableOpacity onPress={handleDonePress} style={styles.button}>
        <Text style={styles.btnText}>Done</Text>
      </TouchableOpacity>

      <GooglePlacesAutocomplete
        placeholder="Type a place"
        onPress={handlePlaceSelect}
        query={{ key: PLACES_API_KEY }}
        fetchDetails={true}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log("no results")}
        listEmptyComponent={() => (
          <View style={{ flex: 1 }}>
            <Text>No results were found</Text>
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    zIndex: 100,
    position: "absolute",
    right: 145,
    top: 600,
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
  datePickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
    marginRight: 10,
  },
  datePickerLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default AddPlaceScreen;
