import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const DropdownPickerField = ({ label, items, value, onValueChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleValueChange = (newValue) => {
    if (newValue !== selectedValue) {
      setOpen(false);
      setSelectedValue(newValue);
      onValueChange(newValue);
    }
  };

  const handleOpen = (isOpen) => {
    setOpen(isOpen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <DropDownPicker
        items={items.map((item) => ({
          label: item,
          value: item,
        }))}
        onChangeValue={handleValueChange}
        style={styles.dropdown}
        labelStyle={styles.dropdownLabel}
        multiple={false}
        value={selectedValue}
        setValue={setSelectedValue}
        open={open}
        setOpen={handleOpen}
      />
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
  dropdown: {
    backgroundColor: "#fafafa",
  },
  dropdownLabel: {
    fontSize: 14,
    textAlign: "left",
    color: "#000",
  },
});

export default DropdownPickerField;
