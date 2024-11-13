import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import AdminDashboard from "components/home/AdminDashboard";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import { COLORS, SPACES, SIZES } from "../../../../constants/theme";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getCurrentUser } from "rtx/slices/user";
import { getHospitals } from "rtx/slices/hospitals";
import { getHospitalReports } from "rtx/slices/reports";

export default function HomeTab() {
  const [modalVisible, setModalVisible] = useState(false); // Set initial state to false
  const onModalClose = () => {
    setModalVisible(false);
    router.navigate("(app)/(account)/profile");
  };
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
      <SingleBtnModal
        onPress={onModalClose}
        icon={
          <Ionicons name="information-circle-outline" size={42} color="black" />
        }
        onRequestClose={onModalClose}
        title="Profile Information Incomplete"
        btnLabel="I Understand"
        visible={modalVisible}
        animation={true}
        description="Complete your profile to unlock all features and personalize your journey with us. It only takes a moment!"
      />
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

    fontWeight: "bold",
  },
  ctaSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.background,
  },
  scrollView: { gap: SPACES.xxl, paddingVertical: HORIZONTAL_SCREEN_MARGIN },
});
