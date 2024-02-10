import { StyleSheet, View } from "react-native";
import { Donations, Events, Welcome } from "../../../components";

import { COLORS, SIZES } from "../../../constants/theme";

const Home = () => {
  return (
    <View style={styles.container}>
      <Welcome />
      <Donations />
      <Events />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
  },
});
