import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import CallToActionBtn from "components/common/CallToActionBtn";
import { router, useNavigation } from "expo-router";
import StepsIndicator from "components/common/StepsIndicator";
import ScheduleAppointmentScreen from "./schedule-appointment";
import PreliminaryChecklist from "components/home/PreliminaryChecklist";
import Carousel from "pinar";
import SingleBtnModal from "components/common/modals/SingleBtnModal"; // Adjust the path as necessary
import Ionicons from "@expo/vector-icons/Ionicons";
import DonateReview from "./donate-review"; // Adjust the path as necessary
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { getAuth } from "firebase/auth"; // Import Firebase Auth functions
import { generateUniqueTicketCode } from "../../../../utils/helperFunction"; // Import the ticket code generator

export default function DonateScreen() {
  const stepCount = 3;
  let [screenIndex, setScreenIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const scheduleAppointmentRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [delayedModalVisible, setDelayedModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);

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

  const prev = () => {
    if (screenIndex > 0) {
      this.carousel.scrollToPrev();
      setScreenIndex(--screenIndex);
    }
  };

  const next = () => {
    if (screenIndex === 0 && !allQuestionsAnswered) {
      setAlertModalVisible(true);
      return;
    }
    if (screenIndex === 1 && scheduleAppointmentRef.current) {
      scheduleAppointmentRef.current.updateAnswersState();
      if (!scheduleAppointmentRef.current.isValid()) {
        setAlertModalVisible(true);
        return;
      }
    }
    if (screenIndex < stepCount - 1) {
      console.log("Answers:", answers); // Log answers when clicking next
      this.carousel.scrollToNext();
      setScreenIndex(++screenIndex);
    }
  };

  const closeAlertModal = () => {
    setAlertModalVisible(false);
  };

  const noticeDescription = [
    "This in-app screening is a preliminary evaluation to assess your potential eligibility to donate. Please note that:",
    "1. Completion of this preliminary evaluation does not guarantee final eligibility.",
    "2. You will still need to undergo a comprehensive health screening by authorized medical personnel to determine your final eligibility.",
    "3. Final decisions regarding donations are made solely by authorized medical personnel based on the results of the health screening.",
    "By clicking 'I Agree', you confirm that you have read and agree with these guidelines.",
  ];

  const submit = async () => {
    if (scheduleAppointmentRef.current) {
      scheduleAppointmentRef.current.handleNextButtonPress(answers);
    } else {
      console.log("scheduleAppointmentRef is null");
    }

    const ticketCode = await generateUniqueTicketCode();
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(ticketCode);
    if (!user) {
      console.error("No user is currently signed in.");
      return;
    }

    // Separate appointment data from checklist data
    const {
      appointmentDate,
      appointmentTime,
      selectedHospital,
      ...checklistData
    } = answers;

    const db = getFirestore();
    try {
      await addDoc(collection(db, "ticketDonate"), {
        checklistData: checklistData,
        isComplete: false,
        message: "sent",
        selectedDate: appointmentDate,
        selectedHospital: selectedHospital,
        selectedTime: appointmentTime,
        status: "pending",
        ticketNumber: ticketCode,
        type: "appointment",
        userEmail: user.email,
        userUID: user.uid,
      });
      setTicketNumber(ticketCode);
      setSuccessModalVisible(true);
      console.log("Document successfully written!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleCloseSuccessModal = () => {
    router.navigate("(app)/(user)/(tabs)");
    setSuccessModalVisible(false);
  };

  const Screens = [
    "Preliminary\nChecklist",
    "Schedule\nAppointment",
    "Review\nSchedule",
  ];
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StepsIndicator labels={Screens} step={screenIndex} steps={stepCount} />

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
          allQuestionsAnswered={setAllQuestionsAnswered}
        />
        <ScheduleAppointmentScreen
          ref={scheduleAppointmentRef}
          updateAnswers={handleAnswerChange}
        />
        <DonateReview answers={answers} />
      </Carousel>

      <View style={styles.fixed}>
        {screenIndex > 0 ? (
          <CallToActionBtn
            label="previous"
            onPress={() => prev()}
            style={{ flex: 1 }}
            secondary
          />
        ) : null}
        <CallToActionBtn
          label={screenIndex === stepCount - 1 ? "submit" : "next"}
          onPress={
            screenIndex === stepCount - 1 ? () => submit() : () => next()
          }
          style={{ flex: 1 }}
          disabled={screenIndex === 0 && !allQuestionsAnswered}
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
        description={null}
        btnLabel="I Agree"
        extraBtn={
          <CallToActionBtn
            label={"I Disagree"}
            onPress={() => router.back()}
            secondary
          />
        }
      >
        <ScrollView style={{ maxHeight: "40%" }}>
          {noticeDescription.map((line, index) => (
            <Text key={index} style={{ marginBottom: 2, fontSize: 14 }}>
              {line}
            </Text>
          ))}
        </ScrollView>
      </SingleBtnModal>

      <SingleBtnModal
        visible={alertModalVisible}
        onRequestClose={closeAlertModal}
        onPress={closeAlertModal}
        title="Incomplete Information"
        description="Please answer all questions before proceeding to the next step."
        btnLabel="OK"
      />

      <SingleBtnModal
        visible={successModalVisible}
        onRequestClose={handleCloseSuccessModal}
        onPress={handleCloseSuccessModal}
        title="Success!"
        description="Your appointment is scheduled for review by the hospital staff. Please show this code to confirm your attendance."
        btnLabel="I Understand"
      >
        <View
          style={{
            backgroundColor: COLORS.background,
            marginHorizontal: HORIZONTAL_SCREEN_MARGIN,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Here's your code:
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              fontSize: 28,
              color: COLORS.primary,
            }}
          >
            {ticketNumber}
          </Text>
        </View>
      </SingleBtnModal>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
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
