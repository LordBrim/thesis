import { View, Text } from "react-native";

import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

export default function MapsTab() {
  return (
    <View style={styles.container}>
      <Text>Maps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
});
