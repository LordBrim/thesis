import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACES } from "../../constants/theme";

export default function EventCard({ toEvent, image, title, date }) {
  return (
    <TouchableOpacity style={styles.container} onPress={toEvent}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.details}>
          <Text style={styles.date}>{date || "April 20, 2024"}</Text>
          <Text style={styles.title}>{title || "Blood Donation Event"}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "100%",
    aspectRatio: 16 / 7,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  image: {
    opacity: 7,
    width: "100%",
    height: "100%",
  },
  details: {
    flex: 1,
    padding: SPACES.lg,
    backgroundColor: "rgba(0, 0, 0, .4)",
    justifyContent: "flex-end",
  },
  title: { fontSize: SIZES.xLarge, color: COLORS.white },
  date: { fontSize: SIZES.small, color: COLORS.white },
});
