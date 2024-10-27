import { router, Tabs, useNavigation } from "expo-router";
import { COLORS } from "../../../../constants";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            borderRadius: 10,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
          }}
          onPress={handleLogout}
        >
          <Text style={{ color: "white" }}>A</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleDropdown = () => {
    console.log("Open dropdown!");
  };

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: signOutUser },
      ],
      { cancelable: false }
    );
  };

  const signOutUser = async () => {
    try {
      const auth = getAuth();
      await auth.signOut();
      console.log("User signed out successfully");

      await AsyncStorage.removeItem("user_logged_in");
      await AsyncStorage.removeItem("user_email");
      await AsyncStorage.removeItem("user_password");
      await AsyncStorage.removeItem("user_role");

      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

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
    </Tabs>
  );
}
