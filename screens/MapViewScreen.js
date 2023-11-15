import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Text,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import {mapData} from "../data/MapData";
import AppText from "../components/AppText";
import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase";
import { AntDesign } from "@expo/vector-icons";
// import fetchLocationDataFromFirebase from "../data/MapData";

const navigateToLocation = (latitude, longitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  Linking.openURL(url).catch((err) =>
    console.error("Error opening Google Maps:", err)
  );
};

const MapScreen = ({ route, navigation }) => {
  const [currName, setCurrName] = useState("");
  const [coords, setCoords] = useState([]);
  const [currEvent, setCurrEvent] = useState(null);
  const initialRegion = { 123: 123 };
  const defaultRegionDeltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const mapRef = useRef();

  useEffect(() => {
    const eventsRef = collection(
      FIRESTORE_DB,
      "trips",
      route.params.tripId,
      "events"
    );

    const subscriber = onSnapshot(eventsRef, {
      next: (snapshot) => {
        const coords = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          coords.push({
            coordinates: {
              longitude: data.coords[1],
              latitude: data.coords[0],
            },
            name: doc.id,
          });
        });
        console.log(coords);
        setCoords(coords);
      },
    });

    return () => subscriber();
  }, []);

  const onArrowClick = (dir) => {
    if (currEvent == null) {
      mapRef.current.animateToRegion({
        ...coords[0].coordinates,
        ...defaultRegionDeltas,
      });
      setCurrEvent(0);
      setCurrName(coords[0].name);
      return;
    }
    if (dir === "left") {
      if (currEvent == 0) {
        setCurrEvent(coords.length - 1);
      } else {
        setCurrEvent(currEvent - 1);
      }
    } else {
      if (currEvent == coords.length - 1) {
        setCurrEvent(0);
      } else {
        setCurrEvent(currEvent + 1);
      }
    }
    console.log(currEvent);

    mapRef.current.animateToRegion({
      ...coords[currEvent].coordinates,
      ...defaultRegionDeltas,
    });

    setCurrName(coords[currEvent].name);
    console.log(coords[currEvent]);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={() => onArrowClick("left")}
          style={styles.arrowButton}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>{currName}</Text>
        <TouchableOpacity
          onPress={() => onArrowClick("right")}
          style={styles.arrowButton}
        >
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={initialRegion[0]}
      >
        {coords.map((item, index) => (
          <Marker
            key={index}
            id={index.toString}
            title={item.name}
            coordinate={item.coordinates}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-end", // Aligns child to the bottom
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    flex: 1,
    textAlign: "center",
  },
  arrowButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  arrowText: {
    // You can adjust font size as needed
    fontSize: 24,
  },
});
export default MapScreen;
