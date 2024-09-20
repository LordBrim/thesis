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
import DropDownPicker from "react-native-dropdown-picker";

const ChecklistItem = ({ question, onAnswerChange, index }) => {
  const [answer, setAnswer] = useState(null);
  const [textInputValue, setTextInputValue] = useState(""); // State for text input value
  const [open, setOpen] = useState(false); // Track dropdown open state
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(
    question.options
      ? question.options.map((option) => ({ label: option, value: option }))
      : []
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, answer === "Yes" && styles.selectedButton]}
              onPress={() => handleAnswerChange("Yes")}
            >
              <Text
                style={[
                  styles.buttonText,
                  answer === "Yes" && styles.selectedButtonText,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, answer === "No" && styles.selectedButton]}
              onPress={() => handleAnswerChange("No")}
            >
              <Text
                style={[
                  styles.buttonText,
                  answer === "No" && styles.selectedButtonText,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
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
          <View style={[styles.dropdownWrapper, { zIndex: 1000 - index }]}>
            <DropDownPicker
              open={open}
              multiple={true}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select an option"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              onChangeValue={(value) => handleAnswerChange(value)}
              zIndex={1000} // Ensure the dropdown itself has a higher zIndex
              dropDownDirection="TOP"
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { zIndex: 1000 - index }]}>
      <Text style={styles.question}>{question.question}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
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
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: COLORS.redTop,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedButtonText: {
    color: COLORS.white,
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
});

export default ChecklistItem;
