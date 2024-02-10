import { StyleSheet, View, Text } from "react-native";

export default function Welcome() {
  return (
    <View>
      <Text style={styles.title}>Welcome To Lifeline, User</Text>
      <View>
        <Text style={styles.subtitle}>Donate</Text>
        <Text style={styles.subtitle}>Request</Text>
      </View>
    </View>
  );
}

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
  subtitle: {
    fontFamily: "Raleway_Semibold",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
