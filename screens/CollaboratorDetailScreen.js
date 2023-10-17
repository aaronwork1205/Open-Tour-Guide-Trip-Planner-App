// CollaboratorDetail.js
import React from "react";
import { View, Text } from "react-native";

function CollaboratorDetail({ route }) {
  const { collaborator } = route.params;
  console.log(route);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Title: {collaborator.title}</Text>
      <Text>Description: {collaborator.description}</Text>
      {/* Render other details here */}
    </View>
  );
}

export default CollaboratorDetail;
