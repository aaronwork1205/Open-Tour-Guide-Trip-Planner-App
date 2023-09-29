import { Text, View, StyleSheet } from "react-native";

export const QrCodeScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>QR code skan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});
