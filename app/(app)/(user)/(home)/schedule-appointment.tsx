import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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

const ScheduleAppointmentScreen = forwardRef(({ updateAnswers }, ref) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

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

  const handleNextButtonPress = (answers) => {
    console.log("Received answers:", answers); // Log the received answers

    if (!selectedHospital) {
      alert("Please select a hospital.");
      return;
    }

    const formattedDate = selectedDate.toISOString().slice(0, 10);
    const formattedTime = selectedTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    console.log("Formatted Date:", formattedDate); // Log the formatted date
    console.log("Formatted Time:", formattedTime); // Log the formatted time
    console.log("Selected Hospital:", selectedHospital); // Log the selected hospital

    // Update answers state in DonateScreen
    updateAnswers("appointmentDate", formattedDate);
    updateAnswers("appointmentTime", formattedTime);
    updateAnswers("selectedHospital", selectedHospital);
  };

  const updateAnswersState = () => {
    handleNextButtonPress();
  };

  useImperativeHandle(ref, () => ({
    handleNextButtonPress,
    updateAnswersState,
  }));

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
    fontWeight: "600",
  },
  contentContainer: { flex: 1, flexDirection: "column", gap: 8 },
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
  },
  inputLabel: {
    textTransform: "capitalize",
    backgroundColor: COLORS.background,
    paddingHorizontal: 4,
    borderRadius: 50,
  },
});

export default ScheduleAppointmentScreen;
