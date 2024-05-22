import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Title from "components/common/texts/Title";
import Description from "components/common/texts/Description";
import CallToActionBtn from "components/common/CallToActionBtn";
import { router } from "expo-router";
import StepsIndicator from "components/common/StepsIndicator";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES } from "../../../constants";

export default function ScheduleAppointmentScreen() {
  const cancel = () => {
    router.replace("(app)/(tabs)/index");
  };

  const labels = [
    "Preliminary Checklist",
    "Schedule Appointment",
    "Appointment Confimation",
  ];

  return (
    <View style={styles.container}>
      <StepsIndicator labels={labels} />
      <View>
        <Title title="Schedule Appointment" />
        <Description description="Feel free to select a date and time that’s most convenient for you!" />
      </View>

      <ScrollView
        contentContainerStyle={{ gap: 8 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        <Text style={styles.header}>Preferred Hospital</Text>

        <Text style={styles.header}>Preferred Date</Text>

        <Text style={styles.header}>Preferred Time</Text>
      </ScrollView>

      <View style={styles.fixed}>
        <CallToActionBtn
          label="cancel"
          onPress={() => cancel}
          style={{ flex: 1 }}
          secondary
        />
        <CallToActionBtn
          label="next"
          onPress={() => router.push("(app)/(home)/schedule-appointment")}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
    gap: 12,
  },
  header: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontWeight: "600",
  },
  fixed: {
    position: "relative",
    bottom: 0,
    flexDirection: "row",
    gap: 8,
  },
});
