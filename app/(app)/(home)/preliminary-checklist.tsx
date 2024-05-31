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
  const stepCount = 2;
  let [screenIndex, setScreenIndex] = useState(0);

  const cancel = () => {
    router.navigate("(app)/(tabs)");
  };

  const prev = () => {
    if (screenIndex > 0) {
      this.carousel.scrollToPrev();
      setScreenIndex(--screenIndex);
    }
  };

  const next = () => {
    if (screenIndex < stepCount - 1) {
      this.carousel.scrollToNext();
      setScreenIndex(++screenIndex);
    }
  };

  const submit = () => {
    router.navigate("(app)/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StepsIndicator
        labels={DonationScreens}
        step={screenIndex}
        steps={stepCount}
      />

      <Carousel
        ref={(carousel) => {
          this.carousel = carousel;
        }}
        showsControls={false}
        showsDots={false}
        scrollEnabled={false}
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
          label="previous"
          onPress={() => prev()}
          style={{ flex: 1 }}
          secondary
        />
        <CallToActionBtn
          label={screenIndex === stepCount - 1 ? "submit" : "next"}
          onPress={
            screenIndex === stepCount - 1 ? () => submit() : () => next()
          }
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
