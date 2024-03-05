import { Stack } from "expo-router/stack";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="Login" options={{ headerShown: false }} />
    </Stack>
  );
}
