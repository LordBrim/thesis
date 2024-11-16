import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useEffect } from "react";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import AdminDashboard from "components/home/AdminDashboard";
import { COLORS, SPACES, SIZES } from "../../../../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getCurrentUser } from "rtx/slices/user";
import { getHospitals } from "rtx/slices/hospitals";
import { getHospitalReports } from "rtx/slices/reports";

export default function HomeTab() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getHospitals());
    dispatch(getHospitalReports(user.hospitalName));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
      >
        <AdminDashboard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.background,
  },
  ctaContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,

    width: "50%",
    aspectRatio: 16 / 9,
    borderRadius: SIZES.small,
    padding: SPACES.md,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  ctaTitle: {
    fontSize: 18,
    color: COLORS.background,
    fontFamily: "Poppins_700Bold",
  },
  ctaSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.background,
  },
  scrollView: { gap: SPACES.xxl, paddingVertical: HORIZONTAL_SCREEN_MARGIN },
});
