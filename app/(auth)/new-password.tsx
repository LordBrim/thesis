import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function NewPassword() {
  return (
    <View style={styles.container}>
      <Text>New Password Screen</Text>
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
