import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Invite from "../screens/Invite";
import { navOptions } from "./OptionNavigator";
import CollaboratorDetail from "../screens/CollaboratorDetailScreen";
import { useNavigation } from "@react-navigation/core";
// import CollaboratorDetail from "./path-to-your/CollaboratorDetail"; // Create this screen to show the collaborator details

const Stack = createStackNavigator();

function CollaboratorNavigator() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Invite"
      // screenOptions={({ navigation, route }) => navOptions(navigation, route)}
    >
      <Stack.Screen
        name="Invite"
        component={Invite}
        // options={{ headerShown: false }} //TODO: Put headerShown here or in the screen in stack.js
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
