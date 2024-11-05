import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useEffect } from "react";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import UpcomingAppointments from "../../../../components/home/UpcomingAppointments";
import { COLORS, SPACES } from "../../../../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getCurrentUser } from "../../../../rtx/slices/user";

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
