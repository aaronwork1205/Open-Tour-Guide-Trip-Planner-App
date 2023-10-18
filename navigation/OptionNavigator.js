import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import Invite from "../screens/InviteScreen";

export const navOptions = (navigation, route) => {
  return {
    headerTintColor: "#cbd5e1",
    headerStyle: {
      backgroundColor: "#0f172a",
    },
    headerLeft: () => {
      if (route.name === "Home") {
        return (
          <Ionicons
            name="menu"
            size={32}
            color="white"
            onPress={() => navigation.toggleDrawer()}
            style={{ paddingLeft: 15 }}
          ></Ionicons>
        );
      } else {
        return (
          <Ionicons
            name="arrow-back"
            size={32}
            color="white"
            onPress={() => navigation.goBack()}
            style={{ paddingLeft: 15 }}
          />
        );
      }
    },
    headerRight: () => {
      if (route.name === "Home") {
        return (
          <MaterialCommunityIcons
            name="account-plus"
            size={32}
            color="white"
            style={{ paddingRight: 15 }}
            onPress={() => navigation.navigate("Invite")}
          />
        );
      } else {
        return;
      }
    },
  };
};
