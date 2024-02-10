import { View, Text } from "react-native";

import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const Updates = () => {
  return (
    <View style={styles.container}>
      <Text>Updates</Text>
    </View>
  );
};

export default Updates;

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
