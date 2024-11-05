import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import Description from "components/common/texts/Description";
import { router } from "expo-router";
import {
  HORIZONTAL_SCREEN_MARGIN,
  COLORS,
  SIZES,
  GS,
} from "../../../../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { firestoreOperations } from "firestore-services";
import { getAuth } from "firebase/auth";
import { generateUniqueTicketCode } from "../../../../utils/helperFunction";
import { MINOR_COMPONENT_HEIGHT } from "constants/measurements";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import { checklistQuestions } from "../../../../constants/database"; // Adjust the path to your database.js file

const mapAnswersToQuestions = (answers) => {
  return checklistQuestions.reduce((acc, question) => {
    if (answers[question.id]) {
      acc[question.question] = answers[question.id];
    }
    return acc;
  }, {});
};
const ScheduleAppointmentScreen = forwardRef((props, ref) => {
  const cancel = () => {
    router.replace("(app)/(tabs)/index");
  };
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // State for selected hospital
  const [selectedHospital, setSelectedHospital] = useState(null);

  // State for selected date
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setSelectedDate(currentDate);
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || selectedTime;
    setSelectedTime(currentTime);
    setShowTimePicker(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    router.navigate("(app)/(user)/(tabs)/");
  };

  const handleNextButtonPress = async (answers) => {
    if (!selectedHospital) {
      alert("Please select a hospital.");
      return;
    }
    console.log("Selected Hospital:", selectedHospital);
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    const formattedTime = selectedTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    console.log("Selected Date:", formattedDate);
    console.log("Selected Time:", formattedTime);

    const auth = getAuth();
    const user = auth.currentUser;
    const ticketCode = await generateUniqueTicketCode();

    if (user) {
      console.log("Current User Email:", user.email);
      console.log("Current User UID:", user.uid);

      try {
        // Map answers to questions
        const checklistData = mapAnswersToQuestions(answers);

        // Create the data object to store in Firestore
        const ticketData = {
          selectedHospital,
          selectedDate: formattedDate, // Date as string
          selectedTime: formattedTime, // Time as string
          userEmail: user.email,
          userUID: user.uid,
          fullName: user.displayName,
          ticketNumber: ticketCode,
          status: "pending",
          checklistData,
          message: "sent",
          type: "appointment",
          isComplete: false,
        };
        await firestoreOperations.createDocument("ticketDonate", ticketData);

        console.log("Ticket request saved successfully!");
        setShowModal(true);
        console.log(ticketData.checklistData);
        setTicketNumber(ticketData.ticketNumber);
      } catch (error) {
        console.error("Error saving ticket request:", error);
      }
    } else {
      console.log("No user is signed in.");
    }
  };
  useImperativeHandle(ref, () => ({
    handleNextButtonPress,
  }));

  // State for selected time (hour and minute)

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const hospitals = [
    { label: "UERM Hospital", value: "UERM Hospital" },
    {
      label: "De los Santos Medical Center",
      value: "De los Santos Medical Center",
    },
    {
      label: "ACE Medical Center",
      value: "ACE Medical Center",
    },

    {
      label: "Our Lady of Lourdes Hospital",
      value: "Our Lady of Lourdes Hospital",
    },
    {
      label: "Quirino Memorial Medical Center",
      value: "Quirino Memorial Medical Center",
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={GS.h1}>Schedule Appointment</Text>
        <Description description="Feel free to select a date and time that’s most convenient for you!" />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.header}>Preferred Hospital</Text>
        <DropDownPicker
          open={open}
          value={selectedHospital}
          items={hospitals}
          setOpen={setOpen}
          setValue={setSelectedHospital}
          placeholder="Select a hospital"
          style={styles.inputContainer}
          labelStyle={styles.inputLabel}
        />

        <Text style={styles.header}>Preferred Date</Text>
        <TouchableOpacity
          onPress={toggleDatePicker}
          style={styles.inputContainer}
        >
          <Text style={styles.inputLabel}>
            {selectedDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        <Text style={styles.header}>Preferred Time</Text>
        <TouchableOpacity
          onPress={toggleTimePicker}
          style={styles.inputContainer}
        >
          <Text style={styles.inputLabel}>
            {selectedTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedTime}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={handleTimeChange}
          />
        )}
      </View>
      {/* Modal for success message */}
      <SingleBtnModal
        visible={showModal}
        onRequestClose={handleCloseModal}
        onPress={handleCloseModal}
        title="Success!"
        description="Please show the code included in this message to the hospital staff
            to confirm your attendance."
        btnLabel="I Understand"
      >
        <View
          style={{
            backgroundColor: COLORS.white,
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
              fontWeight: "bold",
              fontSize: 28,
              color: COLORS.primary,
            }}
          >
            {ticketNumber}
          </Text>
        </View>
      </SingleBtnModal>
    </View>
  );
});

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
  dateText: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  contentContainer: { flex: 1, flexDirection: "column", gap: 8 },
  inputContainer: {
    width: "100%",
    height: MINOR_COMPONENT_HEIGHT,
    padding: SIZES.xSmall,
    borderWidth: 1,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.gray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SIZES.xxxSmall,
  },
  inputLabel: {
    textTransform: "capitalize",
    backgroundColor: COLORS.white,
    paddingHorizontal: 4,
    borderRadius: 50,
  },
});
export default ScheduleAppointmentScreen;
