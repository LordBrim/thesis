import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import { Link } from "expo-router";
import { FontAwesome6, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import SkeletonText from "components/common/SkeletonText";
import {
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
  FIRESTORE_DB,
} from "../../../firebase-config";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../constants";
import { IAccountCard } from "constants/Interfaces";
import Avatar from "components/common/Avatar";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type IAccountTab = {
  avatarUrl: string;
  username: string;
  email: string;
  phoneNumber?: string;
};

export default function AccountTab({
  avatarUrl,
  username,
  phoneNumber,
}: IAccountTab) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState(avatarUrl);
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(true); // Loading state

  const signOutUser = async () => {
    try {
      const auth = getAuth();
      await auth.signOut();
      console.log("User signed out successfully");

      // Clear any local storage or state related to the user
      await AsyncStorage.removeItem("user_logged_in");
      await AsyncStorage.removeItem("user_email");
      await AsyncStorage.removeItem("user_password");
      await AsyncStorage.removeItem("user_role");

      router.replace("/login"); // Navigate to login screen after successful logout
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
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

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userDocRef = doc(FIRESTORE_DB, "User", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setEmail(userData.email);
          setDisplayName(userData.displayName);
        } else {
          console.log("No such document!");
        }
      }

      // Get the download URL for the avatar
      const fileRef = ref(
        FIREBASE_STORAGE,
        `gs://lifeline-eb7f0.appspot.com/avatars/${user.uid}.jpg`
      );
      getDownloadURL(fileRef)
        .then((url) => {
          console.log("Avatar URL:", url); // Log the URL
          setAvatar(url);
        })
        .catch((error) => {
          console.error("Error getting avatar URL:", error);
        })
        .finally(() => {
          setLoading(false); // Stop loading
        });
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    Alert.alert(
      "Edit Profile Picture",
      "Do you want to change your profile picture?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            // Ask for permission to access the camera roll
            const permissionResult =
              await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
              alert("Permission to access camera roll is required!");
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
              const source = { uri: result.assets[0].uri };
              console.log(source);
              uploadImage(source.uri);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const user = FIREBASE_AUTH.currentUser;
    const storageRef = ref(FIREBASE_STORAGE, `avatars/${user.uid}.jpg`);

    uploadBytes(storageRef, blob).then(async (snapshot) => {
      console.log("Uploaded a blob or file!");
      const downloadURL = await getDownloadURL(storageRef);
      setAvatar(downloadURL);

      // Update the user's avatar URL in Firestore
      const userDocRef = doc(FIRESTORE_DB, "User", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          avatarUrl: downloadURL,
        });
      } else {
        await setDoc(userDocRef, {
          avatarUrl: downloadURL,
          email: user.email,
          displayName: user.displayName,
          role: "user", // or any default role you want to set
        });
      }
    });
  };

  return (
    <ScrollView style={styles.container} overScrollMode="never">
      <View style={styles.profile}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <Avatar avatarUrl={{ uri: avatar }} onEdit={pickImage} />
        )}
        <View style={{ flex: 1, gap: 4 }}>
          {loading ? (
            <>
              <Text>
                <SkeletonText width={150} />
              </Text>
              <Text>
                <SkeletonText width={220} />
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.title}>{displayName}</Text>
              <Text style={styles.subtitle}>{email}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.donations}>
        <View style={styles.donation}>
          <Text
            style={[
              styles.title,
              {
                color: COLORS.slate400,
                fontSize: SIZES.small,
                textAlign: "center",
              },
            ]}
          >
            Donation Status:{"\n"}
            {status ? (
              <Text style={{ color: "green", fontSize: SIZES.large }}>
                Available
              </Text>
            ) : (
              <Text style={{ color: "red", fontSize: SIZES.large }}>
                Locked
              </Text>
            )}
          </Text>
        </View>
        <View style={styles.donation}>
          <Text
            style={[
              styles.title,
              {
                color: COLORS.slate400,
                fontSize: SIZES.small,
                textAlign: "center",
              },
            ]}
          >
            Units Donated:{"\n"}
            <Text style={{ fontSize: SIZES.large, color: COLORS.black }}>
              25
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Account</Text>
        <View style={styles.flatlist}>
          <Card
            href="/donation-history"
            icon={
              <FontAwesome5 name="history" size={22} color={COLORS.black} />
            }
            label="donation history"
          />
          <Card
            href="/profile"
            icon={
              <MaterialIcons name="person" size={22} color={COLORS.black} />
            }
            label="profile"
          />
          <Card
            href="/settings"
            icon={<FontAwesome6 name="gear" size={22} color={COLORS.black} />}
            label="settings"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Support</Text>
        <View style={styles.flatlist}>
          <Card
            href="/about"
            icon={
              <FontAwesome6 name="circle-info" size={22} color={COLORS.black} />
            }
            label="about"
          />
          <Card
            href="/help"
            icon={
              <FontAwesome5
                name="question-circle"
                size={22}
                color={COLORS.black}
              />
            }
            label="help"
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={[styles.flatlist, { marginTop: 0 }]}>
          <Pressable
            style={styles.card}
            android_ripple={{ radius: 200 }}
            onPress={handleLogout}
          >
            <View style={styles.icon}>
              <FontAwesome6 name="power-off" size={22} color={COLORS.primary} />
            </View>
            <Text style={styles.label}>logout</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const Card = ({ href, icon, label, sublabel }: IAccountCard) => (
  <Link asChild replace href={href}>
    <Pressable style={styles.card} android_ripple={{ radius: 200 }}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
      {sublabel && <Text style={styles.label}>{label}</Text>}
      <View style={styles.icon}>
        <FontAwesome6 name="chevron-right" size={18} color={COLORS.slate400} />
      </View>
    </Pressable>
  </Link>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profile: {
    flexDirection: "row",
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  donations: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: COLORS.white,
  },
  donation: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderColor: COLORS.slate100,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: SIZES.small,
    color: COLORS.black,
    fontWeight: "500",
  },
  section: {
    marginTop: HORIZONTAL_SCREEN_MARGIN,
  },
  sectionHeading: {
    fontSize: SIZES.xSmall,
    textTransform: "capitalize",
    fontWeight: "700",
    marginHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
  flatlist: {
    flex: 1,
    marginHorizontal: HORIZONTAL_SCREEN_MARGIN,
    marginTop: 5,
    overflow: "hidden",
    borderRadius: 12,
    shadowRadius: 12,
  },
  card: {
    flex: 1,
    width: "100%",
    maxHeight: 50,
    flexDirection: "row",
    paddingVertical: 12,
    gap: 6,
    alignItems: "center",
    backgroundColor: COLORS.slate100,
  },
  cardBorder: {},
  icon: {
    width: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
