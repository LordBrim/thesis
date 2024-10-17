import Description from "../../../components/common/texts/Description";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CallToActionBtn from "../../../components/common/CallToActionBtn";
import { router, useLocalSearchParams } from "expo-router";
import {
  HORIZONTAL_SCREEN_MARGIN,
  COLORS,
  SIZES,
  GS,
} from "../../../constants";

export default function EventDetailsScreen() {
  const { image, title, description, toMaps } = useLocalSearchParams();

  const navigateToMaps = () => {
    router.replace("/(app)/(tabs)/maps-tab");
  };

  return (
    <View style={styles.container}>
      {/* Dynamic For Each User */}
      <ScrollView>
        <View style={styles.banner}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.cTop}>
          <Text style={GS.h1}>Event Details 1</Text>
          <Text style={styles.date}>April 20, 2024</Text>
          <Text style={styles.address}>
            This is line for Address: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. In porttitor at nibh quis semper. Aliquam eu
            fermentum nisl.
          </Text>
          <Description
            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor at nibh quis semper. Aliquam eu fermentum nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam gravida mi vel pharetra fermentum. Nunc molestie pharetra ex. Donec nec lectus ac turpis dictum semper sit amet id eros. Morbi ac massa mollis, fringilla augue sit amet, eleifend erat. Phasellus placerat quam non sem pulvinar, ut molestie nunc iaculis. Quisque auctor venenatis purus quis porttitor. In id purus ac eros vestibulum cursus. Nulla ornare justo vitae diam suscipit, ac lobortis purus viverra.

            Morbi eget turpis vulputate, egestas libero a, sodales enim. Praesent quis metus erat. Sed convallis augue fringilla velit porttitor, vel feugiat dui venenatis. Proin bibendum at magna in convallis. Ut faucibus mattis rhoncus. Nulla facilisi. Proin vel pellentesque turpis, et mattis nisi. Vestibulum imperdiet felis a dolor lacinia, id tristique eros imperdiet.

            Proin pellentesque neque risus, quis egestas dui elementum in. In rutrum malesuada turpis, vitae luctus diam. Integer vitae pellentesque neque. Curabitur a ipsum quis magna euismod elementum. Vivamus malesuada, eros a efficitur consequat, est turpis maximus odio, non malesuada enim nisi ornare purus. Vestibulum in malesuada metus. Fusce eu velit sapien. Integer sit amet neque eget sem vestibulum pretium id non odio. Ut augue mauris, sollicitudin sit amet accumsan eu, egestas a mauris. Donec sit amet quam ornare purus scelerisque bibendum. Nulla facilisi. Ut malesuada ipsum nisl, sit amet consectetur nisi cursus vitae. Integer lorem nibh, accumsan eu arcu porta, luctus aliquet massa.`}
          />
        </View>
      </ScrollView>
      <View style={styles.cBottom}>
        <CallToActionBtn label="Go To Maps" onPress={() => navigateToMaps()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  cTop: {
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingVertical: 24,
    gap: 12,
  },
  cBottom: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    backgroundColor: "white",
  },
  banner: {
    flex: 1,
    minWidth: "100%",
    aspectRatio: 16 / 7,
    backgroundColor: COLORS.primary,
    overflow: "hidden",
  },
  image: {
    opacity: 7,
    width: "100%",
    height: "100%",
  },
  address: { fontSize: SIZES.medium },
  date: { fontSize: SIZES.medium },
});
