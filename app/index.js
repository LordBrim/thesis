import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { Stack } from "expo-router";

import { COLORS, SIZES } from "../constants/theme";

export default function Main() {
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
      <Text>Hello Main</Text>
    </SafeAreaView>
  );
}
