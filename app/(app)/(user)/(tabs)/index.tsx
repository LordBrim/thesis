import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Events, Welcome } from "../../../../components";
import { GS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import UpcomingAppointments from "components/home/UpcomingAppointments";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import { COLORS, SIZES, SPACES } from "../../../../constants/theme";
import { router } from "expo-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getCurrentUser } from "rtx/slices/user";

export default function HomeTab() {
  useEffect(() => {
    const checkUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "User", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (
            !userData.displayName ||
            !userData.sex ||
            !userData.age ||
            !userData.contactDetails ||
            !userData.city
          ) {
            setModalVisible(true);
          }
        }
        console.log("Document data:", userDoc.data());
      }
    };
    checkUserInfo();
  }, []);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
      >
        <View>
          <Text style={GS.h3}>
            Welcome Back!
            <Text style={[GS.h1, { color: COLORS.primary }]}>
              {" "}
              {user.displayName}
            </Text>
          </Text>
        </View>

        <Welcome toDonate="/donate" toRequest="/request" currentUser={user} />
        <UpcomingAppointments />
        <Events />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
  },
  scrollView: { gap: SPACES.xxl, paddingVertical: HORIZONTAL_SCREEN_MARGIN },

  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: COLORS.primary,
  },
});
