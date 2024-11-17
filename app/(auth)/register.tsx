import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import RadioButton from "components/common/RadioButton";
import axios from "axios";
import { CheckBox } from "react-native-btr";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SIZES, COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import TextInputWrapper from "../../components/common/TextInputWrapper";
import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";
import { firestoreOperations } from "../../firestore-services";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CallToActionBtn from "../../components/common/CallToActionBtn";
import LinkBtn from "components/common/LinkBtn";
import { Dimensions } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import moment from "moment";
import { collection, query, where, getDocs } from "firebase/firestore";
export default function RegisterScreen() {
  const pToggle = useTogglePasswordVisibility();
  const cpToggle = useTogglePasswordVisibility();
  const [sex, setSex] = useState("");

  const [email, setEmail] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [toggleTerms, setToggleTerms] = useState(false);
  const [toggleAlerts, setToggleAlerts] = useState(false);
  const [userAge, setUserAge] = useState(0);
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const today = new Date();

  const [date, setDate] = useState(
    new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
  );
  const [show, setShow] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const fbAuth = FIREBASE_AUTH;
  const [verifiedEmail, setVerifiedEmail] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };
  const sendOTP = async (email) => {
    if (!isValidEmail(email)) {
      setModalTitle("Invalid Email");
      setModalDescription("Please enter a valid email address.");
      setModalVisible(true);
      return;
    }
    const API_KEY = "d1440a571533e6c003ef72358ff55e5a-f6fe91d3-6d5fa136";
    const DOMAIN = "lifeline-ph.tech";

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

    const data = new URLSearchParams({
      from: "Lifeline Support <support@lifeline.com>",
      to: email,
      subject: "Your Lifeline OTP Code",
      text: `Your OTP code is: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333;">Lifeline Verification Code</h2>
          <p style="color: #555;">Dear User,</p>
          <p style="color: #555;">Thank you for registering with Lifeline. To complete your registration, please use the following One-Time Password (OTP) to verify your email address:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; padding: 10px 20px; font-size: 24px; color: #fff; background-color: #007bff; border-radius: 5px;">${otp}</span>
          </div>
          <p style="color: #555;">If you did not request this code, please ignore this email.</p>
          <p style="color: #555;">Best regards,<br/>The Lifeline Team</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #aaa; font-size: 12px; text-align: center;">This is an automated message, please do not reply.</p>
        </div>
      `,
    });

    try {
      const response = await axios.post(
        `https://api.mailgun.net/v3/${DOMAIN}/messages`,
        data,
        {
          auth: {
            username: "api",
            password: API_KEY,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("OTP sent successfully:", response.data);
      setOtpCode(otp.toString());
      setOtpSent(true);
      setShowModalEmail(true);
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleButtonPress = async () => {
    if (otpSent) {
      // Handle OTP verification logic here
      if (otpInput === otpCode) {
        console.log("OTP verified successfully:", otpInput);
        setOtpVerified(true);
        setVerifiedEmail(email); // Store the verified email
        setEmailError(""); // Clear any previous email error
      } else {
        console.error("Incorrect OTP entered:", otpInput);
        // Optionally, show an error message to the user
      }
    } else {
      const emailExists = await checkEmailExists(email);
      console.log(`Email ${email} exists:`, emailExists);
      if (emailExists) {
        setEmailError("Email is already registered.");
        console.log("Email is already registered. OTP not sent.");
      } else {
        console.log("Email is not registered. Sending OTP.");
        sendOTP(email);
      }
    }
  };

  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };
  const isValidFullName = (fullName) => {
    const fullNameRegex = /^[a-zA-Z\s]+$/;
    return fullNameRegex.test(fullName) && fullName.trim().length > 0;
  };
  const isValidDateOfBirth = (date) => {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    return date <= eighteenYearsAgo;
  };
  const isValidOTP = (otp) => {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
  };

  const calculateAge = (birthDate) => {
    console.log("calculate" + birthDate);
    return moment().diff(moment(birthDate, "YYYY-MM-DD"), "years");
  };

  const checkEmailExists = async (email) => {
    try {
      const q = query(
        collection(FIRESTORE_DB, "User"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(q);
      console.log(`Documents found for ${email}:`, querySnapshot.size);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedEmail(email);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [email]);

  useEffect(() => {
    const checkEmail = async () => {
      if (isValidEmail(debouncedEmail)) {
        if (await checkEmailExists(debouncedEmail)) {
          setEmailError("Email is already registered.");
        } else if (otpVerified) {
          setEmailError(""); // Clear any previous email error
        } else {
          setEmailError("Email is not registered yet.");
        }
      } else {
        setEmailError("");
      }
    };

    checkEmail();
  }, [debouncedEmail, otpVerified]);

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const register = async () => {
    if (!isValidFullName(fullName)) {
      setModalTitle("Invalid Full Name");
      setModalDescription("Please enter a valid full name.");
      setModalVisible(true);
      return;
    }

    if (!isValidEmail(email)) {
      setModalTitle("Invalid Email");
      setModalDescription("Please enter a valid email address.");
      setModalVisible(true);
      return;
    }

    if (emailError === "Email is already registered.") {
      setModalTitle("Email Already Registered");
      setModalDescription(
        "The email address you entered is already registered."
      );
      setModalVisible(true);
      return;
    }

    if (!isValidPassword(password)) {
      setModalTitle("Weak Password");
      setModalDescription(
        "Password must be at least 8 characters long and include a number and a special character."
      );
      setModalVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setModalTitle("Password Mismatch");
      setModalDescription("Passwords do not match.");
      setModalVisible(true);
      return;
    }

    if (!otpVerified || email !== verifiedEmail) {
      setModalTitle("Email Verification");
      setModalDescription("Please verify your email address.");
      setModalVisible(true);
      return;
    }

    if (!isValidDateOfBirth(date)) {
      setModalTitle("Invalid Date of Birth");
      setModalDescription("You must be at least 18 years old.");
      setModalVisible(true);
      return;
    }

    if (!toggleTerms) {
      setModalTitle("Terms and Conditions");
      setModalDescription(
        "You must agree to the terms and conditions to use the app."
      );
      setModalVisible(true);
      return;
    }
    if (!sex) {
      setModalTitle("Sex is not yet selected");
      setModalDescription(
        "Please select your sex to continue with the registration."
      );
      setModalVisible(true);
      return;
    }
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        fbAuth,
        verifiedEmail, // Use the verified email for registration
        password
      );
      console.log(response);

      const displayName = fullName;

      const formattedDate = date.toISOString().split("T")[0];
      const age = calculateAge(formattedDate);
      console.log(age);
      // Add user data to the Firestore in "User" collection with auto-generated document ID
      const documentData = {
        email: verifiedEmail, // Use the verified email for registration
        displayName: displayName,
        dateOfBirth: formattedDate,
        sex: sex,
        role: "user",
        age: age,
        incentive: 0,
      };

      await firestoreOperations.addDocument(
        "User",
        documentData,
        response.user.uid
      );

      setSuccessModalVisible(true);
    } catch (error) {
      console.log(error);
      alert("Registration Failed:" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTerms = () => {
    setToggleTerms(!toggleTerms);
  };

  const handleToggleAlerts = () => {
    setToggleAlerts(!toggleAlerts);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        overScrollMode="never"
        contentContainerStyle={styles.scrollview}
      >
        <View style={styles.cTop}>
          <View style={{ gap: 12 }}>
            <View style={{ gap: 24 }}>
              <TextInputWrapper label="Full Name">
                <TextInput
                  style={styles.input}
                  value={fullName}
                  placeholder="Enter your full name..."
                  onChangeText={(fullName) => {
                    const filteredName = fullName.replace(/[^a-zA-Z\s]/g, "");
                    setFullName(filteredName);
                  }}
                  autoCapitalize="words"
                  autoCorrect={true}
                  enablesReturnKeyAutomatically
                />
              </TextInputWrapper>
              <TextInputWrapper label="Email">
                <TextInput
                  style={styles.input}
                  value={email}
                  placeholder="Enter your email address..."
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  enablesReturnKeyAutomatically
                  editable={!otpVerified} // Disable the email input field after the OTP is verified
                />
                {emailError ? (
                  <Text style={{ color: "red", marginRight: 10 }}>
                    {emailError}
                  </Text>
                ) : otpVerified ? (
                  <Text style={{ color: "green", marginRight: 10 }}>
                    Email Verified
                  </Text>
                ) : null}
              </TextInputWrapper>
              <SingleBtnModal
                visible={showModalEmail}
                onRequestClose={() => {
                  setShowModalEmail(false);
                }}
                onPress={() => {
                  setShowModalEmail(false);
                }}
                icon={<FontAwesome5 name="envelope" size={40} color="black" />}
                title="Email Sent!"
                description={
                  <Text style={{ textAlign: "justify" }}>
                    We have sent the OTP code to your{" "}
                    <Text
                      style={{
                        fontFamily: "Poppins_700Bold",
                        textAlign: "justify",
                      }}
                    >
                      email address {email}. Please check in the spam folder if
                      you don't see it in your inbox.
                    </Text>
                  </Text>
                }
                btnLabel="Close"
              ></SingleBtnModal>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInputWrapper
                  label="6 Pin Number"
                  customStyle={{ flex: 1 }}
                >
                  <TextInput
                    style={styles.input}
                    value={otpInput}
                    placeholder="Enter your otp..."
                    onChangeText={(otpInput) => setOtpInput(otpInput)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={6}
                    editable={otpSent && !otpVerified} // Disable the OTP input field if OTP is not sent or already verified
                    keyboardType="numeric" // Set the keyboard type to numeric
                  />
                </TextInputWrapper>

                {otpSent ? (
                  <View style={{ margin: 5 }}>
                    <Button
                      title="Resend OTP"
                      onPress={() => {
                        sendOTP(email);
                      }}
                      color={COLORS.primary}
                    />
                  </View>
                ) : null}
                {otpSent ? (
                  <View style={{ margin: 5 }}>
                    <Button
                      color="green"
                      title="Verify OTP"
                      onPress={handleButtonPress}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleButtonPress}
                  >
                    <Ionicons name="send" size={18} color="white" />
                    <Text style={styles.buttonText}>Send OTP</Text>
                  </TouchableOpacity>
                )}
              </View>

              <TextInputWrapper label="Date of Birth">
                <TouchableOpacity style={styles.input} onPress={showDatepicker}>
                  <Text>{moment(date).format("MMMM D, YYYY")}</Text>
                </TouchableOpacity>
              </TextInputWrapper>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  maximumDate={eighteenYearsAgo}
                  minimumDate={new Date(1959, 11, 31)} // December 31, 1959
                />
              )}

              <TextInputWrapper label="Sex">
                <View style={styles.radioContainer}>
                  <RadioButton
                    label="Male"
                    value="male"
                    selected={sex === "male"}
                    onPress={() => setSex("male")}
                  />
                  <RadioButton
                    label="Female"
                    value="female"
                    selected={sex === "female"}
                    onPress={() => setSex("female")}
                  />
                </View>
              </TextInputWrapper>

              <TextInputWrapper label="Password">
                <TextInput
                  style={styles.input}
                  value={password}
                  placeholder="Enter your password..."
                  onChangeText={(password) => setPassword(password)}
                  autoCapitalize="none"
                  autoCorrect={true}
                  enablesReturnKeyAutomatically
                  secureTextEntry={pToggle.passwordVisibility}
                />
                <Pressable
                  onPress={pToggle.handlePasswordVisibility}
                  style={{ paddingRight: 12 }}
                >
                  <Ionicons
                    name={pToggle.rightIcon}
                    size={SIZES.xLarge}
                    color={COLORS.grayDark}
                  />
                </Pressable>
              </TextInputWrapper>
              <TextInputWrapper label="Confirm Password">
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  placeholder="Confirm your password..."
                  onChangeText={(confirmPassword) =>
                    setConfirmPassword(confirmPassword)
                  }
                  autoCapitalize="none"
                  autoCorrect={true}
                  enablesReturnKeyAutomatically
                  secureTextEntry={cpToggle.passwordVisibility}
                />
                <Pressable
                  onPress={cpToggle.handlePasswordVisibility}
                  style={{ paddingRight: 12 }}
                >
                  <Ionicons
                    name={cpToggle.rightIcon}
                    size={SIZES.xLarge}
                    color={COLORS.grayDark}
                  />
                </Pressable>
              </TextInputWrapper>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <CheckBox
                checked={toggleTerms}
                color="#FF3642"
                borderRadius={3}
                onPress={() => handleToggleTerms()}
              />
              <View style={{ flexDirection: "row" }}>
                <Text>Accept </Text>
                <LinkBtn
                  label="Terms and Conditions"
                  href="/(aux)/terms-and-conditions"
                  underline
                />
                <Text>?</Text>
              </View>
            </View>
            <View style={{ margin: 50 }}>
              <CallToActionBtn label="Register" onPress={() => register()} />
            </View>
          </View>
        </View>
      </ScrollView>

      <SingleBtnModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onPress={() => setModalVisible(false)}
        title={modalTitle}
        description={modalDescription}
        btnLabel="Close"
      />
      <SingleBtnModal
        visible={successModalVisible}
        animation={true}
        icon={<FontAwesome5 name="check-circle" size={40} color="black" />}
        onRequestClose={() => {
          setSuccessModalVisible(false);
          router.back(); // Replace "Login" with the name of your login screen
        }}
        onPress={() => {
          setSuccessModalVisible(false);
          router.back(); // Replace "Login" with the name of your login screen
        }}
        title="Registration Successful"
        description="Your account has been created successfully. Please log in to continue."
        btnLabel="Go to Login"
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    marginLeft: 5,
  },
  inputTouchable: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "space-between",
    alignContent: "center",
  },
  emailVerificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  emailInput: {
    padding: 10,
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    paddingHorizontal: 8,
    marginRight: 8,
  },
  scrollview: {
    height: Dimensions.get("window").height,
    maxHeight: Dimensions.get("window").height - 82,
    paddingVertical: HORIZONTAL_SCREEN_MARGIN,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  cTop: {
    marginVertical: SIZES.medium,
  },
  cBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    padding: SIZES.xSmall,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
    fontFamily: "Poppins_400Regular",
    zIndex: 5,
  },
  signUpWith: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: SIZES.xSmall,
    padding: SIZES.xSmall,
    width: "100%",
    borderTopWidth: 1,
    borderColor: COLORS.grayDark,
    marginTop: SIZES.xLarge,
  },
  formCta: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.medium,
    color: COLORS.background,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xSmall,
  },
  formCtaText: {
    fontSize: SIZES.medium,
    textTransform: "capitalize",
    color: COLORS.background,
  },
});
