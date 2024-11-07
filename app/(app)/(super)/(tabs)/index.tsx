import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import SuperAdminDashboard from "components/home/SuperAdminDashboard";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import { COLORS, SPACES } from "../../../../constants/theme";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { getCurrentUser } from "rtx/slices/user";
import { getHospitals } from "rtx/slices/hospitals";
import { addEmptyIncentivesToAllHospitals } from "rtx/actions/initializers/ini-hospitals";

export default function HomeTab() {
  const [modalVisible, setModalVisible] = useState(false); // Set initial state to false
  const onModalClose = () => {
    setModalVisible(false);
    router.navigate("(app)/(account)/profile");
  };
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
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingTop: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
  },
  scrollView: { gap: SPACES.xxl, paddingBottom: HORIZONTAL_SCREEN_MARGIN },
});
