import { useEffect, useState } from "react";
import { Login } from "./screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import { showLongToast, showShortToast } from "hooks/useToast";

export default function Authentication() {
  const [initialLaunch, setInitialLaunch] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        showLongToast(
          "📡 You are offline. Some features may not be available."
        );
      } else {
        if (!initialLaunch) {
          showShortToast("📡 You are back online.");
        } else {
          setInitialLaunch(false);
        }
      }
    });
    unsubscribe();
  }, []);
  return (
    <SafeAreaProvider>
      <Login />
    </SafeAreaProvider>
  );
}
