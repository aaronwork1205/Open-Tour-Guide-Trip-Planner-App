import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import AppText, { Text } from "../components/AppText";

const initialMessages = [
  {
    id: 1,
    title: "LB",
    description: "blablabla",
    image: require("../assets/lb.jpg"),
  },
  {
    id: 2,
    title: "Minion",
    description: "lalalala",
    image: require("../assets/minion.jpg"),
  },
  {
    id: 3,
    title: "Brandon",
    description: "lalalala",
    image: require("../assets/brandon.jpg"),
  },
  {
    id: 4,
    title: "blabla",
    description: "lalala",
    image: require("../assets/lb.jpg"),
  },
];

const initialFriends = [
  {
    id: 1,
    title: "Wenhao",
    description: "wenhaowenhao",
    image: require("../assets/wenhao.jpg"),
  },
];

function Invite(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const [invitedFriends, setInvitedFriends] = useState(initialFriends);

  const handleDelete = (message) => {
    const newMessage = messages.filter((m) => m.id !== message.id);
    setMessages(newMessage);
  };

  const handleDeleteFriends = (invitedFriend) => {
    const newInvitedFriend = invitedFriends.filter(
      (f) => f.id !== invitedFriend.id
    );
    setInvitedFriends(newInvitedFriend);
  };
  return (
    <Screen style={{ flex: "auto" }}>
      <AppText style={styles.SepTitle}>Collaborators</AppText>
      <FlatList
        style={{ backgroundColor: "tomato" }}
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() =>
          setMessages([
            {
              id: 2,
              title: "T1",
              description: "D1",
              image: require("../assets/lb.jpg"),
            },
          ])
        }
      />
      <AppText style={styles.SepTitle}>Invitation</AppText>
      <FlatList
        style={{ backgroundColor: "yellow" }}
        data={invitedFriends}
        keyExtractor={(invitedFriends) => invitedFriends.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDeleteFriends(item)} />
            )}
          />
        )}
      />
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
  },
});
export default Invite;
