import {View, Text, FlatList, RefreshControl, ScrollView} from "react-native";
import { DUMMY_DATA } from "../../data/dummy";
import EventItem from "./EventItem";
import AppText from "../AppText";
import "firebase/firestore";
import {getEvents} from "../../firebase/database";
import {useState} from "react";
import firebase from "firebase/app";



// import * as firebase from 'firebase/app';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {FIREBASE_APP} from "../../firebase/firebase";

import {FIRESTORE_DB} from "../../firebase/firebase";
// import {collection,onSnapshot} from "firebase/firestore";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import {onSnapshot} from "firebase/firestore";



// export function getTrip() {
//     return new Promise((resolve, reject) => {
//         const tripQuery = collection(FIRESTORE_DB, "trips", "irnvEVnSoejk7TJsSmTk", "tripItem");
//
//         const unsubscribe = onSnapshot(tripQuery, (snapshot) => {
//             const trips = [];
//             snapshot.docs.forEach((doc) => {
//                 trips.push({
//                     ...doc.data(),
//                 });
//             });
//             unsubscribe(); // Unsubscribe from the Firestore query to avoid memory leaks
//
//             console.log(trips);
//             resolve(trips); // Resolve the Promise with the 'trips' data
//         }, (error) => {
//             reject(error); // Reject the Promise in case of an error
//         });
//     });
// }




// const trips = await getTrip();
    // Handle 'trips' data here
// console.log(trips);



const EventList = () => {
    // function getTrip(){
    //     let tripItems = []
    //     const tripQuery = collection(
    //         FIRESTORE_DB,
    //         "trips",
    //         "irnvEVnSoejk7TJsSmTk",
    //         "tripItem"
    //     );
    //
    //     const subscriber = onSnapshot(tripQuery, {
    //         next: (snapshot) => {
    //             const trips = [];
    //             snapshot.docs.forEach((doc) => {
    //                 trips.push({
    //                     // email: doc.id,
    //                     ...doc.data(),
    //                 });
    //             });
    //             tripItems = trips;
    //             console.log(tripItems);
    //             // return trips;
    //         },
    //     });
    //     return tripItems;
    // }
    // const data = getTrip();
  const renderItem = ({ item }) => {
    return (
        <View>
            <EventItem
                title={item.title}
                description={item.description}
            />
        </View>
    );
  };
  return (
      <View style={{
          flex: 0,
          backgroundColor: '#f0f0f0',
          padding: 0,
          borderRadius: 0,
          shadowColor: 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          margin: 0,

      }}>


          <FlatList
              style={{
                  flex: 0, // Expand the FlatList to take up the entire available space
                  backgroundColor: '#f0f0f0',
                  padding: 0,
                  borderRadius: 0,
                  shadowColor: 'transparent',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0,
                  shadowRadius: 0,
                  margin: 0,

              }}
              data={DUMMY_DATA}
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
