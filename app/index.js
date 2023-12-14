import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { COLORS, SIZES } from "../constants/theme";
import { HomeDonations, HomeEvents, HomeWelcome } from "../components/index";

export default function Home() {
  const [fontsLoaded] = useFonts({
    // DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    // DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    // DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    Bakbakone: require("../assets/fonts/BakbakOne.ttf"),
    Raleway_Italic_SemiBold: require("../assets/fonts/Raleway_Italic_SemiBold.ttf"),
    Raleway_Semibold: require("../assets/fonts/Raleway_SemiBold.ttf"),
  });
  return (
    <SafeAreaView sytle={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "Home",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <HomeWelcome />
          <HomeDonations />
          <HomeEvents />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
