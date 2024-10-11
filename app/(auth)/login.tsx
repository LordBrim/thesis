import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  Image,
  AppState,
} from "react-native";
import { router } from "expo-router";
import { useFonts } from "expo-font";
import {
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CheckBox } from "react-native-btr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinkBtn from "../../components/common/LinkBtn";
import CallToActionBtn from "../../components/common/CallToActionBtn";
import TextInputWrapper from "../../components/common/TextInputWrapper";
import Title from "components/common/texts/Title";
import LifelineLogo from "components/common/LifelineLogo";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES } from "../../constants";
import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
interface User {
  id: string;
  role: string;
}

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
    Grotesk: require("../../assets/fonts/Grotesk.ttf"),
    Grotesk_regular: require("../../assets/fonts/Grotesk_Reg.ttf"),
    BakbakOne: require("../../assets/fonts/BakbakOne.ttf"),
  });

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlePassword = (password: string) => {
    setPassword(password);
  };

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [toggleRemember, setToggleRemember] = useState(false);
  const handleToggleRemember = () => {
    setToggleRemember(!toggleRemember);
  };

  const storeUserCredentials = async (email, password) => {
    try {
      await AsyncStorage.setItem("user_email", email);
      await AsyncStorage.setItem("user_password", password);
      console.log("User credentials stored successfully");
    } catch (error) {
      console.error("Error storing user credentials:", error.message);
    }
  };
  const onModalClose = () => {
    setModalVisible(false);
  };

  const removeUserCredentials = async () => {
    try {
      await AsyncStorage.removeItem("user_logged_in");
      await AsyncStorage.removeItem("user_email");
      await AsyncStorage.removeItem("user_password");
      console.log("User credentials removed");
    } catch (error) {
      console.error("Error removing user credentials:", error.message);
    }
  };

  const login = async (email, password) => {
    console.log("Login attempt:", email, password); // Log the email and password before login attempt

    if (!email || !password) {
      console.log("Login blocked due to missing email or password");
      return; // Prevent login if email or password is missing
    }

    let valid = true;

    // Reset error messages
    setEmailError("");
    setPasswordError("");
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    }

    if (!valid) {
      console.log("Login blocked due to validation errors");
      return; // Prevent login if validation fails
    }

    setLoading(true);
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");

      if (toggleRemember) {
        await AsyncStorage.setItem("user_logged_in", "true");
        await storeUserCredentials(email, password);
      } else {
        await removeUserCredentials();
      }

      router.replace("/(app)/(tabs)");
    } catch (error) {
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const userLoggedIn = await AsyncStorage.getItem("user_logged_in");
        console.log("User logged in state from AsyncStorage:", userLoggedIn); // Add this log

        if (userLoggedIn === "true") {
          const storedEmail = await AsyncStorage.getItem("user_email");
          const storedPassword = await AsyncStorage.getItem("user_password");

          console.log("Stored email:", storedEmail); // Add this log
          console.log("Stored password:", storedPassword); // Add this log

          if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            // Call login after state is updated
            setTimeout(() => login(storedEmail, storedPassword), 0);
          } else {
            console.log("No valid credentials found");
          }
        }
      } catch (error) {
        console.error("Error retrieving user credentials:", error.message);
      }
    };

    checkLoginState();
  }, []);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        const userLoggedIn = await AsyncStorage.getItem("user_logged_in");
        if (userLoggedIn !== "true") {
          const auth = getAuth();
          await auth.signOut();
          console.log(
            "User signed out because app went to background and Remember Me was not checked"
          );
        }
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cTop}>
        {/* Temporary For quick access. Para hindi na natin ginagamit firebase sa pag login. */}
        <Pressable onPress={() => router.replace("/(app)/(tabs)")}>
          <LifelineLogo />
        </Pressable>
        {/* Temporary For quick access. Para hindi na natin ginagamit firebase sa pag login. */}

        <Title title="Login" />

        <View style={{ gap: 12 }}>
          <View style={{ gap: 24 }}>
            <TextInputWrapper label="Email" error={!!emailError}>
              <TextInput
                value={email}
                placeholder="Enter your email address..."
                onChangeText={(email) => setEmail(email)}
                autoCapitalize="none"
                autoCorrect={true}
                enablesReturnKeyAutomatically
              />
            </TextInputWrapper>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
            <TextInputWrapper label="Password" error={!!passwordError}>
              <TextInput
                value={password}
                placeholder="Enter your password..."
                onChangeText={(password) => setPassword(password)}
                autoCapitalize="none"
                autoCorrect={true}
                enablesReturnKeyAutomatically
                secureTextEntry={passwordVisibility}
              />
              <Pressable onPress={handlePasswordVisibility}>
                <Ionicons
                  name={rightIcon}
                  size={SIZES.xLarge}
                  color={COLORS.gray}
                />
              </Pressable>
            </TextInputWrapper>
            {passwordError ? (
              <Text style={[styles.errorText, { marginBottom: 12 }]}>
                {passwordError}
              </Text>
            ) : null}
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <CheckBox
                checked={toggleRemember}
                color="#FF3642"
                borderRadius={3}
                onPress={() => handleToggleRemember()}
              />
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Remember Me
              </Text>
            </View>
            <LinkBtn label="Forgot Password?" href="/forgot-password" />
          </View>
        </View>

        <CallToActionBtn label="Login" onPress={() => login(email, password)} />
      </View>

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
          <Text style={{ backgroundColor: COLORS.white }}> Sign In With </Text>
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
          <Image
            source={require("../../assets/icons/google.png")}
            style={{ width: 34, height: 34 }}
          />
        </View>
      </View>

      <View style={styles.cBottom}>
        <Text>Don't have an account? </Text>
        <LinkBtn label="Register" href="/register" />
      </View>
      <SingleBtnModal
        visible={modalVisible}
        icon={
          <Ionicons name="information-circle-outline" size={42} color="black" />
        }
        onRequestClose={onModalClose}
        onPress={onModalClose}
        animation={true}
        title="Login Error"
        btnLabel="Okay"
        description="Your login attempt failed. Please check your email and password and try again."
      />
    </View>
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
  errorText: {
    color: "#FF5607",
    fontSize: 13,
    marginTop: -12,
    textAlign: "right",
  },
});
