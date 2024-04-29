import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function NoInternetScreen() {
  return (
    <View style={styles.container}>
      <Text>No Internet Connection</Text>
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
