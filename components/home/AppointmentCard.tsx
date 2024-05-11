import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES, SPACES } from "../../constants/theme";

type IAppointmentCard = {
  location: string;
  date: string;
  time: string;
};

export default function AppointmentCard({
  location,
  date,
  time,
}: IAppointmentCard) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/bloodbag.png")}
        style={styles.image}
      />
      <View style={styles.text}>
        <Text style={styles.location} numberOfLines={1}>
          {location || "Medical Institution"}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.details}>{date}</Text>
          <Text style={styles.details}> | {time}</Text>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 32,
    paddingVertical: SPACES.md,
    borderRadius: SIZES.small,
    elevation: 3,
    shadowColor: "#52006A",
    gap: SPACES.md,
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
  details: {
    fontSize: SIZES.small,
  },
  line: {
    width: 2,
    height: "100%",
    position: "absolute",
    backgroundColor: COLORS.line,
    left: 43.3,
    bottom: 0,
  },
});
