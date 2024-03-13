import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function EmailPassword() {
  return (
    <View style={styles.container}>
      <Text>Email Password Screen</Text>
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
