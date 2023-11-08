import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { HomeStack } from "./navigation/StackNavigator";
import React, { useState } from "react";
import "react-native-gesture-handler";
import { MyDrawer } from "./navigation/DrawerNavigator";
import Invite from "./screens/InviteScreen";
import { signIn, signUp } from "./firebase/authentication";
import { getEvents } from "./firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase/firebase";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  onAuthStateChanged(FIREBASE_AUTH, (user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  return signedIn ? (
    <NavigationContainer>
      {/* <HomeStack /> */}
      <MyDrawer />
      <StatusBar style="light" />
    </NavigationContainer>
  ) : (
    <LoginScreen />
  );
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       {/* <HomeStack /> */}
//       <MyDrawer />
//       <StatusBar style="light" />
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default function App() {
//   return <Invite />;
// }
