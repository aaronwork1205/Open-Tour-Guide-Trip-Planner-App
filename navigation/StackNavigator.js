import { createStackNavigator } from "@react-navigation/stack";
import EventDetailScreen from "../screens/EventDetailScreen";
import { HomeTabs } from "./TabNavigator";
import { navOptions } from "./OptionNavigator";
import ProfilesScreen from "../screens/profiles/ProfilesScreen";
import ProfileDetailScreen from "../screens/profiles/ProfileDetailScreen";
import Invite from "../screens/InviteScreen";
import CollaboratorDetail from "../screens/CollaboratorDetailScreen";
import TripsScreen from "../screens/TripsScreen";
import { useState } from "react";
import AddTripScreen from "../screens/AddTripScreen";
import AssistantScreen from "../screens/AssistantScreen";

const Stack = createStackNavigator();

export const TripsStack = () => {
  const [tripId, setTripId] = useState();

  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) =>
        navOptions(navigation, route, tripId)
      }
    >
      <Stack.Screen
        name="Trips"
        component={TripsScreen}
        initialParams={{ setTrip: setTripId }}
      />
      {/* hide title / implement diff titles for diff tabs */}
      <Stack.Screen name="Home" component={HomeTabs} options={{ title: "" }} />
      <Stack.Screen name="Event" component={EventDetailScreen} />
      <Stack.Screen name="Invite" component={Invite} />
      <Stack.Screen name="CollaboratorDetail" component={CollaboratorDetail} />
      <Stack.Screen name="AddTrip" component={AddTripScreen} />
      <Stack.Screen name="AssistantScreen" component={AssistantScreen} />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => navOptions(navigation, route)}
    >
      <Stack.Screen name="Profiles" component={ProfilesScreen} />
      <Stack.Screen name="Profile" component={ProfileDetailScreen} />
    </Stack.Navigator>
  );
};
