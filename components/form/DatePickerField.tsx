import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "react-native-vector-icons";

const DatePickerField = ({ label, date, onDateChange }) => {
  const [show, setShow] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (currentDate.getTime() !== date.getTime()) {
      setShow(false);
      onDateChange(currentDate);
    } else {
      setShow(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dateContainer}>
        <Ionicons name="calendar" size={30} onPress={() => setShow(true)} />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Text>{date.toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DatePickerField;
