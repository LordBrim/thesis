// <<<<<<< QRCode
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { CheckBox } from "react-native-btr";
import { Ionicons } from "react-native-vector-icons";
import { SIZES, FONT, COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import TextInputWrapper from "../../components/common/TextInputWrapper";
import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";

import { FIREBASE_AUTH } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CallToActionBtn from "../../components/common/CallToActionBtn";
import LinkBtn from "components/common/LinkBtn";
import LifelineLogo from "components/common/LifelineLogo";

export default function RegisterScreen() {
  const pToggle = useTogglePasswordVisibility();
  const cpToggle = useTogglePasswordVisibility();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toggleTerms, setToggleTerms] = useState(false);
  const [toggleAlerts, setToggleAlerts] = useState(false);

  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;
  const register = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
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
    <View style={styles.container}>
      <LifelineLogo />

      <Text
        style={{
          fontSize: SIZES.xLarge,
          fontWeight: "bold",
          fontFamily: FONT.BakbakOne,
          marginTop: 20,
        }}
      >
        Register an <Text style={{ color: COLORS.primary }}>Account</Text>
      </Text>

      <View style={{ gap: 24 }}>
        <TextInputWrapper label="Email">
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Enter your email address..."
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
          />
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
          <Pressable onPress={pToggle.handlePasswordVisibility}>
            <Ionicons
              name={pToggle.rightIcon}
              size={SIZES.xLarge}
              color={COLORS.gray}
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
          <Pressable onPress={cpToggle.handlePasswordVisibility}>
            <Ionicons
              name={cpToggle.rightIcon}
              size={SIZES.xLarge}
              color={COLORS.gray}
            />
          </Pressable>
        </TextInputWrapper>
      </View>

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
            <LinkBtn
              label="Terms and Conditions"
              href="(aux)/terms-and-conditions"
            />
            ?
          </Text>
        </View>
      </View>

      <CallToActionBtn label="Register" onPress={() => register()} />
      {/* 
      <View style={{}}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            height: 1,
            backgroundColor: "gray",
          }}
        >
          Or sign up with
        </Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
  inputContainer: {
    margin: 5,
  },
  input: {
    flex: 1,
    height: 40,
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
