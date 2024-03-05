import { Stack } from "expo-router/stack";

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false, headerTitle: "" }}>
      <Stack.Screen name="(auth)/Login" screenOptions={{ headerShown: true }} />
      <Stack.Screen name="(auth)/Register" />
      <Stack.Screen name="(auth)/ForgotPassword" />
    </Stack>
  );
}
