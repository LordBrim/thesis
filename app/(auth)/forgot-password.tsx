import { useRef, useState } from "react";
import axios from "axios";
import CallToActionBtn from "components/common/CallToActionBtn";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StyleSheet } from "react-native";
import TextInputWrapper from "components/common/TextInputWrapper";
import Description from "components/common/texts/Description";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import { useRouter } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import LinkBtnTouch from "components/common/LinkBtnTouch";
import CountDownTimer from "react-native-countdown-timer-hooks";
import {
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { FIREBASE_AUTH } from "firebase-config";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [generatedPin, setGeneratedPin] = useState("");
  const [enteredPin, setEnteredPin] = useState("");
  const [timerEnd, setTimerEnd] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300);
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const refTimer = useRef(null);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const generatePin = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendPin = async () => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(
        FIREBASE_AUTH,
        email
      );
      if (signInMethods.length === 0) {
        setEmailError("The email address is not registered.");
        return;
      }
      setEmailError("");

      const pin = generatePin();
      setGeneratedPin(pin);

      const API_KEY = "d1440a571533e6c003ef72358ff55e5a-f6fe91d3-6d5fa136";
      const DOMAIN = "lifeline-ph.tech";

      const data = new URLSearchParams({
        from: "Lifeline Support <support@lifeline.com>",
        to: email,
        subject: "Your Password Reset OTP",
        text: `Your OTP code is: ${pin}. It will expire in 5 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #333;">Lifeline Password Reset OTP</h2>
            <p style="color: #555;">Dear User,</p>
            <p style="color: #555;">To reset your password, please use the following One-Time Password (OTP):</p>
            <div style="text-align: center; margin: 20px 0;">
              <span style="display: inline-block; padding: 10px 20px; font-size: 24px; color: #fff; background-color: #007bff; border-radius: 5px;">${pin}</span>
            </div>
            <p style="color: #555;">If you did not request this code, please ignore this email.</p>
            <p style="color: #555;">Best regards,<br/>The Lifeline Team</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #aaa; font-size: 12px; text-align: center;">This is an automated message, please do not reply.</p>
          </div>
        `,
      });

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

      if (response.status === 200) {
        console.log("OTP email sent successfully");
        console.log("Generated PIN:", pin); // Log the generated PIN value
        setShowModal(true);
      } else {
        console.error("Failed to send email:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending OTP email:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePinEntered = async () => {
    if (enteredPin === generatedPin) {
      console.log("PIN entered correctly:", enteredPin);
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      setShowModalEmail(true);
    } else {
      console.error("Incorrect PIN entered");
      // Optionally, show an error message to the user
    }
  };

  const timerOnProgressFunc = (remainingTimeInSecs) => {
    setRemainingTime(remainingTimeInSecs);
  };

  const timerCallbackFunc = (timerFlag) => {
    setTimerEnd(timerFlag);
    console.warn("Alert the user when timer runs out...");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/forgot-password.png")}
        style={{
          width: "80%",
          height: 200,
        }}
      />

      <View style={{ width: "100%" }}>
        <Text style={GS.h1}>Forgot Password</Text>
        <Description description="Enter the email you used to sign in." />
      </View>

      <View style={{ gap: 15, width: "100%" }}>
        <TextInputWrapper label="Email">
          <TextInput
            value={email}
            placeholder="Enter your email address..."
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <CallToActionBtn label="Reset Password" onPress={sendPin} />
      </View>
      <SingleBtnModal
        visible={showModalEmail}
        onRequestClose={() => {
          setShowModalEmail(false);
          setShowModal(false);
          router.back();
        }}
        onPress={() => {
          setShowModalEmail(false);
          setShowModal(false);
          router.back();
        }}
        icon={<FontAwesome5 name="envelope" size={40} color="black" />}
        title="Email Sent!"
        description={
          <Text>
            We have sent a link to reset your password to your{" "}
            <Text style={{ fontWeight: "700" }}>email address {email} </Text>
          </Text>
        }
        btnLabel="Close"
      ></SingleBtnModal>
      <SingleBtnModal
        visible={showModal}
        onRequestClose={handleCloseModal}
        onPress={handlePinEntered}
        icon={<FontAwesome5 name="unlock-alt" size={40} color="black" />}
        title="One-Time Pin Sent!"
        description={
          <Text>
            We have sent a PIN to your{" "}
            <Text style={{ fontWeight: "700" }}>email address {email} </Text>
            Please confirm below.
          </Text>
        }
        btnLabel="Proceed"
        extraBtn={
          <TouchableOpacity
            onPress={() => {
              if (refTimer.current) {
                refTimer.current.resetTimer();
              }
            }}
            style={{ flexDirection: "row" }}
          >
            <Text style={GS.link1}>
              Resend OTP
              {remainingTime >= 0 && <Text> </Text>}
            </Text>
            <CountDownTimer
              ref={refTimer}
              timestamp={300}
              timerOnProgress={timerOnProgressFunc}
              timerCallback={timerCallbackFunc}
              textStyle={{
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            />
          </TouchableOpacity>
        }
      >
        <View
          style={{
            marginHorizontal: HORIZONTAL_SCREEN_MARGIN,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <OtpInput
            numberOfDigits={6}
            focusColor="#DA2F47"
            focusStickBlinkingDuration={500}
            onFilled={(text) => setEnteredPin(text)}
            textInputProps={{
              accessibilityLabel: "One-Time Pin Sent!",
            }}
            theme={{
              pinCodeContainerStyle: {
                width: 60,
                height: 60,
                borderRadius: 10,
              },
            }}
          />
        </View>
      </SingleBtnModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    gap: 40,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
  errorText: {
    color: "red",
  },
});
