import { RecentDonations } from "components";
import { COLORS, HORIZONTAL_SCREEN_MARGIN, SPACES } from "../../../constants";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Donate() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Donate Screen</Text>

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
  scrollView: { gap: SPACES.xxl },
});
