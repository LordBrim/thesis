import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
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
  customStyle?: StyleProp<ViewStyle>; // New optional prop for custom styles
  manageEvent?: boolean; // New optional prop for manageEvent
  description: string;
  address: string;
  documentId?: string;
  latitude?: number;
  longitude?: number;
  onPress?: () => void;
  isAdmin?: boolean;
  navigate?: boolean;
};

export default function EventCard({
  image,
  title,
  date,
  time,
  description,
  address,
  manageEvent = false,
  documentId,
  latitude,
  longitude,
  onPress = () => {},
  navigate = false,
  isAdmin = false,
}: IEventCard) {
  const cardContent = (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.details}>
          {manageEvent ? (
            <View style={styles.columnDetails}>
              <Text style={styles.subtitle}>{date}</Text>
              {time && <Text style={styles.subtitle}> | {time}</Text>}
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.subtitle}>{date}</Text>
              {time && <Text style={styles.subtitle}> | {time}</Text>}
            </View>
          )}
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return !navigate ? (
    <Link
      asChild
      push
      href={{
        pathname: "/(app)/(home)/event-details",
        params: {
          image: image.uri,
          title: title,
          date: date,
          time: time,
          description,
          address,
          documentId,
          latitude,
          longitude,
          isAdmin,
        },
      }}
    >
      {cardContent}
    </Link>
  ) : (
    cardContent
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
    fontFamily: "Poppins_400Regular",
  },
  columnDetails: {
    flexDirection: "column",
    fontFamily: "Poppins_400Regular",
  },
  title: {
    fontSize: SIZES.xLarge,
    color: COLORS.background,
    fontFamily: "Poppins_700Bold",
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.background,
    fontFamily: "Poppins_400Regular",
  },
});
