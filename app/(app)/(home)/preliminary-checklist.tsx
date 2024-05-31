import { SafeAreaView, StyleSheet, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { COLORS, HORIZONTAL_SCREEN_MARGIN, SIZES } from "../../../constants";
import CallToActionBtn from "components/common/CallToActionBtn";
import { router } from "expo-router";
import StepsIndicator from "components/common/StepsIndicator";
import { DonationScreens } from "constants/database";
import ScheduleAppointmentScreen from "./schedule-appointment";
import PreliminaryChecklist from "components/home/PreliminaryChecklist";
import Carousel from "pinar";

export default function PreliminaryChecklistScreen() {
  let [screenIndex, setScreenIndex] = useState(0);

  const cancel = () => {
    router.navigate("(app)/(tabs)");
  };

  const next = () => {
    this.carousel.scrollToNext();
    setScreenIndex(++screenIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StepsIndicator labels={DonationScreens} step={screenIndex} />

      <Carousel
        ref={(carousel) => {
          this.carousel = carousel;
        }}
        showsControls={false}
        showsDots={false}
      >
        <PreliminaryChecklist />
        <ScheduleAppointmentScreen />
      </Carousel>

      <View style={styles.fixed}>
        <CallToActionBtn
          label="cancel"
          onPress={() => cancel()}
          style={{ flex: 1 }}
          secondary
        />
        <CallToActionBtn
          label="next"
          onPress={() => next()}
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
