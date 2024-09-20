import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Dimensions } from "react-native";
import { COLORS, HORIZONTAL_SCREEN_MARGIN, SIZES } from "../../../constants";
import CallToActionBtn from "components/common/CallToActionBtn";
import { router } from "expo-router";
import StepsIndicator from "components/common/StepsIndicator";
import { DonationScreens } from "constants/database";
import ScheduleAppointmentScreen from "./schedule-appointment";
import PreliminaryChecklist from "components/home/PreliminaryChecklist";
import Carousel from "pinar";
import SingleBtnModal from "components/common/modals/SingleBtnModal"; // Adjust the path as necessary
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PreliminaryChecklistScreen() {
  const stepCount = 2;
  let [screenIndex, setScreenIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const scheduleAppointmentRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [delayedModalVisible, setDelayedModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedModalVisible(true);
      setModalVisible(true);
    }, 0);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
    setDelayedModalVisible(false);
  };

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

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
      console.log("Answers:", answers); // Log answers when clicking next
      this.carousel.scrollToNext();
      setScreenIndex(++screenIndex);
    }
  };
  const noticeDescription = `
This in-app screening is a preliminary evaluation to assess your potential eligibility for donation. Please note that:

1. Completion of this screening does not guarantee final eligibility.

2. You will still need to undergo a comprehensive medical examination to determine your full eligibility status.

3. The examination will be conducted by authorized medical professionals to evaluate your overall health and fitness for donation.

4. Results from this in-app screening are preliminary and may not reflect your final eligibility determination.

5. Final eligibility decisions are made solely by authorized medical personnel based on the results of the comprehensive examination.

By proceeding with this screening, you acknowledge that you understand these requirements and agree to participate in the full eligibility assessment process if deemed necessary.`;

  const submit = () => {
    if (scheduleAppointmentRef.current) {
      scheduleAppointmentRef.current.handleNextButtonPress(answers);
    } else {
      console.log("scheduleAppointmentRef is null");
    }
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
        <PreliminaryChecklist
          answers={answers}
          handleAnswerChange={handleAnswerChange}
        />
        <ScheduleAppointmentScreen ref={scheduleAppointmentRef} />
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

      <SingleBtnModal
        visible={modalVisible}
        animation={true}
        icon={
          <Ionicons name="information-circle-outline" size={42} color="black" />
        }
        onRequestClose={closeModal}
        onPress={closeModal}
        title="Important Notice Regarding Eligibility Assessment"
        renderMarkdown={true}
        description={noticeDescription}
        btnLabel="I Agree"
      />
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
