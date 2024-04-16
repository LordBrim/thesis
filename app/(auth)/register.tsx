import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import { TextInputField } from "../../components/form/TextInputField";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { RadioGroup, CheckBox } from "react-native-btr";
import { Ionicons } from "react-native-vector-icons";
import DropdownPickerField from "../../components/form/DropdownPicker";
import RadioGroupField from "../../components/form/RadioGroupField";

export default function Register() {
  const [form, setForm] = useState({});
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [radioValue, setRadioValue] = useState(null);

  const handleInputChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Register an account</Text>
      <TextInputField
        field={{ title: "Email", name: "email", type: "email" }}
        handleInputChange={handleInputChange}
      />
      <TextInputField
        field={{ title: "Password", name: "password", type: "password" }}
        handleInputChange={handleInputChange}
      />
      <Ionicons name="calendar" size={30} onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Text>{date.toLocaleDateString()}</Text>
      <DropdownPickerField
        label="Civil Status"
        items={["Single", "Married", "Divorced"]}
        value={dropdownValue}
        onValueChange={setDropdownValue}
      />
      <DropdownPickerField
        label="Blood Type"
        items={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
        value={dropdownValue}
        onValueChange={setDropdownValue}
      />
      <RadioGroupField
        label="Gender"
        options={["Male", "Female", "Other"]}
        value={radioValue}
        onValueChange={setRadioValue}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    margin: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
});
