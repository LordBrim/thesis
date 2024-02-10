import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function ForgotPassword() {
  return (
    <View style={styles.container}>
      <Text>Fortgot Password</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifiyContent: "center",
    alignItems: "center",
  },
});
