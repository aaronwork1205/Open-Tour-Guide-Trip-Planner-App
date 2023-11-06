import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import Invite from "../screens/InviteScreen";
import MapScreen from "../screens/MapViewScreen";
import CalendarView from "../screens/CalendarViewScreen";

const Tab = createBottomTabNavigator();
export const HomeTabs = ({ navigation, route }) => {
  console.log("Entering Trip: " + route.params.tripId);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarActiveTintColor: "yellow",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeTabs") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "MapView") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "CalendarView") {
            iconName = focused ? "calendar" : "calendar-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={focused ? 35 : size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTabs"
        component={HomeScreen}
        initialParams={{ tripId: route.params.tripId }}
      />
      <Tab.Screen name="MapView" component={MapScreen} />
      <Tab.Screen name="CalendarView" component={CalendarView} />
    </Tab.Navigator>
  );
};
