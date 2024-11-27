import { router, useNavigation } from "expo-router";
import HomeTab from "./index";
import { useEffect } from "react";
import { Platform, Pressable, View } from "react-native";
import { Alert } from "react-native";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import IconBtn from "components/common/IconButton";
import { COLORS } from "../../../../constants";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { getDownloadURL, getStorage, ref } from "@firebase/storage";

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
          <IconBtn icon="circle-info" size={18} onPress={downloadFromUrl} />
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
      await AsyncStorage.removeItem("user_logged_in");
      await AsyncStorage.removeItem("user_email");
      await AsyncStorage.removeItem("user_password");
      await AsyncStorage.removeItem("user_role");
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  const downloadFromUrl = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, "manuals/LIFELINE_ADMIN_MANUAL.pdf");
    try {
      const url = await getDownloadURL(storageRef); // Retrieve HTTPS URL from Firebase
      const filename = "LIFELINE_ADMIN_MANUAL.pdf";
      const result = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + filename
      );
      save(
        result.uri,
        filename,
        result.headers["Content-Type"] || "application/pdf"
      );
    } catch (error) {
      console.error("Error downloading file from Firebase:", error);
    }
  };
  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        try {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const fileUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              filename,
              mimetype
            );
          await FileSystem.writeAsStringAsync(fileUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
          console.log("File saved to:", fileUri);
        } catch (error) {
          console.error("Error saving file on Android:", error);
        }
      } else {
        console.log("Permissions denied. Sharing file...");
        shareAsync(uri);
      }
    } else {
      console.log("Sharing file on iOS...");
      shareAsync(uri);
    }
  };
  return <HomeTab />;
}
