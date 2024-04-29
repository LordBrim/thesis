import { UserRoleContext, UserRoleType } from "context/UserRoleContext";
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

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "firebase.config";
const Stack = createNativeStackNavigator();

export default function Authentication() {
  const [role, setRole] = useState<UserRoleType>("client");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <UserRoleContext.Provider value={role}>
      <Stack.Navigator initialRouteName="Login">
        {/* Authentication Activities */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        {/* Home Activities */}
        <Stack.Screen name="(app)/(tabs)" component={HomeTab} />
        {/* User Level */}
        <Stack.Screen name="Donate" component={Donate} />
        <Stack.Screen name="Request" component={Request} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        {/* Staff Level */}
        <Stack.Screen name="ManageBloodUnits" component={ManageBloodUnits} />
        <Stack.Screen name="ManageEvents" component={ManageEvents} />
        <Stack.Screen name="ManageUsers" component={ManageUsers} />
        <Stack.Screen name="ManageStaff" component={ManageStaff} />
        {/* Account Screens */}
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="DonationHistory" component={DonationHistory} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        {/* QR Code Screens */}
        <Stack.Screen name="QRScanner" component={QRScanner} />
      </Stack.Navigator>
    </UserRoleContext.Provider>
  );
}
