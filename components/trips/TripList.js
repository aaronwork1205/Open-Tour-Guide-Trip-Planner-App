import { View, Text, FlatList, RefreshControl, ScrollView } from "react-native";
import { DUMMY_DATA } from "../../data/dummy";
import "firebase/firestore";
import TripItem from "./TripItem";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { getTrips } from "../../firebase/database";

const TripList = ({ setTripId }) => {
  const [trips, setTrips] = useState([{}]);

  useEffect(() => {
    const email = FIREBASE_AUTH.currentUser.email;
    const tripsRef = collection(FIRESTORE_DB, "users", email, "trips");

    const subscriber = onSnapshot(tripsRef, {
      next: (snapshot) => {
        const trips = [];
        snapshot.docs.forEach((doc) => {
          trips.push({ ...doc.data(), tripId: doc.id });
        });
        setTrips(trips);
      },
    });

    return () => subscriber();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <TripItem
          tripId={item.tripId}
          title={item.destination}
          startDate={item.startDate}
          endDate={item.endDate}
          setTripId={setTripId}
        />
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
        data={trips}
        // keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={async () => {
              const newTrips = await getTrips();
              setTrips(newTrips);
            }}
          />
        }
      />
    </View>
  );
};

export default TripList;
