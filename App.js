import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { HomeStack } from "./navigation/stack";
import React from "react";
import "react-native-gesture-handler";
import { MyDrawer } from "./navigation/drawer";
import Invite from "./screens/Invite";

export default function App() {
  return (
    <NavigationContainer>
      {/* <HomeStack /> */}
      <MyDrawer />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// export default function App() {
//   return <Invite />;
// }
