import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { RecentDonations, Events, Welcome } from "../../../components";
import { COLORS, SPACES } from "../../../constants/theme";
import AdminDashboard from "../../../components/home/AdminDashboard";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../constants";

export default function HomeTab() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Welcome toDonate="/donate" toRequest="/request" />
        {/* Role-Based Component // Staff // Manage Users // Manage Blood Units */}
        <RecentDonations />
        <Events toEvent={"/event-details"} />
        {/* Temporary Admin Controls */}
        {/* <AdminDashboard
          toManageBloodUnits={"/manage-blood-units"}
          toManageEvents={"/manage-events"}
          toManageStaff={"/manage-staff"}
          toManageUsers={"/manage-users"}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
  },
  scrollView: { rowGap: SPACES.xxl },
});
