import { ImageBackground, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

export default function EventCard({
  image,
  title,
  description,
  date,
  address,
}) {
  return (
    <View style={styles.container}>
      {/* <ImageBackground style={styles.image} source={image} resizeMode="cover" /> */}
      <Text style={styles.title}>{title || "Title"}</Text>
      <Text style={styles.description}>{description || "Description"}</Text>
      <Text style={styles.date}>{date || "Date"}</Text>
      <Text style={styles.address}>{address || "Address"}</Text>
    </View>
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
