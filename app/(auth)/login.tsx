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

import { Link, router } from "expo-router";

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

export default function LoginScreen() {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const [toggleRemember, setToggleRemember] = useState(false);
  const handleToggleRemember = () => {
    setToggleRemember(!toggleRemember);
  };

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
          <View style={styles.field}>
            <Text style={styles.formName}>Email Address</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter your email address"
              value={email}
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.formName}>Password</Text>
            <View style={styles.formInput}>
              <TextInput
                style={{ width: "90%" }}
                placeholder="Enter your password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={passwordVisibility}
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically
              />
              <Pressable onPress={handlePasswordVisibility}>
                <Ionicons
                  name={rightIcon}
                  size={SIZES.xLarge}
                  color={COLORS.gray}
                />
              </Pressable>
            </View>
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
            <Link asChild href="/forgot-password">
              <TouchableOpacity>
                <Text style={styles.link}>Forgot Password?</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <TouchableHighlight style={styles.formCta} onPress={() => login()}>
          <Text style={styles.formCtaText}>Log In</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.containerBottom}>
        <Text>Don't have an account? </Text>
        <Link asChild href="/register">
          <TouchableOpacity>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </Link>
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
    paddingHorizontal: SIZES.large,
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
  field: {
    gap: SIZES.xxxSmall,
  },
  formName: {
    fontWeight: "bold",
  },
  formInput: {
    width: "100%",
    padding: SIZES.xSmall,
    borderWidth: 1,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.gray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  link: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
