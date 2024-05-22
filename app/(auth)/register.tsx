// <<<<<<< QRCode
import React, { useState } from "react";
import { router } from "expo-router";
import { Alert } from "react-native";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-btr";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, FONT, COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import TextInputWrapper from "../../components/common/TextInputWrapper";
import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";

import { firestoreOperations } from "../../firestore-services";
import { FIREBASE_AUTH } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CallToActionBtn from "../../components/common/CallToActionBtn";
import LinkBtn from "components/common/LinkBtn";
import LifelineLogo from "components/common/LifelineLogo";
import Title from "components/common/texts/Title";

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
    if (!toggleTerms) {
      Alert.alert(
        "Terms and Conditions",
        "You must agree to the terms and conditions to use the app."
      );
      return;
    }
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);

      // Add user data to the Firestore in "User" collection with auto-generated document ID
      const displayName = response.user.displayName;
      const documentData = {
        email: email,
        password: password,
        displayName: displayName,
      };
      await firestoreOperations.addDocument("User", documentData);
      router.replace("/(app)/(tabs)");
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LifelineLogo />

        <View style={styles.cTop}>
          <Title title="Register" />

          <View style={{ gap: 12 }}>
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
                />
                <Text>?</Text>
              </View>
            </View>
          </View>
          <CallToActionBtn label="Register" onPress={() => register()} />
        </View>

        <Text style={{ color: "transparent" }}>Invisible Placeholder</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: SIZES.xxxLarge,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    alignContent: "center",
  },
  cTop: {
    marginTop: SIZES.xxxLarge,
    gap: SIZES.xxxLarge,
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
