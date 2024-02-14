import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

export default function EventCard({
  toEvent,
  image,
  title,
  description,
  date,
  address,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={toEvent}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{title || "Title"}</Text>
        <Text style={styles.date}>{date || "Date"}</Text>
        <Text style={styles.description}>{description || "Description"}</Text>
      </View>
      <Text style={styles.address}>{address || "Address"}</Text>
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
  image: { opacity: 7, width: "100%", height: "100%" },
  details: {
    width: "70%",
  },
  title: { fontSize: SIZES.xLarge },
  date: { fontSize: SIZES.medium },
  description: { fontSize: SIZES.large },
  address: { fontSize: SIZES.medium },
});
