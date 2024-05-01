import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";

import { useFonts } from "expo-font";
import { router } from "expo-router";

import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";
import { Ionicons } from "react-native-vector-icons";
import { CheckBox } from "react-native-btr";

import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";
import LinkBtn from "../../components/common/LinkBtn";
import CallToActionBtn from "../../components/common/CallToActionBtn";
import { HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import TextInputWrapper from "../../components/common/TextInputWrapper";

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

  const auth = FIREBASE_AUTH;
  const login = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      router.replace("/(app)/(tabs)");
    } catch (error) {
      console.log(error);
      Alert.alert("Login Failed:" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View
          style={{
            gap: 8,
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={styles.title}>Lifeline</Text>
            <Image
              style={styles.icon}
              source={require("../../assets/splash/icon.png")}
            />
          </View>
          <Text style={styles.subtitle}>Bloodbank management system</Text>
        </View>

        <Text style={styles.header}>Log in</Text>
        <View style={{ gap: 10 }}>
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
              <Text style={styles.formName}>Remember Me</Text>
            </View>
            <LinkBtn label="Forgot Password?" href="/forgot-password" />
          </View>
        </View>

        <CallToActionBtn label="Login" onPress={() => login()} />
      </View>

      <View style={styles.containerBottom}>
        <Text>Don't have an account? </Text>
        <LinkBtn label="Register" href="/register" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingBottom: SIZES.xxxLarge,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    alignContent: "center",
  },
  containerTop: {
    gap: SIZES.xxxLarge,
  },
  containerBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    padding: SIZES.xSmall,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: "900",
    textTransform: "uppercase",
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: SIZES.medium,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  header: {
    fontWeight: "bold",
    fontSize: SIZES.xxLarge,
    textTransform: "capitalize",
  },
  formName: {
    fontWeight: "bold",
  },
  input: {},
});
