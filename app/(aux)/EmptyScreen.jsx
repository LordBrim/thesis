import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function EmptyScreen() {
  return (
    <View style={styles.container}>
      <Text>Empty Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifiyContent: "center",
    alignItems: "center",
  },
});
