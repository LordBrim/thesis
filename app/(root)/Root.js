import { Account, FAQ, Maps, Updates } from "../screens";
import HomeMain from "./(home)/HomeMain";
import { icons, COLORS } from "../../constants";

import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function Root() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer
      independent={true}
      detachInactiveScreens={false}
      options={{ headerShown: false }}
    >
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case "HomeMain":
                return (
                  <Ionicons
                    name={focused ? "home" : "home-outline"}
                    size={size}
                    color={color}
                  />
                );
              case "Updates":
                return (
                  <Ionicons
                    name={focused ? "notifications" : "notifications-outline"}
                    size={size}
                    color={color}
                  />
                );
              case "Maps":
                return (
                  <Ionicons
                    name={focused ? "map" : "map-outline"}
                    size={size}
                    color={color}
                  />
                );
              case "FAQ":
                return (
                  <AntDesign
                    name={focused ? "questioncircle" : "questioncircleo"}
                    size={size}
                    color={color}
                  />
                );
              case "Account":
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
          tabBarInactiveTintColor: COLORS.disabled,
          tabBarActiveTintColor: COLORS.enabled,
        })}
      >
        <Tab.Screen
          name="HomeMain"
          component={HomeMain}
          options={{
            headerShadowVisible: false,
            headerShown: false,
            // headerRight: () => (
            //   <ScreenHeaderBtn iconUrl={icons.qrCode} dimension="100%" />
            // ),
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
