import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { COLORS, SIZES } from "../../../../constants/theme";
import { Link } from "expo-router";
import { FontAwesome6, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import SkeletonText from "components/common/SkeletonText";
import {
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
  FIRESTORE_DB,
} from "../../../../firebase-config";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { IAccountCard } from "constants/Interfaces";
import Avatar from "components/common/Avatar";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import IconModal from "../../(common)/custom-album-modal";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import moment from "moment"; // Import moment for date formatting
import { useFocusEffect } from "@react-navigation/native";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import CallToActionBtn from "components/common/CallToActionBtn";

type IAccountTab = {
  avatarUrl: string;
  username: string;
  phoneNumber?: string;
};

export default function AccountTab({
  avatarUrl,
  username,
  phoneNumber,
}: IAccountTab) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState(avatarUrl || null);
  const [modalVisible, setModalVisible] = useState(false);
  const [donateStatus, setDonateStatus] = useState(true);
  const [incentives, setIncentives] = useState(0); // New state for incentives
  const [nextDonationDate, setNextDonationDate] = useState(""); // New state for next donation date
  const [loading, setLoading] = useState(true); // Loading state
  const [refreshing, setRefreshing] = useState(false); // State for refresh control
  const [logoutModalVisible, setLogoutModalVisible] = useState(false); // State for logout modal

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error signing out:", error.message);
      } else {
        console.error("Unknown error signing out");
      }
    }
  };

  const handleLogout = () => {
    setLogoutModalVisible(true); // Show the logout modal
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false); // Hide the logout modal
    signOutUser(); // Proceed with logout
  };

  const fetchUserData = async () => {
    setLoading(true); // Start loading

    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      // Fetch the user document from Firestore
      const userDocRef = doc(FIRESTORE_DB, "User", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setEmail(userData.email);
        setDisplayName(userData.displayName);
        setIncentives(userData.incentive || 0); // Set incentives
        setNextDonationDate(userData.nextDonationDate || ""); // Set next donation date
      } else {
        console.log("No such document!");
      }

      // Fetch the avatar from Firebase Storage
      const fileRef = ref(FIREBASE_STORAGE, `avatars/${user.uid}.jpg`);
      getDownloadURL(fileRef)
        .then((url) => {
          console.log("Avatar URL:", url);
          setAvatar(url); // Set avatar URL if found
        })
        .catch((error) => {
          // Handle the case where the avatar doesn't exist
          if (error.code === "storage/object-not-found") {
            setAvatar(null); // Use null to indicate that default avatar should be used
          } else {
            console.error("Error getting avatar URL:", error);
          }
        })
        .finally(() => {
          setLoading(false); // Stop loading after avatar fetch
        });
    } else {
      console.log("No user is logged in.");
      setLoading(false); // Stop loading if no user
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserData().then(() => setRefreshing(false));
  }, []);

  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const user = FIREBASE_AUTH.currentUser;

    if (user) {
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
    } else {
      console.error("No user is logged in.");
    }
  };

  const { user } = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        overScrollMode="never"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profile}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <Avatar
              avatarUrl={
                avatar
                  ? { uri: avatar } // Firebase URL case
                  : require("../../../../assets/images/defaultAvatar.png") // Local image case
              }
            />
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
                <Text style={styles.title}>{user.displayName}</Text>
                <Text style={styles.subtitle}>{user.email}</Text>
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
                  color: COLORS.text,
                  fontSize: SIZES.small,
                  textAlign: "center",
                },
              ]}
            >
              Donation Status:{"\n"}
              {nextDonationDate ? (
                <Text style={{ color: COLORS.primary, fontSize: SIZES.medium }}>
                  Next donation in{" "}
                  {moment(nextDonationDate).format("MMMM D, YYYY")}
                </Text>
              ) : (
                <Text style={{ color: "green", fontSize: SIZES.large }}>
                  Available
                </Text>
              )}
            </Text>
          </View>

          <View style={styles.donation}>
            <Text
              style={[
                styles.title,
                {
                  color: COLORS.text,
                  fontSize: SIZES.small,
                  textAlign: "center",
                },
              ]}
            >
              Units Donated:{"\n"}
              <Text style={{ fontSize: SIZES.large, color: COLORS.text }}>
                {incentives}
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
                <FontAwesome5 name="history" size={22} color={COLORS.text} />
              }
              label="donation history"
            />
            <Card
              href="/profile"
              icon={
                <MaterialIcons name="person" size={22} color={COLORS.text} />
              }
              label="profile"
            />
            <Card
              href="/incentives"
              icon={<MaterialIcons name="star" size={22} color={COLORS.text} />}
              label="incentives"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Support</Text>
          <View style={styles.flatlist}>
            <Card
              href="/about"
              icon={
                <FontAwesome6
                  name="circle-info"
                  size={22}
                  color={COLORS.text}
                />
              }
              label="about us"
            />
            <Card
              href="/help"
              icon={
                <FontAwesome5
                  name="question-circle"
                  size={22}
                  color={COLORS.text}
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
                <FontAwesome6
                  name="power-off"
                  size={22}
                  color={COLORS.primary}
                />
              </View>
              <Text style={styles.label}>logout</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <SingleBtnModal
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
        onPress={confirmLogout}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        btnLabel="Logout"
        extraBtn={
          <CallToActionBtn
            label="Cancel"
            onPress={() => setLogoutModalVisible(false)}
            secondary
          />
        }
      />
    </SafeAreaView>
  );
}

const Card = ({ href, icon, label, sublabel }: IAccountCard) => (
  <Link asChild push href={href}>
    <Pressable style={styles.card} android_ripple={{ radius: 200 }}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
      {sublabel && <Text style={styles.label}>{label}</Text>}
      <View style={styles.icon}>
        <FontAwesome6 name="chevron-right" size={18} color={COLORS.grayDark} />
      </View>
    </Pressable>
  </Link>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profile: {
    flexDirection: "row",
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  subtitle: {
    fontSize: SIZES.small,
    color: COLORS.text,
    fontFamily: "Poppins_400Regular",
  },
  section: {
    marginTop: HORIZONTAL_SCREEN_MARGIN,
  },
  sectionHeading: {
    fontSize: SIZES.xSmall,
    textTransform: "capitalize",
    fontFamily: "Poppins_700Bold",
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
    textTransform: "capitalize",
    fontFamily: "Poppins_400Regular",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: "Poppins_700Bold",
    textTransform: "capitalize",
    color: COLORS.primary,
  },
  donations: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: COLORS.background,
    minHeight: 110,
  },
  donation: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderColor: COLORS.slate100,
  },
});
