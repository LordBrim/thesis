import { Stack } from "expo-router/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "app/store"; // Ensure correct import path
import Toastable from "react-native-toastable";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { setCustomText } from "react-native-global-props";
import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import { ClerkProvider } from "@clerk/clerk-expo";

SplashScreen.preventAutoHideAsync();
export default function StackLayout() {
  const [loaded, error] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  const customTextProps = {
    style: {
      fontFamily: "Poppins_400Regular",
    },
  };
  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    changeScreenOrientation();
    setCustomText(customTextProps);
  }, []);
  if (!loaded && !error) {
    return null;
  }
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Provider store={store}>
        <Stack
          initialRouteName="(auth)/login"
          screenOptions={{
            headerTitle: "",
            headerTitleStyle: {
              fontFamily: "Poppins_400Regular",
            },
          }}
        >
          {/* Authentication Screens */}
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen
            name="(auth)/register"
            options={{
              headerTitle: "Register",
            }}
          />
          <Stack.Screen
            name="(auth)/forgot-password"
            options={{
              headerTitle: "Password Recovery",
            }}
          />
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
          <Stack.Screen
            name="(app)/(user)/(account)/donation-history"
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
    </ClerkProvider>
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
