import { View, Text, FlatList, RefreshControl, ScrollView } from "react-native";
import { DUMMY_DATA } from "../../data/dummy";
import "firebase/firestore";
import TripItem from "./TripItem";

const TripList = () => {
  const renderItem = ({ item }) => {
    return (
      <View>
        <TripItem title={item.title} description={item.description} />
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 0,
        backgroundColor: "#f0f0f0",
        padding: 0,
        borderRadius: 0,
        shadowColor: "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        margin: 0,
      }}
    >
      <FlatList
        style={{
          flex: 0, // Expand the FlatList to take up the entire available space
          backgroundColor: "#f0f0f0",
          padding: 0,
          borderRadius: 0,
          shadowColor: "transparent",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          margin: 0,
        }}
        data={DUMMY_DATA}
        // keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => console.log("refreshing")}
          />
        }
      />
    </View>
  );
};

export default TripList;
