import {
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import ChecklistItem from "components/home/ChecklistItem";
import { COLORS, HORIZONTAL_SCREEN_MARGIN, SIZES } from "../../../constants";
import CallToActionBtn from "components/common/CallToActionBtn";
import { router } from "expo-router";
import Title from "components/common/texts/Title";
import Description from "components/common/texts/Description";
import StepsIndicator from "components/common/StepsIndicator";
import { DonationScreens, checklistQuestions } from "constants/database";
import SwiperFlatList from "react-native-swiper-flatlist";
import ScheduleAppointmentScreen from "./schedule-appointment";
import PreliminaryChecklist from "components/home/PreliminaryChecklist";

export default function PreliminaryChecklistScreen() {
  const cancel = () => {
    router.replace("(app)/(tabs)/index");
  };

  const [screen, setScreen] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <StepsIndicator labels={DonationScreens} step={0} />

      <SwiperFlatList index={0} showPagination={false} disableGesture={true}>
        <View style={styles.child}>
          <PreliminaryChecklist />
        </View>
        <View style={styles.child}>
          <ScheduleAppointmentScreen />
        </View>
      </SwiperFlatList>

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
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
    gap: 12,
  },
  child: {
    width: width,
    justifyContent: "center",
  },
  fixed: {
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    flexDirection: "row",
    gap: 8,
  },
});
