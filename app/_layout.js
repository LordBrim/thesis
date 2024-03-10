import { Stack } from "expo-router/stack";
import QRHeaderBtn from "../components/common/QRHeaderBtn";

export default function StackLayout() {
  return (
    <Stack
      initialRouteName="Login"
      screenOptions={{ headerShadowVisible: false, headerTitle: "" }}
    >
      {/* Authentication Screens */}
      <Stack.Screen name="(auth)/Login" />
      <Stack.Screen name="(auth)/Register" />
      <Stack.Screen name="(auth)/ForgotPassword" />
      {/* Home Screens */}
      <Stack.Screen
        name="(app)/(tabs)"
        options={{
          headerRight: () => <QRHeaderBtn />,
        }}
      />
      {/* User Level Home Screens */}
      <Stack.Screen name="(app)/(home)/Donate" />
      <Stack.Screen name="(app)/(home)/Request" />
      <Stack.Screen name="(app)/(home)/EventDetails" />
      {/* Staff Level Home Screens */}
      <Stack.Screen name="(app)/(home)/ManageBloodUnits" />
      <Stack.Screen name="(app)/(home)/ManageEvents" />
      <Stack.Screen name="(app)/(home)/ManageUsers" />
      <Stack.Screen name="(app)/(home)/ManageStaff" />
      {/* Account Screens */}
      <Stack.Screen name="(app)/(account)/About" />
      <Stack.Screen name="(app)/(account)/DonationHistory" />
      <Stack.Screen name="(app)/(account)/Help" />
      <Stack.Screen name="(app)/(account)/Profile" />
      <Stack.Screen name="(app)/(account)/Settings" />
      {/* QR Code Screens */}
      <Stack.Screen name="(app)/(qr)/QRScanner" />
    </Stack>
  );
}
