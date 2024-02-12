import { StyleSheet, View } from "react-native";

import { RecentDonations, Events, Welcome } from "../../../components";
import { COLORS, SIZES } from "../../../constants/theme";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Welcome
        toDonate={() => navigation.navigate("Donate")}
        toRequest={() => navigation.navigate("Request")}
      />
      <RecentDonations />
      <Events />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
  },
});
