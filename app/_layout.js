import { Stack } from "expo-router/stack";

export default function StackLayout() {
  return (
    <Stack
      initialRouteName="Login"
      screenOptions={{ headerShadowVisible: false, headerTitle: "" }}
    >
      // Authentication Screens
      <Stack.Screen name="Login" />
      <Stack.Screen name="Register" />
      <Stack.Screen name="ForgotPassword" />
      // Home Screens
      <Stack.Screen name="HomeTab" options={{ headerShown: false }} />
      // User Level Home Screens
      <Stack.Screen name="Donate" />
      <Stack.Screen name="Request" />
      <Stack.Screen name="EventDetails" />
      // Staff Level Home Screens
      <Stack.Screen name="ManageBloodUnits" />
      <Stack.Screen name="ManageEvents" />
      <Stack.Screen name="ManageUsers" />
      <Stack.Screen name="ManageStaff" />
      // QR Code Screens
      <Stack.Screen name="QRCode" />
    </Stack>
  );
}
