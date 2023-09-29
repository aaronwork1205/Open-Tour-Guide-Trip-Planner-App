import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home-screen";
import { QrCodeScreen } from "../screens/qr-code-screen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
export const HomeTabs = () => {
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
          } else if (route.name === "Qrcode") {
            iconName = focused ? "qr-code" : "qr-code-outline";
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
        options={{ title: "Home" }}
        component={HomeScreen}
      />
      <Tab.Screen name="Qrcode" component={QrCodeScreen} />
    </Tab.Navigator>
  );
};
