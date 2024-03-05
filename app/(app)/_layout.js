import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      // User Level
      <Stack.Screen name="(home)/Donate" />
      <Stack.Screen name="(home)/Request" />
      <Stack.Screen name="(home)/EventDetails" />
      // Staff Level
      <Stack.Screen name="(home)/ManageBloodUnits" />
      <Stack.Screen name="(home)/ManageEvents" />
      <Stack.Screen name="(home)/ManageUsers" />
      <Stack.Screen name="(home)/ManageStaff" />
    </Stack>
  );
}
