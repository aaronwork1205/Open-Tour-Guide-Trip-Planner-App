import { createStackNavigator } from "@react-navigation/stack";
import EventDetailScreen from "../screens/event-detail-screen";
import { HomeTabs } from "./tabs";
import { navOptions } from "./options";
import { useNavigation } from "@react-navigation/native";
import ProfilesScreen from "../screens/profiles/profiles-screen";
import ProfileDetailScreen from "../screens/profiles/profile-detail-screen";

const Stack = createStackNavigator();
export const HomeStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Event" component={EventDetailScreen} />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      <Stack.Screen name="Profiles" component={ProfilesScreen} />
      <Stack.Screen name="Profile" component={ProfileDetailScreen} />
    </Stack.Navigator>
  );
};
