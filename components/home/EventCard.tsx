import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACES } from "../../constants/theme";
import { Link } from "expo-router";

type IEventCard = {
  image: ImageSourcePropType;
  title: string;
  date?: string;
  time?: string;
};

export default function EventCard({ image, title, date, time }: IEventCard) {
  return (
    <Link
      asChild
      push
      href={{
        pathname: "/(app)/(home)/event-details",
        params: {
          image: image.toString(),
          title: title,
          time: time,
          description: "description",
          toMaps: "path",
        },
      }}
    >
      <TouchableOpacity style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.details}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.subtitle}>{date}</Text>
              {time && <Text style={styles.subtitle}> | {time}</Text>}
            </View>

            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 16 / 7.5,
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
  subtitle: { fontSize: 14, color: COLORS.white },
});
