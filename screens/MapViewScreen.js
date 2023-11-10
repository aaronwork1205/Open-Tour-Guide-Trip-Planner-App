import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Linking } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import {mapData} from "../data/MapData";
import AppText from "../components/AppText";
import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase";
import fetchLocationDataFromFirebase from "../data/MapData";

const navigateToLocation = (latitude, longitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  Linking.openURL(url).catch((err) =>
    console.error("Error opening Google Maps:", err)
  );
};

const MapScreen = () => {
  const initialRegion = { 123: 123 };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={initialRegion[0]}
      >
        <Marker
          coordinate={{
            latitude: 22,
            longitude: 32,
          }}
          title="Marker Title"
          description="Marker Description"
        />

        <TouchableOpacity
          onPress={() => navigateToLocation(22, 32)}
          style={{
            flex: 1,
            position: "absolute",
            top: 20,
            right: 20,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 50,
          }}
        >
          <AppText>Get directions</AppText>
        </TouchableOpacity>
      </MapView>
    </View>
  );
};

export default MapScreen;
