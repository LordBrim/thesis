import { StyleSheet, Text, View } from "react-native";

export default function QRScanner() {
  return (
    <View style={styles.container}>
      <Text>QR Code Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
