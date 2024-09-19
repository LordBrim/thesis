import CallToActionBtn from "components/common/CallToActionBtn";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import { View, TextInput, Image, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import TextInputWrapper from "components/common/TextInputWrapper";
import Title from "components/common/texts/Title";
import Description from "components/common/texts/Description";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import { useRouter } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import LinkBtnTouch from "components/common/LinkBtnTouch";

export default function ForgotPassword() {
  const sendPin = () => {
    setShowModal(true);
    //TODO: Send confimation pin to email
  };
  const [email, setEmail] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    router.navigate("new-password");
  };
  const [pin, setPin] = useState("");
  const handlePinEntered = () => {
    console.log("PIN entered:", pin);
    // Your logic for handling the entered PIN
  };
  const router = useRouter();

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
          <LinkBtnTouch
            label="Resend PIN (5:00)"
            onPress={() => handlePinEntered()}
          />
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
