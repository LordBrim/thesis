import NetInfo from "@react-native-community/netinfo";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserRoleContext, UserRoleType } from "../context/UserRoleContext";
import { FIREBASE_AUTH } from "../firebase-config";
import NoInternetScreen from "./(aux)/no-internet";
import { Login } from "./screens";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserRoleContext.Provider value={role}>
        {isConnected ? <Login /> : <NoInternetScreen />}
      </UserRoleContext.Provider>
    </GestureHandlerRootView>
  );
}
