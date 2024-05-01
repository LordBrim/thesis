import { UserRoleContext, UserRoleType } from "../context/UserRoleContext";
import {
  ForgotPassword,
  Login,
  Register,
  Donate,
  EventDetails,
  HomeTab,
  ManageBloodUnits,
  ManageEvents,
  ManageStaff,
  ManageUsers,
  Request,
  QRScanner,
  About,
  Help,
  Profile,
  Settings,
  DonationHistory,
} from "./screens";
import { FIREBASE_APP, FIREBASE_AUTH } from "../firebase-config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";
import NoInternetScreen from "./(aux)/no-internet";
import { ExpoRoot } from "expo-router";

const Stack = createNativeStackNavigator();

export default function Authentication() {
  const [role, setRole] = useState<UserRoleType>("client");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  console.log(user);

  // const auth = initializeAuth(FIREBASE_APP, {
  //   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  // });

  const [isConnected, setConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
      if (!state.isConnected) {
        showAlert();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showAlert = () => {
    Alert.alert(
      "Internet Connection",
      "You are offline. Some features may not be available."
    );
  };

  return (
    <UserRoleContext.Provider value={role}>
      {isConnected ? <Login /> : <NoInternetScreen />}
    </UserRoleContext.Provider>
  );
}
