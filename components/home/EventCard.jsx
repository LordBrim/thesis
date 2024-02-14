import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
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
      {/* <ImageBackground style={styles.image} source={image} resizeMode="cover" /> */}
      <Text style={styles.title}>{title || "Title"}</Text>
      <Text style={styles.description}>{description || "Description"}</Text>
      <Text style={styles.date}>{date || "Date"}</Text>
      <Text style={styles.address}>{address || "Address"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
  },
  image: {},
  title: {},
  description: {},
  date: {},
  address: {},
});
