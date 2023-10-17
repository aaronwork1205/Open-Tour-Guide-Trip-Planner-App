import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import Invite from "../screens/Invite";

export const navOptions = (navigation, route) => {
  return {
    headerTintColor: "#cbd5e1",
    headerStyle: {
      backgroundColor: "#0f172a",
    },
    headerLeft: () => {
      if (route.name === "Collaborators") {
        return (
          <Ionicons
            name="arrow-back"
            size={32}
            color="white"
            onPress={() => navigation.goBack()}
            style={{ paddingLeft: 15 }}
          />
        );
      } else {
        return (
          <Ionicons
            name="menu"
            size={32}
            color="white"
            onPress={() => navigation.toggleDrawer()}
            style={{ paddingLeft: 15 }}
          ></Ionicons>
        );
      }
    },
    headerRight: () => {
      if (route.name === "Collaborators") {
        return;
      } else {
        return (
          <MaterialCommunityIcons
            name="account-plus"
            size={32}
            color="white"
            style={{ paddingRight: 15 }}
            onPress={() => navigation.navigate("Collaborators")}
          />
        );
      }
    },
  };
};
