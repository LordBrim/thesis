// import { SignedInContext } from "../context/SignedInContext";
// const [isSignedIn, setIsSignedIn] = useState(false);
// <SignedInContext.Provider value={[isSignedIn, setIsSignedIn]}>
//   </SignedInContext.Provider>

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import { Text, View } from "react-native";
import { Account, FAQ, Home, Maps, Updates } from "../screens";

import { icons, COLORS } from "../../constants";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
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
        tabBarInactiveTintColor: COLORS.disabled,
        tabBarActiveTintColor: COLORS.enabled,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          headerShown: false,
          title: "Home",
          // headerRight: () => (
          //   <ScreenHeaderBtn iconUrl={icons.qrCode} dimension="100%" />
          // ),
        }}
      />
      <Tab.Screen
        name="UpdatesTab"
        component={Updates}
        options={{
          tabBarBadge: 3,
          headerShadowVisible: false,
          headerTitle: "Updates",
          title: "Updates",
        }}
      />
      <Tab.Screen
        name="MapsTab"
        component={Maps}
        options={{
          headerShadowVisible: false,
          headerTitle: "Maps",
          title: "Maps",
        }}
      />
      <Tab.Screen
        name="FAQTab"
        component={FAQ}
        options={{
          headerShadowVisible: false,
          headerTitle: "FAQ",
          title: "FAQ",
        }}
      />
      <Tab.Screen
        name="AccounTab"
        component={Account}
        options={{
          headerShown: false,
          title: "Account",
        }}
      />
    </Tab.Navigator>
  );
}
