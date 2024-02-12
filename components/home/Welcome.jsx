import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Welcome({ toDonate, toRequest }) {
  return (
    <View>
      <Text style={styles.title}>Welcome To Lifeline, User</Text>
      <View>
        <View>
          <TouchableOpacity onPress={toDonate}>
            <Text style={styles.subtitle}>Donate</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={toRequest}>
            <Text style={styles.subtitle}>Request</Text>
          </TouchableOpacity>
        </View>
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
