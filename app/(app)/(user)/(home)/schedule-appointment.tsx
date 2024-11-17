import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import Description from "components/common/texts/Description";
import {
  HORIZONTAL_SCREEN_MARGIN,
  COLORS,
  SIZES,
  GS,
} from "../../../../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { MINOR_COMPONENT_HEIGHT } from "constants/measurements";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import Ionicons from "@expo/vector-icons/Ionicons";

const ScheduleAppointmentScreen = forwardRef(({ updateAnswers }, ref) => {
  const getMinimumDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  };

  const [openHospital, setOpenHospital] = useState(false);
  const [openTimeBlock, setOpenTimeBlock] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getMinimumDate());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTimeBlock, setSelectedTimeBlock] = useState(null);
  const [alertModalVisible, setAlertModalVisible] = useState(false);

  const timeBlocks = [
    { label: "10:00 AM - 10:30 AM", value: "10:00 AM" },
    { label: "10:30 AM - 11:00 AM", value: "10:30 AM" },
    { label: "11:00 AM - 11:30 AM", value: "11:00 AM" },
    { label: "11:30 AM - 12:00 PM", value: "11:30 AM" },
    { label: "12:00 PM - 12:30 PM", value: "12:00 PM" },
    { label: "12:30 PM - 1:00 PM", value: "12:30 PM" },
    { label: "1:00 PM - 1:30 PM", value: "1:00 PM" },
    { label: "1:30 PM - 2:00 PM", value: "1:30 PM" },
    { label: "2:00 PM - 2:30 PM", value: "2:00 PM" },
    { label: "2:30 PM - 3:00 PM", value: "2:30 PM" },
    { label: "3:00 PM - 3:30 PM", value: "3:00 PM" },
    { label: "3:30 PM - 4:00 PM", value: "3:30 PM" },
    { label: "4:00 PM - 4:30 PM", value: "4:00 PM" },
    { label: "4:30 PM - 5:00 PM", value: "4:30 PM" },
  ];

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setSelectedDate(currentDate);
    setShowDatePicker(false);
  };

  const handleNextButtonPress = (answers) => {
    console.log("Received answers:", answers); // Log the received answers

    if (!selectedHospital || !selectedDate || !selectedTimeBlock) {
      setAlertModalVisible(true);
      return;
    }

    const formattedDate = selectedDate.toISOString().slice(0, 10);

    console.log("Formatted Date:", formattedDate); // Log the formatted date
    console.log("Selected Hospital:", selectedHospital); // Log the selected hospital
    console.log("Selected Time Block:", selectedTimeBlock); // Log the selected time block

    // Update answers state in DonateScreen
    updateAnswers("appointmentDate", formattedDate);
    updateAnswers("appointmentTime", selectedTimeBlock);
    updateAnswers("selectedHospital", selectedHospital);
  };

  const updateAnswersState = () => {
    handleNextButtonPress();
  };

  const isValid = () => {
    return selectedHospital && selectedDate && selectedTimeBlock;
  };

  useImperativeHandle(ref, () => ({
    handleNextButtonPress,
    updateAnswersState,
    isValid,
  }));

  const hospitals = [
    { label: "UERM Hospital", value: "UERM Hospital" },
    {
      label: "ACE Medical Center Mandaluyong",
      value: "ACE Medical Center Mandaluyong",
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
          open={openHospital}
          value={selectedHospital}
          items={hospitals}
          setOpen={setOpenHospital}
          setValue={setSelectedHospital}
          placeholder="Select a hospital"
          style={styles.inputContainer}
          labelStyle={styles.inputLabel}
          textStyle={styles.inputLabel}
          onOpen={() => setOpenTimeBlock(false)} // Close time block drop-down when hospital drop-down is opened
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
            minimumDate={getMinimumDate()}
          />
        )}

        <Text style={styles.header}>Preferred Time</Text>
        <DropDownPicker
          open={openTimeBlock}
          value={selectedTimeBlock}
          items={timeBlocks}
          setOpen={setOpenTimeBlock}
          setValue={setSelectedTimeBlock}
          placeholder="Select a time block"
          style={styles.inputContainer}
          labelStyle={styles.inputLabel}
          textStyle={styles.inputLabel}
          onOpen={() => setOpenHospital(false)} // Close hospital drop-down when time block drop-down is opened
        />
      </View>

      <SingleBtnModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onPress={() => setModalVisible(false)}
        title="Invalid Time"
        icon={
          <Ionicons name="information-circle-outline" size={42} color="black" />
        }
        animation={true}
        btnLabel="OK"
        description="Please select a time between 10 AM and 5 PM."
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
    gap: 12,
  },
  header: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontFamily: "Poppins_600SemiBold",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    fontFamily: "Poppins_400Regular",
  },
  inputContainer: {
    width: "100%",
    height: MINOR_COMPONENT_HEIGHT,
    padding: SIZES.xSmall,
    borderWidth: 1,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.grayDark,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SIZES.xSmall,
    fontFamily: "Poppins_400Regular",
  },
  inputLabel: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 4,
    borderRadius: 50,
    fontFamily: "Poppins_400Regular",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    fontFamily: "Poppins_400Regular",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
});

export default ScheduleAppointmentScreen;
