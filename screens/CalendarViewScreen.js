import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
import { FIRESTORE_DB } from "../firebase/firebase";
import { collection, onSnapshot, getDoc, doc } from "firebase/firestore";

export default function CalendarView({ route, navigation }) {
  const [items, setItems] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(FIRESTORE_DB, "trips", route.params.tripId, "events"),
      async (snapshot) => {
        let newItems = { ...items };
        let dates = [];

        // get dates:
        const DateRef = await getDoc(doc(FIRESTORE_DB, "trips", "Berlin"));
        sDate = DateRef.data().startDate;
        setStartDate(sDate);
        eDate = DateRef.data().endDate;
        setEndDate(eDate);
        console.log(startDate);
        console.log(endDate);
        // Collecting all dates from the snapshot
        snapshot.forEach((doc) => {
          const event = { eventID: doc.detailedName, ...doc.data() };
          dates.push(new Date(event.date));
        });

        if (dates.length > 0) {
          // Finding the smallest date or a random date from the dataset
          // For smallest date: const baseDate = new Date(Math.min(...dates));
          // For random date:
          const baseDate = dates[0];
          console.log(timeToString(baseDate));
          // Pre-populate around the base date
          for (let i = -30; i < 30; i++) {
            const time = baseDate.getTime() + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            newItems[strTime] = [];
          }

          // Adding events to their respective dates
          snapshot.forEach((doc) => {
            const event = { eventID: doc.detailedName, ...doc.data() };
            const dateKey = event.date;

            newItems[dateKey].push({
              detailedName: event.detailedName,
              date: event.date,
            });
          });
        }

        setItems(newItems);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, []);

  const renderItem = (item, firstItemInDay) => {
    return (
      <View style={styles.item}>
        <Text>{item.detailedName}</Text>
      </View>
    );
  };

  const renderEmptyDate = () => {
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
        selected={startDate}
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
    marginTop: 30,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
