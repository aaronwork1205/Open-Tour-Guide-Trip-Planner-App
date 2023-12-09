import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FIREBASE_STORAGE } from "./firebase";

export const uploadImage = async (email, imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();

  const storageRef = ref(FIREBASE_STORAGE, `profilePics/${email}`);
  uploadBytes(storageRef, blob).then((snapshot) => {
    console.log("Uploaded Profile Picture");
    console.log(snapshot);
  });

  const url = await getDownloadURL(storageRef);
  return url;
};
