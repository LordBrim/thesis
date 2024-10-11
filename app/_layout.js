import { Stack } from "expo-router/stack";
import QRHeaderBtn from "../components/common/QRHeaderBtn";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export default function StackLayout() {
  return (
    <Stack
      initialRouteName="(auth)/login"
      screenOptions={{ headerShadowVisible: false, headerTitle: "" }}
    >
      {/* Authentication Screens */}
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/register" />
      <Stack.Screen name="(auth)/forgot-password" />
      <Stack.Screen name="(auth)/new-password" />
      <Stack.Screen name="(auth)/confirm-email" />
      {/* Home Screens */}
      <Stack.Screen
        name="(app)/(tabs)"
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
      {/* User Level Home Screens */}

      <Stack.Screen name="(app)/(home)/request" />
      <Stack.Screen name="(app)/(home)/event-details" />
      <Stack.Screen
        name="(app)/(home)/admin"
        options={{
          headerTitle: "Admin Dashboard",
        }}
      />
      <Stack.Screen
        name="(app)/(home)/admin-donate"
        options={{
          headerTitle: "Admin Dashboard",
        }}
      />

      <Stack.Screen
        name="(app)/(home)/all-events"
        options={{
          headerTitle: "All Upcoming Events",
          headerTitleAlign: "center",
        }}
      />
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
      {/* Auxilary Screens */}
      <Stack.Screen name="(aux)/empty" />
      <Stack.Screen name="(aux)/no-internet" />
      <Stack.Screen name="(aux)/terms-and-conditions" />
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
