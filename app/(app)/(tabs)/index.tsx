import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Events, Welcome } from "../../../components";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../constants";
import UpcomingAppointments from "components/home/UpcomingAppointments";
import AdminDashboard from "components/home/AdminDashboard";

import { COLORS, SPACES } from "../../../constants/theme";

export default function HomeTab() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
      >
        <Welcome toDonate="/donate" toRequest="/request" />
        {/* Role-Based Component // Staff // Manage Users // Manage Blood Units */}
        <AdminDashboard />
        <UpcomingAppointments />
        <Events />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
  },
  scrollView: { gap: SPACES.xxl },
});
