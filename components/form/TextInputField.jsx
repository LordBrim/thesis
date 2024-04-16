import { COLORS } from "../../constants/theme";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export const TextInputField = ({ field, handleInputChange, width = "95%" }) => {
  const [inputValue, setInputValue] = useState("");
  const isPassword = field.type === "password";
  const isEmail = field.type === "email";
  const keyboardType = isEmail ? "email-address" : "default";

  const handleChangeText = (text) => {
    setInputValue(text); // Update the inputValue state
    handleInputChange(field.name, text);
  };

  const styles = StyleSheet.create({
    inputContainer: {
      // Add your styles here
      width: width,
    },
    input: {
      borderColor: COLORS.gray,
      borderWidth: 1,
      borderRadius: 5,
      padding: 3,
    },
  });

  return (
    <View style={styles.inputContainer}>
      <Text
        style={{
          fontFamily: "Raleway_500Medium",
          fontStyle: "italic",
          fontSize: 16,
          color: COLORS.redWhite,
        }}
      >
        {field.title}
      </Text>
      <TextInput
        style={styles.input}
        secureTextEntry={isPassword}
        keyboardType={keyboardType}
        onChangeText={handleChangeText} // Use the new handleChangeText function
        placeholder={field.title}
      />
      <Text>{inputValue}</Text>
    </View>
  );
};
