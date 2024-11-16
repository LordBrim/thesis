import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { COLORS, SPACES, SIZES } from "../../../../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getCurrentUser } from "rtx/slices/user";
import { Link, useRouter } from "expo-router";
import UpcomingAppointmentsStaff from "../(dashboard)/appointmentStaff";
import Divider from "constants/divider";

export default function HomeTab() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "column",
          marginVertical: SPACES.xl,
          marginBottom: SPACES.xl,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Poppins_700Bold",
            marginLeft: 20,
            color: COLORS.primary,
          }}
        >
          Hello, Staff {user.displayName}
        </Text>
        <Divider width={"100%"} height={1} color={COLORS.grayDark} margin={5} />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: SPACES.sm,
          width: "100%",
          marginBottom: SPACES.xxl,
        }}
      >
        <View style={{}}>
          <Link href="/(app)/(admin)/manage-ticket-donations" asChild>
            <Pressable style={styles.ctaContainer}>
              <Text style={[styles.title, styles.ctaTitle]}>
                View pending tickets
              </Text>
              <Text style={[styles.subtitle, styles.ctaSubtitle]}>
                Respond to incoming tickets
              </Text>
            </Pressable>
          </Link>
        </View>

        <Link href="/(app)/(staff)/(dashboard)/change-pass" asChild>
          <Pressable style={styles.containerCP}>
            <Text style={[styles.title, styles.defaultTitle]}>
              Change password
            </Text>
            <Text style={[styles.subtitle, styles.defaultSubtitle]}>
              Go to change password screen
            </Text>
          </Pressable>
        </Link>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
      >
        <UpcomingAppointmentsStaff />
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
  containerCP: {
    flex: 1,
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: SIZES.small,
    padding: SPACES.md,
    justifyContent: "space-between",
    overflow: "hidden",
    borderWidth: 1,
  },
  defaultContainer: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  ctaContainer: {
    backgroundColor: COLORS.primary,
    padding: SPACES.md,
    borderRadius: SIZES.small,
    justifyContent: "space-between",

    width: "100%",
    height: "100%",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  defaultTitle: {},
  ctaTitle: {
    color: COLORS.background,
  },
  subtitle: {
    fontSize: SIZES.small,
  },
  defaultSubtitle: {
    color: COLORS.grayDark,
  },
  ctaSubtitle: {
    color: COLORS.background,
  },
  scrollView: { gap: SPACES.xxl, paddingBottom: HORIZONTAL_SCREEN_MARGIN },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});
