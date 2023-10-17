import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";

const ProfilesScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>profiles screen</Text>
      <Button
        title="some profile"
        onPress={() => navigation.navigate("Profile", { profileId: 1 })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});

export default ProfilesScreen;
