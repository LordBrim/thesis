import { useRef, useState } from "react";
import CallToActionBtn from "components/common/CallToActionBtn";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import TextInputWrapper from "components/common/TextInputWrapper";
import Title from "components/common/texts/Title";
import Description from "components/common/texts/Description";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import { useRouter } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import LinkBtnTouch from "components/common/LinkBtnTouch";
import CountDownTimer from "react-native-countdown-timer-hooks";
import TurboMailer from "@mattermost/react-native-turbo-mailer";

export default function ForgotPassword() {
  const sendPin = async () => {
    setShowModal(true);
    //TODO: Send confimation pin to email

    await TurboMailer.sendMail({
      subject: "Lifeline Verification Code",
      recipients: [email],
      body: `Your Lifeline verification code is: ${handleOTP()}`,
      attachments: [
        {
          path: "",
          mimeType: "",
        },
      ],
    });
  };
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  const otpGenerator = require("otp-generator");
  const handleOTP = () => {
    setOTP(
      otpGenerator.generate(4, {
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
        specialCharacters: false,
      })
    );
    console.log(otp);
  };

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    router.navigate("new-password");
  };
  const [pin, setPin] = useState("");
  const handlePinEntered = () => {
    console.log("PIN entered:", pin);
    setTimerEnd(false);
    // Your logic for handling the entered PIN
  };
  const router = useRouter();

  // Timer References
  const refTimer = useRef();

  // For keeping a track of the timer
  const [timerEnd, setTimerEnd] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300);

  const timerOnProgressFunc = (remainingTimeInSecs) => {
    // console.log("On Progress tracker :", remainingTimeInSecs);
    setRemainingTime(remainingTimeInSecs);
  };

  const timerCallbackFunc = (timerFlag) => {
    // Setting timer flag to false once complete
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
        <Title title="Forgot Password" />
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
          />
        </TextInputWrapper>

        <CallToActionBtn label="Reset Password" onPress={() => sendPin()} />
      </View>

      <SingleBtnModal
        visible={showModal}
        onRequestClose={handleCloseModal}
        onPress={() => router.replace("new-password")}
        icon={<FontAwesome5 name="unlock-alt" size={40} color="black" />}
        title="One-Time Pin Sent!"
        description={
          <Text>
            We have sent a PIN to your{" "}
            <Text style={{ fontWeight: "700" }}>
              email address ASTERISK OBSCURED EMAIL{" "}
            </Text>
            Please confirm below.
          </Text>
        }
        btnLabel="Proceed"
        extraBtn={
          // TODO: Add a countdown for the one-time pin
          <TouchableOpacity
            onPress={() => {
              handlePinEntered();
              refTimer.current.resetTimer();
            }}
            style={{ flexDirection: "row" }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              Resend OTP
              {remainingTime >= 0 && <Text> </Text>}
            </Text>
            <CountDownTimer
              ref={refTimer}
              timestamp={300}
              timerOnProgress={timerOnProgressFunc}
              timerCallback={timerCallbackFunc}
              // containerStyle={{ borderWidth: 1 }}
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
            backgroundColor: COLORS.white,
            marginHorizontal: HORIZONTAL_SCREEN_MARGIN,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <OtpInput
            numberOfDigits={4}
            focusColor="#DA2F47"
            focusStickBlinkingDuration={500}
            onFilled={(text) => setPin(text)}
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
    backgroundColor: COLORS.white,
    gap: 40,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
});
