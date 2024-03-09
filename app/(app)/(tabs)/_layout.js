import { Link, Tabs } from "expo-router";

import { COLORS } from "../../../constants";
import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ScreenHeaderBtn from "../../../components/common/ScreenHeaderBtn";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.enabled,
        tabBarInactiveTintColor: COLORS.disabled,
        headerRight: () => (
          <Link asChild push href="/QRScanner">
            <TouchableOpacity style={{ paddingRight: 16 }}>
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </Link>
        ),
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
        name="UpdatesTab"
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
        name="MapsTab"
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
        name="FAQTab"
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
        name="AccountTab"
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
