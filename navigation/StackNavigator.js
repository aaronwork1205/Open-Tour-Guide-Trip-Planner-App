import { createStackNavigator } from "@react-navigation/stack";
import EventDetailScreen from "../screens/EventDetailScreen";
import { HomeTabs } from "./TabNavigator";
import { navOptions } from "./OptionNavigator";
import { useNavigation } from "@react-navigation/native";
import ProfilesScreen from "../screens/profiles/ProfilesScreen";
import ProfileDetailScreen from "../screens/profiles/ProfileDetailScreen";
import Invite from "../screens/Invite";
import CollaboratorNavigator from "./CollaboratorNavigator";

const Stack = createStackNavigator();
export const HomeStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => navOptions(navigation, route)}
    >
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Event" component={EventDetailScreen} />
      <Stack.Screen
        name="Collaborators"
        component={CollaboratorNavigator}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => navOptions(navigation, route)}
    >
      <Stack.Screen name="Profiles" component={ProfilesScreen} />
      <Stack.Screen name="Profile" component={ProfileDetailScreen} />
    </Stack.Navigator>
  );
};
