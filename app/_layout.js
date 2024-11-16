import { Stack } from "expo-router/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "app/store"; // Ensure correct import path
import Toastable from "react-native-toastable";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";

export default function StackLayout() {
  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    changeScreenOrientation();
  }, []);
  return (
    <Provider store={store}>
      <Stack
        initialRouteName="(auth)/login"
        screenOptions={{ headerTitle: "" }}
      >


        {/* Authentication Screens */}
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register"   options={{
            headerTitle: "Register",
          }}  />
        <Stack.Screen name="(auth)/forgot-password"
        options={{
          headerTitle: "Password Recovery",
        }}  />
        <Stack.Screen name="(auth)/new-password" />
        <Stack.Screen name="(auth)/confirm-email" />
        {/* Home Screens */}
        <Stack.Screen
          name="(app)/(super)/(tabs)"
          options={{
            headerTitle: "Super Admin",
          }}
        />
        <Stack.Screen
          name="(app)/(admin)/(tabs)"
          options={{
            headerTitle: "Admin",
          }}
        />
        <Stack.Screen
          name="(app)/(staff)/(tabs)"
          options={{
            headerTitle: "Staff",
          }}
        />
        <Stack.Screen
          name="(app)/(user)/(tabs)"
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        <Stack.Screen
          name="(app)/(user)/(account)/profile"
          options={({ route }) => ({
            headerTitle: "Profile Settings",
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
        <Stack.Screen
          name="(app)/(user)/(account)/about"
          options={{
            headerTitle: "About Us",
          }}
        />
        <Stack.Screen
          name="(app)/(user)/(account)/incentives"
          options={{
            headerTitle: "Incentives",
          }}
        />
        <Stack.Screen name="(app)/(user)/(account)/donation-history"
        options={{
          headerTitle: "Donation History",
        }}
        />
        <Stack.Screen
          name="(app)/(user)/(account)/help"
          options={{
            headerTitle: "Help",
          }}
        />
        <Stack.Screen name="(app)/(user)/(account)/settings" />
        {/* QR Code Screens */}
        <Stack.Screen name="(app)/(user)/(qr)/qr-scanner" />
        {/* Auxilary Screens */}
        <Stack.Screen name="(aux)/empty" />
        <Stack.Screen name="(aux)/no-internet" />
        <Stack.Screen name="(aux)/terms-and-conditions" />
        
      </Stack>
      <Toastable />
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
