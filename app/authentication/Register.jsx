import { View, Text } from "react-native";

import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const Register = () => {
  return (
    <View style={styles.container}>
      <Text>Registration Screen</Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
  },
});
