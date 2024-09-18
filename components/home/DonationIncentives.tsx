import { StyleSheet, View, Text, FlatList, SafeAreaView } from "react-native";
import { SIZES, SPACES } from "../../constants/theme";
import DonationIncentive from "./DonationIncentive";

export default function DonationIncentives() {
  return (
    <View style={styles.container}>
      <FlatList
        data={sampleData}
        renderItem={({ item }) => <DonationIncentive checked={item.checked} />}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        contentContainerStyle={styles.flatlist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACES.xs,
    borderWidth: 1,
    width: 70,
    maxWidth: 70,
    maxHeight: 70,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  subtitle: {
    textTransform: "capitalize",
  },
  flatlist: {
    flex: 1,
    flexDirection: "row",
    gap: SPACES.sm,
    width: "100%",
  },
  checkmark: {
    height: 80,
    width: 80,
    aspectRatio: 1 / 1,
    position: "absolute",
    opacity: 1,
  },
});

const sampleData = [
  {
    id: 1,
    checked: true,
  },
  {
    id: 2,
    checked: false,
  },
  {
    id: 3,
    checked: false,
  },
  {
    id: 4,
    checked: false,
  },
];
