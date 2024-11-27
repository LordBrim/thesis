import { router, useNavigation } from "expo-router";
import HomeTab from "./index";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import { Alert } from "react-native";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import IconBtn from "components/common/IconButton";
import { COLORS } from "../../../../constants";

export default function TabLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconBtn
            icon="plus"
            size={18}
            onPress={() =>
              router.push("(app)/(super)/(home)/manage-hospitals-create")
            }
          />
          <View
            style={{ height: 30, width: 1, backgroundColor: COLORS.grayLight }}
          />
          <View
            style={{
              overflow: "hidden",
              borderRadius: 10,
              width: 40,
              height: 40,
            }}
          >
            <Pressable
              style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
              android_ripple={{ radius: 100 }}
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={24} color="gray" />
            </Pressable>
          </View>
        </View>
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

  return <HomeTab />;
}
