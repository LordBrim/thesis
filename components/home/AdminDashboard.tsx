import { Link } from "expo-router";
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome6, Fontisto, Ionicons } from "@expo/vector-icons";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import ReportBarChart from "./ReportBarChart";
import { useState } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import {
  incrementDonation,
  incrementHospitalReports,
  incrementRequest,
  ReportsState,
} from "rtx/slices/reports";
import moment from "moment";
import useIncrementHospitalReport from "hooks/useIncrementHospitalReport";

export default function AdminDashboard() {
  const size = 40;
  const [chart, setChart] = useState("Daily");
  const gridBtns1 = [
    {
      href: "/(app)/(admin)/(home)/manage-admins",
      icon: (
        <FontAwesome6 name="user-doctor" size={size} color={COLORS.primary} />
      ),
      title: "Admins",
    },
    {
      href: "/(app)/(admin)/(home)/manage-staff",
      icon: (
        <FontAwesome6 name="user-nurse" size={size} color={COLORS.primary} />
      ),
      title: "Staff",
    },
    {
      href: "/(app)/(admin)/(home)/manage-events",
      icon: <Ionicons name="calendar" size={size} color={COLORS.primary} />,
      title: "Events",
    },
    {
      href: "/(app)/(admin)/(home)/manage-incentives",
      icon: <FontAwesome6 name="gifts" size={size} color={COLORS.primary} />,
      title: "Incentives",
    },
    {
      href: "/(app)/(admin)/(home)/manage-blood-units",
      icon: <Fontisto name="blood" size={size} color={COLORS.primary} />,
      title: "Blood Units",
    },
  ];
  const gridBtns2 = [
    {
      href: "/(app)/(admin)/(home)/manage-ticket-donations",
      icon: <FontAwesome6 name="ticket" size={size} color={COLORS.primary} />,
      title: "User\nDonations",
    },
    {
      href: "/(app)/(admin)/(home)/manage-ticket-requests",
      icon: <FontAwesome6 name="ticket" size={size} color={COLORS.primary} />,
      title: "User\nRequests",
    },
  ];
  const { yearly, monthly, weekly, daily } = useSelector(
    (state: RootState) => state.reports
  );
  const formatDataYearly = (data: Record<string, any>) => {
    return Object.entries(data).flatMap(([key, item]) => [
      {
        value: item.donations,
        label: key,
        spacing: 5,
        labelWidth: 35,
        labelTextStyle: { color: "gray" },
        frontColor: COLORS.primary,
      },
      {
        value: item.requests,
        frontColor: COLORS.accent,
      },
    ]);
  };
  const formatDataMonthly = (data: Record<string, any>) => {
    return Object.entries(data).flatMap(([key, item]) => [
      {
        value: item.donations,
        label: key,
        spacing: 5,
        labelWidth: 35,
        labelTextStyle: { color: "gray" },
        frontColor: COLORS.primary,
      },
      {
        value: item.requests,
        frontColor: COLORS.accent,
      },
    ]);
  };
  const formatDataWeekly = (data: Record<string, any>) => {
    return Object.entries(data).flatMap(([key, item]) => [
      {
        value: item.donations,
        label: key,
        spacing: 5,
        labelWidth: 35,
        labelTextStyle: { color: "gray" },
        frontColor: COLORS.primary,
      },
      {
        value: item.requests,
        frontColor: COLORS.accent,
      },
    ]);
  };
  const formatDataDaily = (data: Record<string, any>) => {
    return Object.entries(data).flatMap(([key, item]) => [
      {
        value: item.donations,
        label: moment(key).format("ddd"),
        spacing: 5,
        labelWidth: 35,
        labelTextStyle: { color: "gray" },
        frontColor: COLORS.primary,
      },
      {
        value: item.requests,
        frontColor: COLORS.accent,
      },
    ]);
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={GS.h2}>Dashboard</Text>
        <FlatList
          data={gridBtns1}
          renderItem={({ item }) => (
            <View style={[styles.dBtnView]}>
              <Link asChild push href={item.href}>
                <Pressable
                  style={styles.dBtnPress}
                  android_ripple={{ radius: 200 }}
                >
                  {item.icon}
                  <Text style={styles.dBtnText}>{item.title}</Text>
                </Pressable>
              </Link>
            </View>
          )}
          keyExtractor={(item) => item.href}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={4}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.section}>
        <Text style={GS.h2}>Transactions</Text>
        <FlatList
          data={gridBtns2}
          renderItem={({ item }) => (
            <View style={[styles.dBtnView]}>
              <Link asChild push href={item.href}>
                <Pressable
                  style={styles.dBtnPress}
                  android_ripple={{ radius: 200 }}
                >
                  {item.icon}
                  <Text style={styles.dBtnText}>{item.title}</Text>
                </Pressable>
              </Link>
            </View>
          )}
          keyExtractor={(item) => item.href}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={4}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.section}>
        <Text style={GS.h2}>Reports</Text>

        <View style={{ flexDirection: "row", gap: 2 }}>
          <View
            style={[
              styles.sBtnView,
              { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
            ]}
          >
            <Pressable
              onPress={() => setChart("Daily")}
              android_ripple={{ radius: 200 }}
              style={styles.sBtnPress}
            >
              <Text>Daily</Text>
            </Pressable>
          </View>

          <View style={[styles.sBtnView]}>
            <Pressable
              onPress={() => setChart("Weekly")}
              android_ripple={{ radius: 200 }}
              style={styles.sBtnPress}
            >
              <Text>Weekly</Text>
            </Pressable>
          </View>

          <View style={[styles.sBtnView]}>
            <Pressable
              onPress={() => setChart("Monthly")}
              android_ripple={{ radius: 200 }}
              style={styles.sBtnPress}
            >
              <Text>Monthly</Text>
            </Pressable>
          </View>

          <View
            style={[
              styles.sBtnView,
              { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
            ]}
          >
            <Pressable
              onPress={() => setChart("Yearly")}
              android_ripple={{ radius: 200 }}
              style={[
                styles.sBtnPress,
                { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
              ]}
            >
              <Text>Yearly</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {chart == "Daily" && (
        <ReportBarChart title="Daily" data={formatDataDaily(daily)} />
      )}
      {chart == "Weekly" && (
        <ReportBarChart title="Weekly" data={formatDataWeekly(weekly)} />
      )}
      {chart == "Monthly" && (
        <ReportBarChart title="Monthly" data={formatDataMonthly(monthly)} />
      )}
      {chart == "Yearly" && (
        <ReportBarChart title="Yearly" data={formatDataYearly(yearly)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: 16,
    backgroundColor: COLORS.background,
  },
  scrollview: {},
  section: {
    gap: 8,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
  dBtnText: {
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  dBtnView: {
    width: "25%",
    aspectRatio: 1 / 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  dBtnPress: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  sBtnView: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    overflow: "hidden",
  },
  sBtnPress: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
});
