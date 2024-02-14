import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

export default function RecentDonationCard({ location, date }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/bloodbag.png")}
        style={styles.image}
      />
      <View style={styles.text}>
        <Text style={styles.location}>{location || "Medical Institution"}</Text>
        <Text style={styles.date}>{date || "February 14, 2024"}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: SIZES.xLarge,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.small,
    elevation: 3,
    shadowColor: "#52006A",
    gap: SIZES.small,
    backgroundColor: COLORS.white,
    position: "relative",
  },
  image: { height: 45, width: 25 },
  text: {
    flex: 1,
    justifyContent: "center",
  },
  location: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  date: {
    fontSize: SIZES.small,
  },
  line: {
    width: 2,
    height: "100%",
    position: "absolute",
    backgroundColor: COLORS.primary,
    left: 35.2,
    bottom: 0,
  },
});
