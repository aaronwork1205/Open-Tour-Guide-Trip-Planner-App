import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AccessButtonGroup from "../components/AccessButtonGroup"; // Assuming this path
import { FIRESTORE_DB } from "../firebase/firebase";
import { addCollaborator } from "../firebase/database";
import { collection, onSnapshot, getDocs } from "firebase/firestore";

// const initialCollaborators = [
//   {
//     name: "LB",
//     email: "bixingjian19@gmail.com",
//     access: "View",
//     image: require("../assets/lb.jpg"),
//   },
//   {
//     name: "Minion",
//     email: "minion@gmail.com",
//     access: "View",
//     image: require("../assets/minion.jpg"),
//   },
//   {
//     name: "Brandon",
//     email: "brandon@gmail.com",
//     access: "Edit",
//     image: require("../assets/brandon.jpg"),
//   },
// ];

function Invite({ navigation }) {
  const [collaborators, setCollaborators] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [invitePersonEmail, setInvitePersonEmail] = useState("");
  const [selectedMode, setSelectedMode] = useState("View"); // defaults to "View"

  useEffect(() => {
    const collaboratorsRef = collection(
      FIRESTORE_DB,
      "trips",
      "slWluB5kkySIVOyIfc1r",
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
        console.log(collaborators);
      },
    });

    return () => subscriber();
  }, []);

  useEffect(() => {
    const collaboratorsRef = collection(
      FIRESTORE_DB,
      "trips",
      "slWluB5kkySIVOyIfc1r",
      "collaborators"
    );

    // Establishing real-time listener to Firestore changes
    const unsubscribe = onSnapshot(collaboratorsRef, (snapshot) => {
      const fetchedCollaborators = [];
      snapshot.docs.forEach((doc) => {
        fetchedCollaborators.push({
          email: doc.id,
          ...doc.data(),
        });
      });
      setCollaborators(fetchedCollaborators); // Update state with fetched collaborators
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  const handleDelete = (collaborator) => {
    const newCollaborators = collaborators.filter(
      (c) => c.email !== collaborator.email
    );
    setCollaborators(newCollaborators);
  };

  // const getData = async () => {
  //   console.log("getting data");

  //   // Getting the collaborators collection inside the specific trip
  //   const collabCollection = collection(
  //     FIRESTORE_DB,
  //     "trips",
  //     "slWluB5kkySIVOyIfc1r",
  //     "collaborators"
  //   );
  //   const querySnapshot = await getDocs(collabCollection);
  //   if (!querySnapshot.empty) {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   } else {
  //     console.log("No collaborators found");
  //   }
  // };

  return (
    <Screen style={{ flex: "auto" }}>
      <FlatList
        style={{ backgroundColor: "tomato" }}
        data={collaborators}
        keyExtractor={(c) => c.email}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subTitle={item.email}
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
          title="Add"
          color="secondary"
          width="50%"
          alignSelf="center"
          onPress={async () => {
            console.log(invitePersonEmail);
            console.log(selectedMode);
            setInvitePersonEmail("");
            await addCollaborator(
              invitePersonEmail,
              "slWluB5kkySIVOyIfc1r",
              selectedMode
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
