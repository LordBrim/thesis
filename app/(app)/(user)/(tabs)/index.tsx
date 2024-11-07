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
  const [donateStatus, setDonateStatus] = useState(true);
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
              {donateStatus ? (
                <Text style={{ color: "green", fontSize: SIZES.large }}>
                  Available
                </Text>
              ) : (
                <Text style={{ color: "red", fontSize: SIZES.large }}>
                  Locked{"\n"}(3 Months)
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
                25
              </Text>
            </Text>
          </View>
        </View>

        <Welcome toDonate="/donate" toRequest="/request" />
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
    paddingTop: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
  },
  scrollView: { gap: SPACES.xxl, paddingBottom: HORIZONTAL_SCREEN_MARGIN },
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
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: COLORS.primary,
  },
});
