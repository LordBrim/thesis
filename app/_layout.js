import { Stack } from "expo-router/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store";
import Toastable from "react-native-toastable";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity, View } from "react-native";

export default function StackLayout() {
  const { top } = useSafeAreaInsets();

  return (
    <Provider store={store}>
      <Stack
        initialRouteName="(app)/(admin)/(tabs)"
        screenOptions={{ headerShadowVisible: false, headerTitle: "" }}
      >
        {/* Authentication Screens */}
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="(auth)/forgot-password" />
        <Stack.Screen name="(auth)/new-password" />
        <Stack.Screen name="(auth)/confirm-email" />
        {/* Home Screens */}
        {/* <Stack.Screen
        name="(app)/(super)/(tabs)"
        options={({ route }) => ({
          headerTitle: "Super Admin",
        })}
      /> */}
        <Stack.Screen
          name="(app)/(admin)/(tabs)"
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        {/* <Stack.Screen
        name="(app)/(staff)/(tabs)"
        options={({ route }) => ({
          headerTitle: "Staff",
        })}
      /> */}
        <Stack.Screen
          name="(app)/(user)/(tabs)"
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        {/* User Level Home Screens */}
        <Stack.Screen name="(app)/(user)/(home)/request" />
        <Stack.Screen name="(app)/(user)/(home)/event-details" />
        <Stack.Screen
          name="(app)/(user)/(home)/admin"
          options={{
            headerTitle: "Admin Dashboard",
          }}
        />
        <Stack.Screen
          name="(app)/(user)/(home)/admin-donate"
          options={{
            headerTitle: "Admin Dashboard",
          }}
        />
        <Stack.Screen
          name="(app)/(user)/(home)/all-events"
          options={{
            headerTitle: "All Upcoming Events",
            headerTitleAlign: "center",
          }}
        />
        {/* Staff Level Home Screens */}
        <Stack.Screen name="(app)/(admin)/(home)/manage-blood-units" />
        <Stack.Screen name="(app)/(admin)/(home)/manage-events" />
        <Stack.Screen name="(app)/(admin)/(home)/manage-users" />
        <Stack.Screen name="(app)/(admin)/(home)/manage-faq" />
        <Stack.Screen name="(app)/(admin)/(home)/manage-faq-create" />
        <Stack.Screen name="(app)/(admin)/(home)/manage-faq-update" />
        {/* Admin Level Home Screens */}
        <Stack.Screen name="(app)/(admin)/(home)/manage-staff" />
        {/* Account Screens */}
        <Stack.Screen name="(app)/(user)/(account)/about" />
        <Stack.Screen name="(app)/(user)/(account)/donation-history" />
        <Stack.Screen name="(app)/(user)/(account)/help" />
        <Stack.Screen name="(app)/(user)/(account)/profile" />
        <Stack.Screen name="(app)/(user)/(account)/settings" />
        {/* QR Code Screens */}
        <Stack.Screen name="(app)/(user)/(qr)/qr-scanner" />
        {/* Auxilary Screens */}
        <Stack.Screen name="(aux)/empty" />
        <Stack.Screen name="(aux)/no-internet" />
        <Stack.Screen name="(aux)/terms-and-conditions" />
      </Stack>
      <Toastable
        statusMap={{
          success: "#262626",
          danger: "yellow",
          warning: "green",
          info: "blue",
        }}
        messageColor="white"
        offset={top}
        position="top"
        swipeDirection={["left", "right"]}
        duration={5000}
        alwaysVisible={true}
      />
    </Provider>
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
