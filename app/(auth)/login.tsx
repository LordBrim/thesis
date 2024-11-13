import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  AppState,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { Link, useRouter } from "expo-router";
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
import LifelineLogo from "components/common/LifelineLogo";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES, GS } from "../../constants";
import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import { FIREBASE_AUTH, FIRESTORE_DB } from "firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { FlatList } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { showToastable } from "react-native-toastable";
import { showLongToast } from "hooks/useToast";
import { useNavigation } from "expo-router";

export default function LoginScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    });
  }, []);
  const router = useRouter();
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

  const storeUserCredentials = async (email, password, rememberMe) => {
    try {
      await AsyncStorage.setItem("user_email", email);
      await AsyncStorage.setItem("user_password", password);
      await AsyncStorage.setItem("remember_me", rememberMe ? "true" : "false");
    } catch (error) {
      console.error("Error storing user credentials:", error.message);
    }
  };

  const onModalClose = () => {
    setModalVisible(false);
  };

  const login = async (email, password) => {
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
      if (toggleRemember) {
        await AsyncStorage.setItem("user_logged_in", "true");
        await storeUserCredentials(email, password, toggleRemember);
      }
      const user = FIREBASE_AUTH.currentUser;

      const docRef = doc(FIRESTORE_DB, "User", user.uid);
      const docSnap = await getDoc(docRef);
      const role = docSnap.data().role;
      const disabled = docSnap.data().disabled;

      if (!disabled) {
        switch (role) {
          case "super":
            router.replace("/(app)/(super)/(tabs)");
            break;
          case "admin":
            router.replace("/(app)/(admin)/(tabs)");
            break;
          case "staff":
            router.replace("/(app)/(staff)/(tabs)");
            break;
          default:
            router.replace("/(app)/(user)/(tabs)");
            break;
        }
      } else {
        showLongToast("Your account is disabled. 🚫");
      }
    } catch (error) {
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const rememberMe = await AsyncStorage.getItem("remember_me");
        if (rememberMe === "true") {
          const storedEmail = await AsyncStorage.getItem("user_email");
          const storedPassword = await AsyncStorage.getItem("user_password");
          if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setToggleRemember(true);
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
          console.log(
            "App went to background or inactive state, but Remember Me is checked, so user remains logged in."
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

  const size = 40;
  const gridBtns = [
    {
      icon: <FontAwesome6 name="user-tie" size={size} color={COLORS.primary} />,
      title: "Super Admin",
      email: "andrei@mail.com",
      password: "123456",
    },
    {
      icon: (
        <FontAwesome6 name="user-doctor" size={size} color={COLORS.primary} />
      ),
      title: "Admin",
      email: "uerm@mail.com",
      password: "123456",
    },
    {
      icon: (
        <FontAwesome6 name="user-nurse" size={size} color={COLORS.primary} />
      ),
      title: "Staff",
      email: "munaru@mail.com",
      password: "admin123",
    },
    {
      icon: (
        <FontAwesome6 name="user-injured" size={size} color={COLORS.primary} />
      ),
      title: "User",
      email: "user6@mail.com",
      password: "123456",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={styles.scrollview}
      >
        <View style={styles.cTop}>
          <LifelineLogo />
          <Text style={GS.h1}>Login</Text>

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
                  style={{
                    flex: 1,
                    padding: 12,
                  }}
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
                  style={{
                    flex: 1,
                    padding: 12,
                  }}
                />
                <Pressable
                  onPress={handlePasswordVisibility}
                  style={{ paddingRight: 12 }}
                >
                  <Ionicons
                    name={rightIcon}
                    size={SIZES.xLarge}
                    color={COLORS.grayDark}
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
              <LinkBtn
                label="Forgot Password?"
                href="/forgot-password"
                underline
              />
            </View>
          </View>

          <CallToActionBtn
            label="Login"
            onPress={() => login(email, password)}
          />
        </View>

        {/* TODO: Remove on showcase */}
        <View style={{ gap: 8, marginVertical: "auto" }}>
          <Text style={GS.h2}>Easy Login</Text>

          <FlatList
            data={gridBtns}
            renderItem={({ item }) => (
              <View style={[easyLogin.view]}>
                <Pressable
                  style={easyLogin.press}
                  android_ripple={{ radius: 200 }}
                  onPress={() => login(item.email, item.password)}
                >
                  {item.icon}
                  <Text style={easyLogin.text}>{item.title}</Text>
                </Pressable>
              </View>
            )}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={4}
            scrollEnabled={false}
          />
        </View>
        {/* TODO: Remove on showcase */}
        <View style={styles.cBottom}>
          <Text>Don't have an account? </Text>
          <LinkBtn label="Register" href="/register" underline />
        </View>
        <SingleBtnModal
          visible={modalVisible}
          icon={
            <Ionicons
              name="information-circle-outline"
              size={42}
              color="black"
            />
          }
          onRequestClose={onModalClose}
          onPress={onModalClose}
          animation={true}
          title="Login Error"
          btnLabel="Okay"
          description="Your login attempt failed. Please check your email and password and try again."
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
  },
  scrollview: {
    height: Dimensions.get("window").height,
    maxHeight: Dimensions.get("window").height - 82,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    alignContent: "center",
    justifyContent: "space-between",
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

const easyLogin = StyleSheet.create({
  text: {
    fontWeight: "500",
  },
  view: {
    width: "25%",
    aspectRatio: 1 / 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  press: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
