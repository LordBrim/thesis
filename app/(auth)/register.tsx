import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function Register() {
  return (
    <View style={styles.container}>
      <Text>Registration Screen</Text>
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
