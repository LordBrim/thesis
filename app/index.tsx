import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import NoInternetScreen from "./(aux)/no-internet";
import { Login } from "./screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { showToastable } from "react-native-toastable";
import { Restart } from "fiction-expo-restart";

export default function Authentication() {
  const [initialLaunch, setInitialLaunch] = useState(true);

  const unsubscribe = NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      showToastable({
        message: "📡 You are offline. Some features may not be available.",
        status: "success",
        duration: 36000000,
      });
    } else {
      if (initialLaunch) {
        setInitialLaunch(false);
      } else {
        Restart();
        showToastable({
          message: "📡 You are back online.",
          status: "success",
          duration: 4000,
        });
      }
    }
  });

  useEffect(() => {
    unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <Login />
    </SafeAreaProvider>
  );
}
