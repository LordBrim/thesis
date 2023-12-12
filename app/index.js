import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { Stack } from "expo-router";

import { COLORS, SIZES } from "../constants/theme";
import { HomeDonations, HomeEvents, HomeWelcome } from "../components/index";

export default function Home() {
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
