import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputContainer: {
    // Add your styles here
  },
  input: {
    // Add your styles here
  },
});

export const TextInputField = ({ field, handleInputChange }) => {
  const [inputValue, setInputValue] = useState(""); // Add this line
  const isPassword = field.type === "password";
  const isEmail = field.type === "email";
  const keyboardType = isEmail ? "email-address" : "default";

  const handleChangeText = (text) => {
    setInputValue(text); // Update the inputValue state
    handleInputChange(field.name, text);
  };

  return (
    <View style={styles.inputContainer}>
      <Text>{field.title}</Text>
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
