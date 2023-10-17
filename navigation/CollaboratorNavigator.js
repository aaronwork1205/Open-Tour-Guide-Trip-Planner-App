import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Invite from "../screens/Invite";
import CollaboratorDetail from "../screens/CollaboratorDetailScreen";
// import CollaboratorDetail from "./path-to-your/CollaboratorDetail"; // Create this screen to show the collaborator details

const Stack = createStackNavigator();

function CollaboratorNavigator() {
  return (
    <Stack.Navigator initialRouteName="Invite">
      <Stack.Screen
        name="Invite"
        component={Invite}
        options={{ headerShown: false }} //TODO: Put headerShown here or in the screen in stack.js
      />
      <Stack.Screen
        name="CollaboratorDetail"
        component={CollaboratorDetail}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default CollaboratorNavigator;
