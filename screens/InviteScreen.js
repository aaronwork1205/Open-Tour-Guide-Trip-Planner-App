import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AccessButtonGroup from "../components/AccessButtonGroup"; // Assuming this path
import { FIRESTORE_DB } from "../firebase/firebase";
import { addCollaborator, removeCollaborator } from "../firebase/database";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";

function Invite({ navigation, route }) {
  const [collaborators, setCollaborators] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [invitePersonEmail, setInvitePersonEmail] = useState("");
  const [selectedMode, setSelectedMode] = useState("Viewer"); // defaults to "View"

  const tripId = route.params.tripId;
  const screenHeight = Dimensions.get("window").height;
  const listMaxHeight = screenHeight * 0.6;

  useEffect(() => {
    const collaboratorsRef = collection(
      FIRESTORE_DB,
      "trips",
      tripId,
      "collaborators"
    );

    const subscriber = onSnapshot(collaboratorsRef, {
      next: (snapshot) => {
        const collaborators = [];
        snapshot.docs.forEach((doc) => {
          collaborators.push({
            email: doc.id,
            ...doc.data(),
          });
        });
        setCollaborators(collaborators);
      },
    });

    return () => subscriber();
  }, []);

  // const [invitedFriends, setInvitedFriends] = useState(initialFriends);

  return (
    <Screen style={{ flex: "auto" }}>
      <View style={{ maxHeight: listMaxHeight }}>
        <FlatList
          style={{ backgroundColor: "tomato" }}
          data={collaborators}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subTitle={item.email}
              image={{ uri: item.image }}
              onPress={() => {
                console.log("Message selected", item);
                navigation.navigate("CollaboratorDetail", {
                  collaborator: item,
                });
              }}
              renderRightActions={() => (
                <ListItemDeleteAction
                  onPress={async () =>
                    await removeCollaborator(item.email, tripId)
                  }
                />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
        />
      </View>
      <AppText style={styles.SepTitleInvite}>Add a Collaborator</AppText>

      <View style={{ alignItems: "center", margin: 10 }}>
        <AppTextInput
          icon="account-plus"
          placeholder="Invite by email"
          width="95%" // Adjust width as per your requirement
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
          onPress={async () => {
            setInvitePersonEmail("");
            await addCollaborator(invitePersonEmail, tripId, selectedMode);
            console.log(
              `Added ${invitePersonEmail} (${selectedMode}) to trip ${tripId}`
            );
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
