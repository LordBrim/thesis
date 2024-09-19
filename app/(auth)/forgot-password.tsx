import CallToActionBtn from "components/common/CallToActionBtn";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import { View, TextInput, Image } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import TextInputWrapper from "components/common/TextInputWrapper";
import Title from "components/common/texts/Title";
import Description from "components/common/texts/Description";

export default function ForgotPassword() {
  const sendPin = () => {
    //TODO: Send confimation pin to email
  };

  const [email, setEmail] = useState("");

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
