import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import AppText, { Text } from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AccessButtonGroup from "../components/AccessButtonGroup"; // Assuming this path

const initialCollaborators = [
  {
    id: 1,
    title: "LB",
    description: "blablabla",
    access: "View",
    image: require("../assets/lb.jpg"),
  },
  {
    id: 2,
    title: "Minion",
    description: "lalalala",
    access: "View",
    image: require("../assets/minion.jpg"),
  },
  {
    id: 3,
    title: "Brandon",
    description: "lalalala",
    access: "Edit",
    image: require("../assets/brandon.jpg"),
  },
];

function Invite({ navigation }) {
  const [collaborators, setCollaborators] = useState(initialCollaborators);
  const [refreshing, setRefreshing] = useState(false);
  const [invitePersonEmail, setInvitePersonEmail] = useState("");
  const [selectedMode, setSelectedMode] = useState("View"); // defaults to "View"

  // const [invitedFriends, setInvitedFriends] = useState(initialFriends);

  const handleDelete = (collaborator) => {
    const newCollaborators = collaborators.filter(
      (c) => c.id !== collaborator.id
    );
    setCollaborators(newCollaborators);
  };

  return (
    <Screen style={{ flex: "auto" }}>
      {/* <AppText style={styles.SepTitle}>Collaborators</AppText> */}
      <FlatList
        style={{ backgroundColor: "tomato" }}
        data={collaborators}
        keyExtractor={(c) => c.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => {
              console.log("Message selected", item);
              navigation.navigate("CollaboratorDetail", { collaborator: item });
            }}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() =>
          setCollaborators([
            {
              id: 2,
              title: "T1",
              description: "D1",
              image: require("../assets/lb.jpg"),
            },
          ])
        }
      />
      <AppText style={styles.SepTitleInvite}>Invite</AppText>

      <View style={{ alignItems: "center", margin: 10 }}>
        <AppTextInput
          icon="account-plus"
          placeholder="Invite by username"
          width="90%" // Adjust width as per your requirement
          alignSelf="center"
          value={invitePersonEmail}
          onChangeText={(text) => setInvitePersonEmail(text)}
        />

        <AccessButtonGroup
          onSelectionChange={(mode) => setSelectedMode(mode)}
        />

        <AppButton
          title="Send"
          color="secondary"
          width="50%"
          alignSelf="center"
          onPress={() => {
            console.log(invitePersonEmail);
            console.log(selectedMode);
            setInvitePersonEmail("");
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  SepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
    marginTop: 10,
    textAlign: "center",
  },
  SepTitleInvite: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
    marginTop: 20,
    textAlign: "center",
  },
});
export default Invite;
