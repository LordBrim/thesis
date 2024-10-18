import { Tabs } from "expo-router";

import { COLORS } from "../../../../constants";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

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
        name="updates-tab"
        options={{
          title: "Updates",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="maps-tab"
        options={{
          title: "Maps",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="faq-tab"
        options={{
          title: "FAQ",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name={focused ? "questioncircle" : "questioncircleo"}
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

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// const Tab = createBottomTabNavigator();

// import { Account, FAQ, Home, Maps, Updates } from "../screens";

// export function HomeTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="HomeTab" component={Home} />
//       <Tab.Screen
//         name="UpdatesTab"
//         component={Updates}
//         options={{
//           tabBarBadge: 3,
//         }}
//       />
//       <Tab.Screen name="MapsTab" component={Maps} />
//       <Tab.Screen name="FAQTab" component={FAQ} />
//       <Tab.Screen name="AccountTab" component={Account} />
//     </Tab.Navigator>
//   );
// }
