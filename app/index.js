import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Stack } from "expo-router";

import { COLORS } from "../constants/theme";
import { Account, FAQ, Home, Maps, Updates } from "./main";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function Main() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer independent={true} options={{ headerShown: false }}>
      <Tab.Navigator
      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ focused, color, size }) => {
      //     if (route.name === "Home") {
      //       return (
      //         <Ionicons
      //           name={
      //             focused
      //               ? "ios-information-circle"
      //               : "ios-information-circle-outline"
      //           }
      //           size={size}
      //           color={color}
      //         />
      //       );
      //     } else if (route.name === "Settings") {
      //       return (
      //         <Ionicons
      //           name={focused ? "ios-list-box" : "ios-list"}
      //           size={size}
      //           color={color}
      //         />
      //       );
      //     }
      //   },
      //   tabBarInactiveTintColor: "gray",
      //   tabBarActiveTintColor: "tomato",
      // })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShadowVisible: false,
            headerTitle: "Home",
          }}
        />
        <Tab.Screen
          name="Updates"
          component={Updates}
          options={{
            tabBarBadge: 3,
            headerShadowVisible: false,
            headerTitle: "Updates",
          }}
        />
        <Tab.Screen
          name="Maps"
          component={Maps}
          options={{
            headerShadowVisible: false,
            headerTitle: "Maps",
          }}
        />
        <Tab.Screen
          name="FAQ"
          component={FAQ}
          options={{
            headerShadowVisible: false,
            headerTitle: "FAQ",
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            headerShadowVisible: false,
            headerTitle: "Account",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
