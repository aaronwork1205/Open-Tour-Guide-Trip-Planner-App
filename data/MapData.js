import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import firebase from 'firebase/app';

const MyComponent = () => {
    const [tripData, setTripData] = useState({});

    useEffect(() => {
        const fetchTripData = async () => {
            const db = firebase.firestore();
            const tripDocRef = doc(db, 'trips', 'irnvEVnSoejk7TJsSmTk', 'tripItem', 'm4B6yMTkNNBL7auyjbhm');

            try {
                const tripDocSnap = await getDoc(tripDocRef);
                if (tripDocSnap.exists()) {
                    const tripData = tripDocSnap.data();
                    setTripData(tripData);
                } else {
                    console.log('Document does not exist.');
                }
            } catch (error) {
                console.error('Error fetching trip data:', error);
            }
        };

        fetchTripData();
    }, []);

    return (
        <View>
            <Text>Trip Name: {tripData.name}</Text>
            <Text>Description: {tripData.description}</Text>
            {/* Add more fields as needed */}
        </View>
    );
};

export default MyComponent;
