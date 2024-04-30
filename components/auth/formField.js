import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioGroup } from "react-native-btr";
import { Ionicons } from "react-native-vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const FormField = ({
  field,
  form,
  handleInputChange,
  date,
  show,
  setShow,
  open,
  setOpen,
  handleDateChange,
}) => {
  const [selectedValue, setSelectedValue] = useState({});

  if (!field) {
    return null;
  }

  switch (field.type) {
    case "text":
    case "password":
      return (
        <View style={styles.inputContainer}>
          <Text>{field.title}</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={field.type === "password"}
            onChangeText={(text) => handleInputChange(field.name, text)}
            placeholder={field.title}
          />
        </View>
      );
    case "date":
      return (
        <View>
          <Ionicons name="calendar" size={30} onPress={() => setShow(true)} />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Text>{date.toLocaleDateString()}</Text>
        </View>
      );
    case "dropdown":
      return (
        <View style={{ margin: 40 }}>
          <Text>{field.title}</Text>
          <DropDownPicker
            items={[
              { label: "Item 1", value: "item1" },
              { label: "Item 2", value: "item2" },
            ]}
            onChangeValue={(value) =>
              setSelectedValue((prevSelectedValue) => {
                if (prevSelectedValue[field.name] === value) {
                  return prevSelectedValue;
                }
                return { ...prevSelectedValue, [field.name]: value };
              })
            }
            style={{ backgroundColor: "#fafafa", zIndex: 1000 }}
            labelStyle={{ fontSize: 14, textAlign: "left", color: "#000" }}
            multiple={false}
            value={selectedValue[field.name]}
            open={open[field.name]}
            setOpen={(isOpen) =>
              setOpen((prevOpen) => ({
                ...prevOpen,
                [field.name]: isOpen,
              }))
            }
          />
        </View>
      );
    case "radio":
      return (
        <View style={styles.inputContainer}>
          <Text>{field.title}</Text>
          <RadioGroup
            radioButtons={field.options.map((option, index) => ({
              id: `${index}`,
              label: option,
              value: option,
            }))}
            onPress={(value) => handleInputChange(field.name, value)}
            value={form[field.name]}
          />
        </View>
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default FormField;
