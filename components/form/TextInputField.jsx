import { COLORS, SIZES } from "../../constants/theme";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export const TextInputField = ({ field, handleInputChange }) => {
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
    },
    input: {
      borderColor: COLORS.gray,
      borderWidth: 1,
      borderRadius: SIZES.xSmall,
      padding: 5,
      height: 50,
    },
  });

  return (
    <View style={styles.inputContainer}>
      <Text
        style={{
          fontFamily: "Raleway_500Medium",
          fontSize: 16,
          fontWeight: "bold",
          marginVertical: 10,
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
    </View>
  );
};
