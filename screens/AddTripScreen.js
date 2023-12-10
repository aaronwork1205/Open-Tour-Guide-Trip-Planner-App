import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import { addTrip } from "../firebase/database";

const AddTripScreen = ({ navigation }) => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onStartDateConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
  };

  const onEndDateConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  };

  return (
    <Screen style={styles.container}>
      <AppTextInput
        icon={"city-variant-outline"}
        alignSelf="center"
        style={styles.input}
        placeholder="Enter destination"
        value={destination}
        onChangeText={setDestination}
      />

      <View style={styles.datePickerRow}>
        <Text style={styles.datePickerLabel}>Start Date:</Text>
        {
          <DateTimePicker
            testID="startDateTimePicker"
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateConfirm}
          />
        }
      </View>

      <View style={styles.datePickerRow}>
        <Text style={styles.datePickerLabel}>End Date:</Text>
        {
          <DateTimePicker
            testID="endDateTimePicker"
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateConfirm}
          />
        }
      </View>

      <AppButton
        title="ADD"
        onPress={() => {
          // Implement the code to add the trip here.
          // const formattedStartDate = startDate.toISOString().split("T")[0];
          // const formattedEndDate = endDate.toISOString().split("T")[0];
          // console.log(formattedStartDate);
          // console.log(formattedEndDate);
          addTrip(destination, startDate, endDate);
          alert("Trip Added!"); // Placeholder alert
          navigation.goBack(); // Navigate back to the previous screen
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  datePickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  datePickerLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default AddTripScreen;
