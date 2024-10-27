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
        <UpcomingAppointments />
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
  scrollView: { gap: SPACES.xxl, paddingBottom: HORIZONTAL_SCREEN_MARGIN },
});
