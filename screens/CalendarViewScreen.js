import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Agenda } from "react-native-calendars";
import { FIRESTORE_DB } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function CalendarView() {
  const [items, setItems] = useState({});

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const loadItems = async (day) => {
    const newItems = { ...items }; // Use a new object to avoid mutating the state directly

    const eventsSnap = await getDocs(
      collection(FIRESTORE_DB, "trips", "Berlin", "events")
    );
    const events = [];
    eventsSnap.forEach((doc) => {
      events.push({
        eventID: doc.detailedName,
        ...doc.data(),
      });
    });
    console.log(events);

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!newItems[strTime]) {
          newItems[strTime] = [];
        }
      }

      events.forEach((event) => {
        const dateKey = event.date;

        newItems[dateKey] = [];
      });

      events.forEach((event) => {
        const dateKey = event.date;

        newItems[dateKey].push({
          detailedName: event.detailedName,
          date: event.date,
        });
      });

      setItems(newItems);
    }, 100);
  };

  const renderItem = (item, firstItemInDay) => {
    return (
      <View
        style={{
          marginRight: 20,
          marginTop: 30,
          padding: 20,
          backgroundColor: "white",
          borderRadius: 5,
        }}
      >
        <Text>{item.detailedName}</Text>
      </View>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text></Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={"2023-11-26"}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
