import { Tabs } from "expo-router";

import { COLORS } from "../../../constants";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        headerRight: () => (
          <ScreenHeaderBtn iconUrl={icons.qrCode} dimension="100%" />
        ),
        tabBarInactiveTintColor: COLORS.disabled,
        tabBarActiveTintColor: COLORS.enabled,
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "HomeTab":
              return (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              );
            case "UpdatesTab":
              return (
                <Ionicons
                  name={focused ? "notifications" : "notifications-outline"}
                  size={size}
                  color={color}
                />
              );
            case "MapsTab":
              return (
                <Ionicons
                  name={focused ? "map" : "map-outline"}
                  size={size}
                  color={color}
                />
              );
            case "FAQTab":
              return (
                <AntDesign
                  name={focused ? "questioncircle" : "questioncircleo"}
                  size={size}
                  color={color}
                />
              );
            case "AccountTab":
              return (
                <FontAwesome5
                  name={focused ? "user-alt" : "user"}
                  size={size}
                  color={color}
                />
              );
            default:
              console.log("Route Does Not Exist.");
          }
        },
      })}
    />
  );
}
