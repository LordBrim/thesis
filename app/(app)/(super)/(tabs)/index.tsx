import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import SuperAdminDashboard from "components/home/SuperAdminDashboard";
import { COLORS, SPACES } from "../../../../constants/theme";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { getCurrentUser } from "rtx/slices/user";
import { getHospitals } from "rtx/slices/hospitals";

export default function HomeTab() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getHospitals());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
      >
        <SuperAdminDashboard />
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
  scrollView: {
    gap: SPACES.xxl,
    paddingVertical: HORIZONTAL_SCREEN_MARGIN,
  },
});
