import { Tabs } from "expo-router";

import { COLORS } from "../../../../constants";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.enabled,
        tabBarInactiveTintColor: COLORS.disabled,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account-tab"
        options={{
          title: "Account",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name={focused ? "user-alt" : "user"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "index";

  switch (routeName) {
    case "index":
      return "Home";
    case "account-tab":
      return "Account";
  }
}
