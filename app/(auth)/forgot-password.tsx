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
} from "firebase/auth";
import { FIREBASE_AUTH } from "firebase-config";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [generatedPin, setGeneratedPin] = useState("");
  const [enteredPin, setEnteredPin] = useState("");
  const [timerEnd, setTimerEnd] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300);
  const router = useRouter();
  const refTimer = useRef(null);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const generatePin = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendPin = async () => {
    const pin = generatePin();
    setGeneratedPin(pin);

    const data = {
      personalizations: [
        {
          to: [{ email: email }],
          subject: "Your Password Reset OTP",
        },
      ],
      from: { email: "lifelineisthebest4@gmail.com" }, // Verified sender email
      content: [
        {
          type: "text/plain",
          value: `Your OTP code is ${pin}. It will expire in 5 minutes.`,
        },
      ],
    };

    try {
      const response = await axios.post(
        "https://api.sendgrid.com/v3/mail/send",
        data,
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 202) {
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

      <View style={{ gap: 24, width: "100%" }}>
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
});
