import { View, Text, StyleSheet } from "react-native";

const Welcome = () => {
  return (
    <View>
      <Text style={styles.title}>Welcome To Lifeline, User</Text>
      <View>
        <Text>Donate</Text>
        <Text>Request</Text>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Bakbakone",
    fontSize: 24,
    color: "#000",
  },
});
