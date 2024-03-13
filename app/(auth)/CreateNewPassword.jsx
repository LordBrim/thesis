import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function CreateNewPassword() {
  return (
    <View style={styles.container}>
      <Text>Create New Password Screen</Text>
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
