import { createStackNavigator } from "@react-navigation/stack";
import EventDetailScreen from "../screens/EventDetailScreen";
import { HomeTabs } from "./TabNavigator";
import { navOptions } from "./OptionNavigator";
import { useNavigation } from "@react-navigation/native";
import ProfilesScreen from "../screens/profiles/ProfilesScreen";
import ProfileDetailScreen from "../screens/profiles/ProfileDetailScreen";
import Invite from "../screens/InviteScreen";
import CollaboratorDetail from "../screens/CollaboratorDetailScreen";
import TripsScreen from "../screens/TripsScreen";

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => navOptions(navigation, route)}
    >
      <Stack.Screen name="Trips" component={TripsScreen} />
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Event" component={EventDetailScreen} />
      <Stack.Screen
        name="Invite"
        component={Invite}
        // options={{ headerShown: false }}
      />
      <Stack.Screen name="CollaboratorDetail" component={CollaboratorDetail} />
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

// export const InviteStack = () => {
//   return (
//     <Stack.Navigator
//     // screenOptions={({ navigation, route }) => navOptions(navigation, route)}
//     >
//       <Stack.Screen name="Invite" component={Invite} />
//       <Stack.Screen name="CollaboratorDetail" component={CollaboratorDetail} />
//     </Stack.Navigator>
//   );
// };
