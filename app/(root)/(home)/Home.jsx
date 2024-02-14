import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { RecentDonations, Events, Welcome } from "../../../components";
import { COLORS, SIZES } from "../../../constants/theme";
import AdminDashboard from "../../../components/home/AdminDashboard";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Welcome
          toDonate={() => navigation.navigate("Donate")}
          toRequest={() => navigation.navigate("Request")}
        />
        {/* Role-Based Component // Staff // Manage Users // Manage Blood Units */}
        <RecentDonations
          toDonationHistory={() =>
            navigation.navigate("Account", { screen: "DonationHistory" })
          }
        />
        <Events />
        {/* Temporary Admin Controls */}
        <AdminDashboard
          toManageBloodUnits={() => navigation.navigate("ManageBloodUnits")}
          toManageEvents={() => navigation.navigate("ManageEvents")}
          toManageStaff={() => navigation.navigate("ManageStaff")}
          toManageUsers={() => navigation.navigate("ManageUsers")}
        />
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
