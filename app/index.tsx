import { useEffect, useState } from "react";
import { Login } from "./screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { showToastable } from "react-native-toastable";
import { Restart } from "fiction-expo-restart";
import NetInfo from "@react-native-community/netinfo";

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
      if (!initialLaunch) {
        showToastable({
          message: "📡 You are back online.",
          status: "success",
          duration: 4000,
        });
        Restart();
      } else {
        setInitialLaunch(false);
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
