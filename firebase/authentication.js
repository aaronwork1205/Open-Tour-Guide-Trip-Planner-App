import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase";
import { addUser } from "./database";

export const signUp = (email, password) => {
  createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      addUser(user.email).then((email) => {
        return email;
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      return errorMessage;
    });
};

export const signIn = (email, password) => {
  signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    });
};
