import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { COLORS } from "../../constants/theme";
const RadioGroupField = ({ label, options, value, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    onValueChange(newValue);
  };

  return (
    <View style={{ width: "45%" }}>
      <Text
        style={{
          fontFamily: "Raleway_500Medium",
          fontStyle: "italic",
          fontSize: 16,
          color: COLORS.redWhite,
        }}
      >
        {label}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <RadioButton.Group
          onValueChange={handleValueChange}
          value={selectedValue}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {options.map((option, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  alignContent: "space-between",
                }}
              >
                <Text>{option}</Text>
                <RadioButton value={option} />
              </View>
            ))}
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
};

export default RadioGroupField;
