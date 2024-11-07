import React, { useState } from "react";
import { COLORS } from "../../constants";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioGroup from "react-native-radio-buttons-group";
import Checkbox from "expo-checkbox";

const ChecklistItem = ({ question, onAnswerChange, index }) => {
  const [answer, setAnswer] = useState(null);
  const [textInputValue, setTextInputValue] = useState(""); // State for text input value
  const [open, setOpen] = useState(false); // Track dropdown open state
  const [value, setValue] = useState([]); // Initialize value as an empty array
  const [items, setItems] = useState(
    question.options
      ? question.options.map((option) => ({ label: option, value: option }))
      : []
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const handleAnswerChange = (value) => {
    setAnswer(value);
    if (question.type !== "condionalText" || value === "No") {
      onAnswerChange(question.id, value);
    }
  };

  const handleTextInputChange = (text) => {
    setTextInputValue(text);
    onAnswerChange(question.id, text);
  };

  const renderInput = () => {
    switch (question.type) {
      case "text":
        return (
          <TextInput
            style={styles.input}
            placeholder="Enter your answer"
            onChangeText={(text) => handleAnswerChange(text)}
          />
        );
      case "condionalText":
      case "yesNo":
        return (
          <View style={styles.radioGroupContainer}>
            <RadioGroup
              radioButtons={[
                {
                  id: "yes",
                  label: "Yes",
                  value: "Yes",
                  color: selectedId === "yes" ? COLORS.black : undefined,
                  labelStyle:
                    selectedId === "yes"
                      ? { fontWeight: "bold", color: COLORS.black }
                      : undefined,
                },
                {
                  id: "no",
                  label: "No",
                  value: "No",
                  color: selectedId === "no" ? COLORS.black : undefined,
                  labelStyle:
                    selectedId === "no"
                      ? { fontWeight: "bold", color: COLORS.black }
                      : undefined,
                },
              ]}
              onPress={(selectedId: string) => {
                const selectedButton = [
                  {
                    id: "yes",
                    label: "Yes",
                    value: "Yes",
                    selected: selectedId === "yes",
                  },
                  {
                    id: "no",
                    label: "No",
                    value: "No",
                    selected: selectedId === "no",
                  },
                ].find((button) => button.selected);
                if (selectedButton) {
                  handleAnswerChange(selectedButton.value);
                  setSelectedId(selectedButton.id);
                }
              }}
              selectedId={selectedId}
              layout="column"
              containerStyle={styles.radioGroup}
            />
          </View>
        );

      case "date":
        return (
          <View>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {answer ? answer.toDateString() : "Select a date"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={answer || new Date()}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) handleAnswerChange(date);
                }}
              />
            )}
          </View>
        );
      case "dropdown":
        return (
          <View style={styles.checkboxGroupContainer}>
            {items.map((item) => (
              <View key={item.value} style={styles.checkboxContainer}>
                <Checkbox
                  value={value.includes(item.value)}
                  onValueChange={(isChecked) => {
                    const newValue = isChecked
                      ? [...value, item.value]
                      : value.filter((v) => v !== item.value);
                    setValue(newValue);
                    handleAnswerChange(newValue);
                  }}
                  color={
                    value.includes(item.value) ? COLORS.primary : undefined
                  }
                />
                <Text
                  style={[
                    styles.checkboxLabel,
                    value.includes(item.value) && {
                      fontWeight: "bold",
                      color: COLORS.primary,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { zIndex: 1000 - index }]}>
      <Text style={styles.question}>{`${index + 1}. ${
        question.question
      }`}</Text>
      {renderInput()}
      {question.type === "condionalText" && answer === "Yes" && (
        <>
          <Text style={styles.questionInput}>List all medication here:</Text>
          <TextInput
            style={styles.input}
            placeholder="Please enter all medicine"
            value={textInputValue}
            onChangeText={handleTextInputChange}
          />
        </>
      )}
      {question.type === "dropdown" && answer?.includes("Others") && (
        <>
          <Text style={styles.questionInput}>
            List other medical condition/s here:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Please enter all medicine"
            value={textInputValue}
            onChangeText={handleTextInputChange}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    position: "relative", // Ensure the stacking works correctly
    zIndex: 1, // Default lower zIndex
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  questionInput: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    top: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedButtonText: {
    color: COLORS.background,
  },
  dateButton: {
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#007BFF",
  },
  dropdownWrapper: {
    zIndex: 1000, // Ensure dropdown has the highest zIndex
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderColor: "#ccc",
    zIndex: 1000, // Ensure the dropdown container appears above other elements
  },
  radioGroupContainer: {
    alignItems: "flex-start", // Align items to the left
  },
  radioGroup: {
    alignItems: "flex-start", // Align items to the left
    justifyContent: "flex-start", // Ensure proper alignment
  },
  checkboxGroupContainer: {
    alignItems: "flex-start", // Align items to the left
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});

export default ChecklistItem;
