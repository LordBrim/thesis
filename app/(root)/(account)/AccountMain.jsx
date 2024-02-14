import {
  Account,
  DonationHistory,
  Profile,
  Settings,
  About,
  Help,
} from "../../screens";

import { createStackNavigator } from "@react-navigation/stack";

export default function AccountMain() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="DonationHistory"
        component={DonationHistory}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Donation History",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ headerTitleAlign: "center", headerTitle: "About Us" }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{ headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
}
