import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { RecentDonations, Events, Welcome } from "../../../components";
import { COLORS, SIZES, SPACES } from "../../../constants/theme";
import AdminDashboard from "../../../components/home/AdminDashboard";

export default function HomeTab({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Welcome toDonate="Donate" toRequest="Request" />
        {/* Role-Based Component // Staff // Manage Users // Manage Blood Units */}
        <RecentDonations />
        <Events toEvent={() => navigation.navigate("Event")} />
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
    padding: SPACES.lg,
    backgroundColor: COLORS.white,
  },
  scrollView: { rowGap: SPACES.xxl },
});
