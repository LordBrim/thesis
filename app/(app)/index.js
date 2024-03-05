import { Stack } from "expo-router";
import { View } from "react-native";

export default function Root() {
  return (
    <Stack>
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
    </Stack>
  );
}
