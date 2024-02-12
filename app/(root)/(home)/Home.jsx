import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { RecentDonations, Events, Welcome } from "../../../components";
import { COLORS, SIZES } from "../../../constants/theme";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Welcome
          toDonate={() => navigation.navigate("Donate")}
          toRequest={() => navigation.navigate("Request")}
        />
        <RecentDonations
          toDonationHistory={() =>
            navigation.navigate("Account", { screen: "DonationHistory" })
          }
        />
        <Events />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
  },
  scrollView: { rowGap: SIZES.xxLarge },
});
