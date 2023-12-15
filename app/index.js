import { SafeAreaView, ScrollView, Text, View, Image } from "react-native";
import { Stack } from "expo-router";

import { icons, COLORS } from "../constants";
import { Account, FAQ, Home, Maps, Updates } from "./main";
import { ScreenHeaderBtn } from "../components/headers/ScreenHeaderBtn";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function Main() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer independent={true} options={{ headerShown: false }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              return (
                <Image
                  source={focused ? icons.home : icons.homeOutline}
                  resizeMode="cover"
                  style={{ width: size, aspectRatio: 1 }}
                />
              );
            } else if (route.name === "Updates") {
              return (
                <Image
                  source={focused ? icons.bell : icons.bellOutline}
                  resizeMode="cover"
                  style={{ width: size, aspectRatio: 1 }}
                />
              );
            } else if (route.name === "Maps") {
              return (
                <Image
                  source={focused ? icons.map : icons.mapOutline}
                  resizeMode="cover"
                  style={{ width: size, aspectRatio: 1 }}
                />
              );
            } else if (route.name === "FAQ") {
              return (
                <Image
                  source={focused ? icons.question : icons.questionOutline}
                  resizeMode="cover"
                  style={{ width: size, aspectRatio: 1 }}
                />
              );
            } else if (route.name === "Account") {
              return (
                <Image
                  source={focused ? icons.person : icons.personOutline}
                  resizeMode="cover"
                  style={{ width: size, aspectRatio: 1 }}
                />
              );
            }
          },
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "black",
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShadowVisible: false,
            // headerTitleAlign: "center",
            headerTitle: "Lifeline",
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
