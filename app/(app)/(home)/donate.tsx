import { RecentDonations } from "components";
import { COLORS, HORIZONTAL_SCREEN_MARGIN, SPACES } from "../../../constants";
import { ScrollView, StyleSheet, View } from "react-native";
import ActionBtn from "components/home/ActionBtn";
import DonationIncentives from "components/home/DonationIncentives";

export default function Donate() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.buttons}>
          <ActionBtn
            href="/index"
            title="Set An Appointment"
            subtitle="Schedule a date."
            cta
          />
        </View>
        <DonationIncentives />
        <RecentDonations />
      </ScrollView>
    </View>
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
  scrollView: { rowGap: SPACES.xxl },
  buttons: {
    flexDirection: "row",
    height: 90,
    gap: SPACES.sm,
  },
});
