import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import NoInternetScreen from "./(aux)/no-internet";
import { Login } from "./screens";

export default function Authentication() {
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
    // TODO: Make alerts into a reusable snackbar.
    Alert.alert(
      "Internet Connection",
      "You are offline. Some features may not be available."
    );
  };

  return <>{isConnected ? <Login /> : <NoInternetScreen />}</>;
}
