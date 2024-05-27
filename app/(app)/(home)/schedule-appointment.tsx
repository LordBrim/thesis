import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
// import { Picker } from "@react-native-picker/picker"; not used delete this after final build
import React, { useState, useRef } from "react";
import Title from "components/common/texts/Title";
import Description from "components/common/texts/Description";
import CallToActionBtn from "components/common/CallToActionBtn";
import { router } from "expo-router";
import StepsIndicator from "components/common/StepsIndicator";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES } from "../../../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
// import WheelPicker from "react-native-wheel-picker-android"; remove this after final build not working
import { firestoreOperations } from "firestore-services";
import { getAuth } from "firebase/auth";
import { generateUniqueTicketCode } from "../../../utils/helperFunction";
export default function ScheduleAppointmentScreen() {
  const cancel = () => {
    router.replace("(app)/(tabs)/index");
  };
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  // State for selected hospital
  const [selectedHospital, setSelectedHospital] = useState(null);

  // State for selected date
  const labels = [
    "Preliminary Checklist",
    "Schedule Appointment",
    "Appointment Confimation",
  ];

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
  const handleModalClose = () => {
    setShowModal(false);
    router.push("(app)/(home)/schedule-appointment");
  };

  const handleNextButtonPress = async () => {
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
        // Create the data object to store in Firestore
        const ticketData = {
          selectedHospital,
          selectedDate: formattedDate, // Date as string
          selectedTime: formattedTime, // Time as string
          userEmail: user.email,
          userUID: user.uid,
          ticketNumber: ticketCode,
          status: "pending",
        };
        await firestoreOperations.createDocument("ticketRequest", ticketData);

        console.log("Ticket request saved successfully!");
        setShowModal(true);
        setTicketNumber(ticketData.ticketNumber);
      } catch (error) {
        console.error("Error saving ticket request:", error);
      }
    } else {
      console.log("No user is signed in.");
    }
  };

  const hospitals = [
    { label: "UERM Hospital", value: "UERM Hospital" },
    {
      label: "De los Santos Medical Center",
      value: "De los Santos Medical Center",
    },
    {
      label: "Our Lady of Lourder Hospital",
      value: "Our Lady of Lourder Hospital",
    },
    {
      label: "Quirino Memorial Medical Center",
      value: "Quirino Memorial Medical Center",
    },
  ];

  // State for selected time (hour and minute)

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };
  return (
    <View style={styles.container}>
      <StepsIndicator labels={labels} />
      <View>
        <Title title="Schedule Appointment" />
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
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#cccccc",
            borderWidth: 1,
            borderRadius: 8,
          }}
        />

        <Text style={styles.header}>Preferred Date</Text>
        <TouchableOpacity onPress={toggleDatePicker}>
          <Text style={styles.dateText}>
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

        <View>
          <Text style={styles.header}>Preferred Time</Text>
          <TouchableOpacity onPress={toggleTimePicker}>
            <Text style={styles.dateText}>
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
      </View>
      {/* Modal for success message */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalText, styles.modalHeader]}>Success!</Text>
            <Text style={styles.modalText}>
              Please show the code included in this message to the hospital
              staff to confirm your attendance.
            </Text>
            <Text style={[styles.modalText, styles.modalCodeText]}>
              Here's your code:{" "}
              <Text style={styles.modalCode}>{ticketNumber}</Text>
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.fixed}>
        <CallToActionBtn
          label="cancel"
          onPress={() => cancel}
          style={{ flex: 1 }}
          secondary
        />
        <CallToActionBtn
          label="next"
          onPress={handleNextButtonPress}
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
  dateText: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  contentContainer: { flex: 1, flexDirection: "column", gap: 8 },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalSubtext: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalCodeText: {
    fontSize: 16,
    marginBottom: 10,
    color: "red",
  },
  modalCode: {
    fontWeight: "bold",
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
