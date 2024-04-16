import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

const RadioGroupField = ({ label, options, value, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    onValueChange(newValue);
  };

  return (
    <View>
      <Text>{label}</Text>
      <RadioButton.Group
        onValueChange={handleValueChange}
        value={selectedValue}
      >
        {options.map((option, index) => (
          <View key={index}>
            <Text>{option}</Text>
            <RadioButton value={option} />
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );
};

export default RadioGroupField;
