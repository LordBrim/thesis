import React, { useState } from "react";
import { router } from "expo-router";
import { Alert, Button, Image, TouchableOpacity } from "react-native";
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
import Ionicons from "react-native-vector-icons/Ionicons";
import { SIZES, FONT, COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import TextInputWrapper from "../../components/common/TextInputWrapper";
import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";
import { firestoreOperations } from "../../firestore-services";
import { FIREBASE_AUTH } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithCredential,
} from "firebase/auth";
import CallToActionBtn from "../../components/common/CallToActionBtn";
import LinkBtn from "components/common/LinkBtn";
import LifelineLogo from "components/common/LifelineLogo";
import Title from "components/common/texts/Title";
import { setDoc, doc } from "firebase/firestore";
import GoogleAuth from "providers/GoogleAuth";

export default function RegisterScreen() {
  const pToggle = useTogglePasswordVisibility();
  const cpToggle = useTogglePasswordVisibility();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

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

    if (!fullName) {
      Alert.alert("Missing Information", "Full name is required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
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

      const displayName = fullName;

      // Add user data to the Firestore in "User" collection with auto-generated document ID
      const documentData = {
        email: email,
        password: password,
        displayName: displayName,
        role: "user",
      };

      await firestoreOperations.addDocument(
        "User",
        documentData,
        response.user.uid
      );
      router.back();
      router.replace("/(app)/(tabs)/");
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <View style={styles.cTop}>
          <Title title="Register" />

          <View style={{ gap: 12 }}>
            <View style={{ gap: 24 }}>
              <TextInputWrapper label="Full Name">
                <TextInput
                  style={styles.input}
                  value={fullName}
                  placeholder="Enter your full name..."
                  onChangeText={(fullName) => setFullName(fullName)}
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

          <View
            style={{
              gap: 16,
            }}
          >
            <View
              style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  position: "absolute",
                  top: 10,
                  left: 0,
                  right: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: COLORS.slate400,
                }}
              />
              <Text style={{ backgroundColor: COLORS.white }}>
                {" "}
                Register With{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 32,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/icons/facebook.png")}
                style={{ width: 34, height: 34 }}
              />
              <GoogleAuth />
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
    paddingBottom: SIZES.xxxLarge,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    alignContent: "center",
  },
  cTop: {
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
