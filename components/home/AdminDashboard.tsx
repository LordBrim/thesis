import { Link } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import { BarChart } from "react-native-gifted-charts";
import ReportBarChart from "./ReportBarChart";
import { useEffect, useState } from "react";
import ReportLineChart from "./ReportLineChart";

export default function AdminDashboard() {
  const size = 40;
  const [chart, setChart] = useState("Daily");

  return (
    <View style={styles.container}>
      <Text style={GS.h1}>Dashboard</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link asChild push href={"manage-staff"}>
          <TouchableOpacity style={styles.btn}>
            <FontAwesome6
              name="user-nurse"
              size={size}
              color={COLORS.primary}
            />
            <Text style={styles.text}>Staff</Text>
          </TouchableOpacity>
        </Link>

        <Link asChild push href={"manage-users"}>
          <TouchableOpacity style={styles.btn}>
            <FontAwesome6
              name="user-injured"
              size={size}
              color={COLORS.primary}
            />
            <Text style={styles.text}>Users</Text>
          </TouchableOpacity>
        </Link>

        <Link asChild push href={"manage-events"}>
          <TouchableOpacity style={styles.btn}>
            <Ionicons
              name="calendar-outline"
              size={size}
              color={COLORS.primary}
            />
            <Text style={styles.text}>Events</Text>
          </TouchableOpacity>
        </Link>

        <Link asChild push href={"manage-faq"}>
          <TouchableOpacity style={styles.btn}>
            <Ionicons
              name="chatbubbles-outline"
              size={size}
              color={COLORS.primary}
            />
            <Text style={styles.text}>FAQ</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Title title="Reports" />

      <View style={{ flexDirection: "row", gap: 2 }}>
        <Pressable
          onPress={() => setChart("Daily")}
          android_ripple={{ radius: 200 }}
          style={[
            styles.switcher,
            { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
          ]}
        >
          <Text>Daily</Text>
        </Pressable>
        <Pressable
          onPress={() => setChart("Weekly")}
          android_ripple={{ radius: 200 }}
          style={styles.switcher}
        >
          <Text>Weekly</Text>
        </Pressable>
        <Pressable
          onPress={() => setChart("Monthly")}
          android_ripple={{ radius: 200 }}
          style={styles.switcher}
        >
          <Text>Monthly</Text>
        </Pressable>
        <Pressable
          onPress={() => setChart("Yearly")}
          android_ripple={{ radius: 200 }}
          style={[
            styles.switcher,
            { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
          ]}
        >
          <Text>Yearly</Text>
        </Pressable>
      </View>

      {chart == "Daily" && <ReportBarChart title="Daily" data={dailyData} />}
      {chart == "Weekly" && <ReportBarChart title="Weekly" data={weeklyData} />}
      {chart == "Monthly" && (
        <ReportBarChart title="Monthly" data={monthlyData} />
      )}
      {chart == "Yearly" && <ReportBarChart title="Yearly" data={yearlyData} />}

      <ReportBarChart title="Donations From Events" data={eventsData} />
      <ReportLineChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  btn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: 80,
    height: 80,
  },
  text: {
    fontWeight: "700",
  },
  switcher: {
    borderWidth: 1,
    paddingVertical: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.slate200,
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
