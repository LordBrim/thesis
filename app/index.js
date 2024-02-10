import { useState } from "react";

import { SafeAreaView, ScrollView, Text, View, Image } from "react-native";

import { icons, COLORS } from "../constants";
import {
  Account,
  FAQ,
  Home,
  Maps,
  Updates,
  Login,
  Register,
  EmptyScreen,
} from "./screens";
import { ScreenHeaderBtn } from "../components/headers/ScreenHeaderBtn";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import ForgotPassword from "./(authentication)/ForgotPassword";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Main() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const handleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <>
      {isSignedIn ? (
        <NavigationContainer
          independent={true}
          options={{ headerShown: false }}
        >
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                switch (route.name) {
                  case "Home":
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
                        name={
                          focused ? "notifications" : "notifications-outline"
                        }
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
              name="Home"
              component={Home}
              // options={{
              //   headerShadowVisible: false,
              //   // headerTitleAlign: "center",
              //   headerTitle: "Lifeline",
              //   // headerRight: () => (
              //   //   <ScreenHeaderBtn iconUrl={icons.qrCode} dimension="100%" />
              //   // ),
              // }}
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
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ title: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      )}
    </>
  );
}

export function Root() {
  console.log("Not Yet Implemented");
}
