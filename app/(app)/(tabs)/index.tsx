import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Events, Welcome } from "../../../components";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../constants";
import UpcomingAppointments from "components/home/UpcomingAppointments";
import AdminDashboard from "components/home/AdminDashboard";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import { COLORS, SPACES } from "../../../constants/theme";
import { router } from "expo-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeTab() {
  const [modalVisible, setModalVisible] = useState(false); // Set initial state to false
  const onModalClose = () => {
    setModalVisible(false);
    router.navigate("(app)/(account)/profile");
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
      >
        <Welcome toDonate="/donate" toRequest="/request" />
        {/* Role-Based Component // Staff // Manage Users // Manage Blood Units */}
        <AdminDashboard />
        <UpcomingAppointments />
        <Events />
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
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
  },
  scrollView: { gap: SPACES.xxl },
});
