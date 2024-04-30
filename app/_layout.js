import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Stack } from "expo-router/stack";
import QRHeaderBtn from "../components/common/QRHeaderBtn";

export default function StackLayout() {
  return (
    <Stack
      initialRouteName="Login"
      screenOptions={{ headerShadowVisible: false, headerTitle: "" }}
    >
      {/* Authentication Screens */}
      <Stack.Screen name="(auth)/no-internet" />
      <Stack.Screen name="(auth)/register" />
      <Stack.Screen name="(auth)/forgot-password" />
      {/* Home Screens */}
      <Stack.Screen
        name="(app)/(tabs)"
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerRight: () => <QRHeaderBtn />,
        })}
      />
      {/* User Level Home Screens */}
      <Stack.Screen name="(app)/(home)/donate" />
      <Stack.Screen name="(app)/(home)/request" />
      <Stack.Screen name="(app)/(home)/event-details" />
      {/* Staff Level Home Screens */}
      <Stack.Screen name="(app)/(home)/manage-blood-units" />
      <Stack.Screen name="(app)/(home)/manage-events" />
      <Stack.Screen name="(app)/(home)/manage-users" />
      {/* Admin Level Home Screens */}
      <Stack.Screen name="(app)/(home)/manage-staff" />
      {/* Account Screens */}
      <Stack.Screen name="(app)/(account)/about" />
      <Stack.Screen name="(app)/(account)/donation-history" />
      <Stack.Screen name="(app)/(account)/help" />
      <Stack.Screen name="(app)/(account)/profile" />
      <Stack.Screen name="(app)/(account)/settings" />
      {/* QR Code Screens */}
      <Stack.Screen name="(app)/(qr)/qr-scanner" />
      {/* Other Screens */}
      <Stack.Screen name="(aux)/empty" />
      <Stack.Screen name="(aux)/no-internet" />
    </Stack>
  );
}

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "index";

  switch (routeName) {
    case "index":
      return "Home";
    case "updates-tab":
      return "Updates";
    case "maps-tab":
      return "Maps";
    case "faq-tab":
      return "FAQ";
    case "account-tab":
      return "Account";
  }
}
