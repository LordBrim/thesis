import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

import { useFonts } from "expo-font";
import {
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";

import { Ionicons } from "react-native-vector-icons";
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
  User,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlePassword = (password: string) => {
    setPassword(password);
  };

  const [loading, setLoading] = useState(false);

  const [toggleRemember, setToggleRemember] = useState(false);
  const handleToggleRemember = () => {
    setToggleRemember(!toggleRemember);
  };

  const login = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log("User ID:", response.user.uid);
      console.log("Email:", response.user.email);
      console.log(response);
      router.replace("/(app)/(tabs)");
    } catch (error) {
      console.log(error);
      Alert.alert("Login Failed:" + error.message);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    const checkLoginState = async () => {
      const userLoggedIn = await AsyncStorage.getItem("user_logged_in");
      if (userLoggedIn === "true") {
        router.replace("/(app)/(tabs)");
      }
    };

    checkLoginState();
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

            <TextInputWrapper label="Password">
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

        <CallToActionBtn label="Login" onPress={() => login()} />
      </View>

      <View style={styles.cBottom}>
        <Text>Don't have an account? </Text>
        <LinkBtn label="Register" href="/register" />
      </View>
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
});
