import { StyleSheet, View, Text } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text>About Us</Text>
      <Text>About This App</Text>
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
