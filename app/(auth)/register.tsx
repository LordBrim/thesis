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
import CustomDropdown from "../../components/form/CustomDropdown";
import RadioGroupField from "../../components/form/RadioGroupField";
import { COLORS, FONT } from "../../constants/theme";

export default function Register() {
  const [form, setForm] = useState({});
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [radioValue, setRadioValue] = useState(null);
  const [toggleTerms, setToggleTerms] = useState(false);
  const [toggleAlerts, setToggleAlerts] = useState(false);

  const [bloodTypeValue, setBloodTypeValue] = useState(null);
  const [civilStatusValue, setCivilStatusValue] = useState(null);
  const [nationalityValue, setNationalityValue] = useState(null);

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
  const handleToggleTerms = () => {
    setToggleTerms(!toggleTerms);
  };
  const handleToggleAlerts = () => {
    setToggleAlerts(!toggleAlerts);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: FONT.BakbakOne,
          }}
        >
          Register an <Text style={{ color: COLORS.redWhite }}> Account</Text>
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TextInputField
            width="45%"
            field={{
              title: "First Name",
              name: "First Name",
              type: "First Name",
            }}
            handleInputChange={handleInputChange}
          />
          <TextInputField
            width="45%"
            field={{ title: "Last Name", name: "Last Name", type: "Last Name" }}
            handleInputChange={handleInputChange}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TextInputField
            width="45%"
            field={{
              title: "Middle Name",
              name: "Middle Name",
              type: "Middle Name",
            }}
            handleInputChange={handleInputChange}
          />
          <TextInputField
            width="45%"
            field={{
              title: "Username",
              name: "Username",
              type: "Username",
            }}
            handleInputChange={handleInputChange}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "45%",
            }}
          >
            <Text
              style={{
                fontFamily: "Raleway_500Medium",
                fontStyle: "italic",
                fontSize: 16,
                color: COLORS.redWhite,
              }}
            >
              Date of Birth
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: COLORS.gray,
                borderRadius: 5,
                padding: 3,
              }}
            >
              <Text style={{ marginRight: 8 }}>
                {date ? date.toLocaleDateString() : "MM/DD/YYYY"}
              </Text>
              <Ionicons
                name="calendar"
                size={30}
                onPress={() => setShow(true)}
                color={COLORS.gray}
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date || new Date()}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>
          <CustomDropdown
            label="Blood Type"
            items={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
            value={bloodTypeValue}
            onValueChange={(value) => {
              setBloodTypeValue(value);
              handleInputChange("bloodType", value);
            }}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <CustomDropdown
            label="Civil Status"
            items={["Single", "Married", "Divorced"]}
            value={civilStatusValue}
            onValueChange={(value) => {
              setCivilStatusValue(value);
              handleInputChange("civilstatus", value);
            }}
          />
          <CustomDropdown
            label="Nationality"
            items={[
              "Filipino",
              "American",
              "Japanese",
              "Chinese",
              "Korean",
              "Indian",
              "Others",
            ]}
            value={nationalityValue}
            onValueChange={(value) => {
              setNationalityValue(value);
              handleInputChange("nationality", value);
            }}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TextInputField
            width="45%"
            field={{ title: "Email", name: "email", type: "email" }}
            handleInputChange={handleInputChange}
          />
          <RadioGroupField
            label="Gender"
            options={["Male", "Female"]}
            value={radioValue}
            onValueChange={setRadioValue}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <TextInputField
            field={{
              title: "Home Adrress",
              name: "Home Adrress",
              type: "Home Adrress",
            }}
            handleInputChange={handleInputChange}
          />
          <TextInputField
            field={{ title: "Password", name: "password", type: "password" }}
            handleInputChange={handleInputChange}
          />
          <TextInputField
            field={{
              title: "Confirm Password",
              name: "Confirm password",
              type: "Confirm password",
            }}
            handleInputChange={handleInputChange}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignContent: "center",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <CheckBox
                checked={toggleTerms}
                color="#FF3642"
                borderRadius={3}
                onPress={() => handleToggleTerms()}
              />
              <Text style={{ fontSize: 17 }}>
                Accept{" "}
                <Text
                  style={{ color: COLORS.red, textDecorationLine: "underline" }}
                >
                  Terms and Conditions?
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignContent: "center",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <CheckBox
                checked={toggleAlerts}
                color="#FF3642"
                borderRadius={3}
                onPress={() => handleToggleAlerts()}
              />
              <Text style={{ fontSize: 17 }}>
                Recieve{" "}
                <Text style={{ color: COLORS.red }}>
                  Notifications and Emails?
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Button
              title="Next"
              onPress={() => console.log("Form Submitted", form)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
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
