import { FIREBASE_AUTH } from "./firebase";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
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
    };
  } else {
    throw Error("User does not exist");
  }
};

export const addCollaborator = async (email, trip, access) => {
  userInfo = await getUserInfo(email);
  await setDoc(doc(FIRESTORE_DB, "trips", trip, "collaborators", email), {
    name: userInfo.name,
  });
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
