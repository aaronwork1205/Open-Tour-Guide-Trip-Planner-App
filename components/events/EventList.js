import { View, Text, FlatList, RefreshControl, ScrollView } from "react-native";
import { DUMMY_DATA } from "../../data/dummy";
import EventItem from "./EventItem";
import AppText from "../AppText";
import "firebase/firestore";
import { getEvents } from "../../firebase/database";
import { useEffect, useState } from "react";
import firebase from "firebase/app";

// import * as firebase from 'firebase/app';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FIREBASE_APP } from "../../firebase/firebase";

import { FIRESTORE_DB } from "../../firebase/firebase";
// import {collection,onSnapshot} from "firebase/firestore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { onSnapshot } from "firebase/firestore";

// const trips = await getTrip();
// Handle 'trips' data here
// console.log(trips);

const EventList = ({ tripId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventsRef = collection(FIRESTORE_DB, "trips", tripId, "events");

    const subscriber = onSnapshot(eventsRef, {
      next: (snapshot) => {
        const events = [];
        snapshot.docs.forEach((doc) => {
          events.push({
            name: doc.id,
            ...doc.data(),
          });
        });
        setEvents(events);
      },
    });

    return () => subscriber();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <EventItem title={item.name} description={item.detailedName} />
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 0,
        backgroundColor: "#f0f0f0",
        padding: 0,
        borderRadius: 0,
        shadowColor: "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        margin: 0,
      }}
    >
      <FlatList
        style={{
          flex: 0, // Expand the FlatList to take up the entire available space
          backgroundColor: "#f0f0f0",
          padding: 0,
          borderRadius: 0,
          shadowColor: "transparent",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          margin: 0,
        }}
        data={events}
        // keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => console.log("refreshing")}
          />
        }
      />
    </View>
  );
};

export default EventList;
