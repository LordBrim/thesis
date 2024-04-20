import React, { useState } from "react";
import { Link } from "expo-router";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { TextInputField } from "../../components/form/TextInputField";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { RadioGroup, CheckBox } from "react-native-btr";
import { Ionicons } from "react-native-vector-icons";
import DropdownPickerField from "../../components/form/DropdownPicker";
import CustomDropdown from "../../components/form/CustomDropdown";
import RadioGroupField from "../../components/form/RadioGroupField";
import { COLORS, FONT, SIZES } from "../../constants/theme";

export default function Register() {
  const [form, setForm] = useState({});
  const [toggleTerms, setToggleTerms] = useState(false);
  const [toggleAlerts, setToggleAlerts] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (name, value) => {
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleToggleTerms = () => {
    setToggleTerms(!toggleTerms);
  };
  const handleToggleAlerts = () => {
    setToggleAlerts(!toggleAlerts);
  };
  function validateEmailAndPassword(email, password, confirmPassword) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return console.log("Invalid email.");
    }

    if (password !== confirmPassword) {
      return console.log("Passwords do not match.");
    }

    return console.log("Valid email and password.");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginTop: 30,
          }}
        >
          <Text
            style={{
              fontSize: SIZES.xxxLarge,
              fontWeight: "900",
              textTransform: "uppercase",
              color: COLORS.primary,
            }}
          >
            Lifeline
          </Text>
          <Image
            style={{ width: 50, height: 50, borderRadius: 100 }}
            source={require("../../assets/splash/icon.png")}
          />
        </View>
        <Text
          style={{
            fontSize: SIZES.xLarge,
            fontWeight: "bold",
            fontFamily: FONT.BakbakOne,
            marginTop: 20,
          }}
        >
          Register an <Text style={{ color: COLORS.redWhite }}> Account</Text>
        </Text>

        <TextInputField
          field={{ title: "Email", name: "email", type: "email" }}
          handleInputChange={handleInputChange}
        />
        <TextInputField
          field={{ title: "Password", name: "password", type: "password" }}
          handleInputChange={handleInputChange}
        />
        <TextInputField
          field={{
            title: "Confirm Password",
            name: "confirmPassword",
            type: "password",
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
              justifyContent: "center",
              marginTop: 30,
              marginBottom: 20,
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
        </View>

        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.formCta}
            onPress={() =>
              validateEmailAndPassword(email, password, confirmPassword)
            }
          >
            <Text style={styles.formCtaText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.signUpWith}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              - Or sign up with -
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Link asChild href="/(tabs)">
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    padding: 10,
                    borderColor: COLORS.red,
                  }}
                >
                  <Ionicons name="logo-google" size={30} color={COLORS.red} />
                </TouchableOpacity>
              </Link>
              <Link asChild href="/(tabs)">
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    padding: 10,
                    borderColor: COLORS.red,
                  }}
                >
                  <Ionicons name="logo-facebook" size={30} color={COLORS.red} />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  inputContainer: {
    margin: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  signUpWith: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: SIZES.xSmall,
    padding: SIZES.xSmall,
    width: "100%",
    borderTopWidth: 1,
    borderColor: COLORS.gray,
    marginTop: SIZES.xLarge,
  },
  formCta: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: SIZES.medium,
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xSmall,
  },
  formCtaText: {
    fontSize: SIZES.medium,
    textTransform: "capitalize",
    color: COLORS.white,
  },
});
