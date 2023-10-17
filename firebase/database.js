import { FIREBASE_AUTH } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebase";

export const addUser = async (email) => {
  await setDoc(doc(FIRESTORE_DB, "users", email), {
    trips: [],
  });
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
        return {};
      })
    );
  }
};
