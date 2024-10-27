import { Link } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome6, Fontisto, Ionicons, Octicons } from "@expo/vector-icons";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import { BarChart } from "react-native-gifted-charts";
import ReportBarChart from "./ReportBarChart";
import { useEffect, useState } from "react";
import ReportLineChart from "./ReportLineChart";
import { FlatList } from "react-native";

export default function AdminDashboard() {
  const size = 40;
  const [chart, setChart] = useState("Daily");

  const gridBtns = [
    {
      href: "manage-hospitals",
      icon: (
        <FontAwesome6 name="hospital-user" size={size} color={COLORS.primary} />
      ),
      title: "Hospitals",
    },
    {
      href: "manage-admins",
      icon: <FontAwesome6 name="user-tie" size={size} color={COLORS.primary} />,
      title: "Admins",
    },
    {
      href: "manage-staff",
      icon: (
        <FontAwesome6 name="user-nurse" size={size} color={COLORS.primary} />
      ),
      title: "Staff",
    },
    {
      href: "manage-tickets",
      icon: <FontAwesome6 name="ticket" size={size} color={COLORS.primary} />,
      title: "Tickets",
    },
    {
      href: "manage-events",
      icon: <Ionicons name="calendar" size={size} color={COLORS.primary} />,
      title: "Events",
    },
    {
      href: "manage-faq",
      icon: <Ionicons name="chatbubbles" size={size} color={COLORS.primary} />,
      title: "FAQ",
    },
    {
      href: "manage-incentives",
      icon: <Ionicons name="gift" size={size} color={COLORS.primary} />,
      title: "Incentives",
    },
    {
      href: "manage-blood-units",
      icon: <Fontisto name="blood" size={size} color={COLORS.primary} />,
      title: "Blood Units",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ gap: 8 }}>
        <Text style={GS.h2}>Dashboard</Text>

        <FlatList
          data={gridBtns}
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

      {chart == "Daily" && <ReportBarChart title="Daily" data={dailyData} />}
      {chart == "Weekly" && <ReportBarChart title="Weekly" data={weeklyData} />}
      {chart == "Monthly" && (
        <ReportBarChart title="Monthly" data={monthlyData} />
      )}
      {chart == "Yearly" && <ReportBarChart title="Yearly" data={yearlyData} />}

      <ReportBarChart title="Donations From Events" data={eventsData} />
      <ReportLineChart />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: 16,
  },
  dBtnText: {
    fontWeight: "500",
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

const dailyData = [
  {
    value: 40,
    label: "M",
    spacing: -5,
    labelWidth: 18,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 20, frontColor: COLORS.accent1 },
  {
    value: 50,
    label: "T",
    spacing: -5,
    labelWidth: 18,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 40, frontColor: COLORS.accent1 },
  {
    value: 75,
    label: "W",
    spacing: -5,
    labelWidth: 18,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 25, frontColor: COLORS.accent1 },
  {
    value: 30,
    label: "T",
    spacing: -5,
    labelWidth: 18,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 20, frontColor: COLORS.accent1 },
  {
    value: 60,
    label: "F",
    spacing: -5,
    labelWidth: 18,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 40, frontColor: COLORS.accent1 },
  {
    value: 65,
    label: "S",
    spacing: -5,
    labelWidth: 18,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 30, frontColor: COLORS.accent1 },
  {
    value: 65,
    label: "S",
    spacing: -5,
    labelWidth: 18,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 30, frontColor: COLORS.accent1 },
];

const weeklyData = [
  {
    value: 65,
    label: "46",
    spacing: -5,
    labelWidth: 25,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 30, frontColor: COLORS.accent1 },
  {
    value: 40,
    label: "47",
    spacing: -5,
    labelWidth: 25,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 20, frontColor: COLORS.accent1 },
  {
    value: 50,
    label: "48",
    spacing: -5,
    labelWidth: 25,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 40, frontColor: COLORS.accent1 },
  {
    value: 75,
    label: "49",
    spacing: -5,
    labelWidth: 25,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 25, frontColor: COLORS.accent1 },
  {
    value: 30,
    label: "50",
    spacing: -5,
    labelWidth: 25,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 20, frontColor: COLORS.accent1 },
  {
    value: 60,
    label: "51",
    spacing: -5,
    labelWidth: 25,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 40, frontColor: COLORS.accent1 },
  {
    value: 65,
    label: "52",
    spacing: -5,
    labelWidth: 25,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 30, frontColor: COLORS.accent1 },
];

const monthlyData = [
  {
    value: 40,
    label: "Jan",
    spacing: -5,
    labelWidth: 32,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 20, frontColor: COLORS.accent1 },
  {
    value: 50,
    label: "Feb",
    spacing: -5,
    labelWidth: 32,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 40, frontColor: COLORS.accent1 },
  {
    value: 75,
    label: "Mar",
    spacing: -5,
    labelWidth: 32,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 25, frontColor: COLORS.accent1 },
  {
    value: 30,
    label: "Apr",
    spacing: -5,
    labelWidth: 32,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 20, frontColor: COLORS.accent1 },
  {
    value: 60,
    label: "May",
    spacing: -5,
    labelWidth: 32,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 40, frontColor: COLORS.accent1 },
  {
    value: 65,
    label: "Jun",
    spacing: -5,
    labelWidth: 32,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 30, frontColor: COLORS.accent1 },
  {
    value: 65,
    label: "Jul",
    spacing: -5,
    labelWidth: 32,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 30, frontColor: COLORS.accent1 },
];

const yearlyData = [
  {
    value: 40,
    label: "2018",
    spacing: -5,
    labelWidth: 37,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 20, frontColor: COLORS.accent1 },
  {
    value: 40,
    label: "2019",
    spacing: -5,
    labelWidth: 37,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 20, frontColor: COLORS.accent1 },
  {
    value: 50,
    label: "2020",
    spacing: -5,
    labelWidth: 37,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 40, frontColor: COLORS.accent1 },
  {
    value: 75,
    label: "2021",
    spacing: -5,
    labelWidth: 37,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 25, frontColor: COLORS.accent1 },
  {
    value: 30,
    label: "2022",
    spacing: -5,
    labelWidth: 37,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 20, frontColor: COLORS.accent1 },
  {
    value: 60,
    label: "2023",
    spacing: -5,
    labelWidth: 37,
    labelTextStyle: { color: "gray" },
    frontColor: COLORS.primary,
  },
  { value: 40, frontColor: COLORS.accent1 },
  {
    value: 65,
    label: "2024",
    spacing: -5,
    labelWidth: 37,
    labelTextStyle: { color: "gray", textFontSize: 12 },
    frontColor: COLORS.primary,
  },
  { value: 30, frontColor: COLORS.accent1 },
];

const eventsData = [
  {
    value: 40,
    frontColor: COLORS.primary,
  },
  {
    value: 50,
    frontColor: COLORS.primary,
  },
  {
    value: 75,
    frontColor: COLORS.primary,
  },
  {
    value: 30,
    frontColor: COLORS.primary,
  },
  {
    value: 60,
    frontColor: COLORS.primary,
  },
  {
    value: 65,
    frontColor: COLORS.primary,
  },
  {
    value: 65,
    frontColor: COLORS.primary,
  },
];
