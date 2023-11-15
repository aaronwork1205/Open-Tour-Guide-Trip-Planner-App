import { FIREBASE_AUTH } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "./firebase";


export const addUser = async (email) => {
  await setDoc(doc(FIRESTORE_DB, "users", email), {
    name: "Placeholder Name",
    trips: [],
  });
};

const getUserInfo = async (email) => {
  const docSnap = await getDoc(doc(FIRESTORE_DB, "users", email));
  if (docSnap.exists()) {
    const user = docSnap.data();
    return {
      name: user.name,
      trips: user.trips,
      image: user.image,
    };
  } else {
    throw Error("User does not exist");
  }
};

const getBasicTripInfo = async (tripId) => {
  console.log(tripId);
  // Get destination, startDate, endDate
  const docSnap = await getDoc(doc(FIRESTORE_DB, "trips", tripId));
  if (docSnap.exists()) {
    const trip = docSnap.data();
    console.log(trip);
    return {
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
    };
  } else {
    throw Error("Trip does not exist");
  }
};

export const addCollaborator = async (email, trip, access) => {
  // Add user to trips > collaborators collection
  userInfo = await getUserInfo(email);
  console.log(userInfo);
  await setDoc(doc(FIRESTORE_DB, "trips", trip, "collaborators", email), {
    name: userInfo.name,
    access: access,
    image: userInfo.image,
  });

  // Add trip to user > trips collection
  const tripInfo = await getBasicTripInfo(trip);
  tripInfo.access = access;
  console.log(tripInfo);
  await setDoc(doc(FIRESTORE_DB, "users", email, "trips", trip), tripInfo);
};

export const removeCollaborator = async (email, tripId) => {
  // delete user from trips > collaborators
  await deleteDoc(doc(FIRESTORE_DB, "trips", tripId, "collaborators", email));

  // delete trip from users > trips
  await deleteDoc(doc(FIRESTORE_DB, "users", email, "trips", tripId));
};

export const getTrips = async () => {
  // Get the trips current user has access to
  const email = FIREBASE_AUTH.currentUser.email;
  const tripsSnapshot = await getDocs(
    collection(FIRESTORE_DB, "users", email, "trips")
  );
  const trips = [];
  tripsSnapshot.forEach((doc) => {
    trips.push({
      tripId: doc.id,
      ...doc.data(),
    });
  });
  console.log(trips);
  return trips;
};

export const getEvents = async () => {
  const uid = FIREBASE_AUTH.currentUser.uid;
  const docRef = doc(FIRESTORE_DB, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const tripIds = docSnap.data().trips;
    const trips = await Promise.all(
      tripIds.map(async (trip) => {
        const tripSnap = await getDoc(trip);
        const tripData = tripSnap.data();
        return { tripData };
      })
    );
  }
};

export const addPlace = async (placeDetails, tripId) => {
  await setDoc(
    doc(FIRESTORE_DB, "trips", tripId, "events", placeDetails.name),
    {
      detailedName: placeDetails.detailedName,
      coords: [placeDetails.location.lat, placeDetails.location.lng],
    }
  );
};

export const clearUsers = async () => {
  const keep = [
    "ppyang2002@gmail.com",
    "wenhaowang@gmail.com",
    "joyce@gmail.com",
    "bixingjian19@gmail.com",
  ];
  const remove = [];

  const usersSnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
  usersSnapshot.docs.forEach((doc) => {
    if (!keep.includes(doc.id)) {
      remove.push(doc.id);
    }
  });

  for (const user of remove) {
    await deleteDoc(doc(FIRESTORE_DB, "users", user));
  }
};
// export const setEvent = async (eventData) => {
//   try {
//     // Reference to the Firestore collection where you want to store events
//     const eventsCollection = collection(FIRESTORE_DB, 'trips'); // Replace with your events collection name
//
//     // Add the event data to the Firestore collection
//     const docRef = await setDoc(eventsCollection, eventData);
//
//     console.log('Event added with ID: ', docRef.id);
//     return docRef.id; // Return the ID of the added event
//   } catch (error) {
//     console.error('Error adding event:', error);
//     return null; // Return null to indicate an error occurred
//   }
// };

//
// export const getTrips = async () => {
//   const uid = FIREBASE_AUTH.currentUser.uid;
//   const docRef = doc(FIRESTORE_DB, "trips", uid);
//   const docSnap = await getDoc(docRef);
//
//
//
//
//
// }
