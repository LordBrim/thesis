import { Stack } from "expo-router";

import {
  Donate,
  EventDetails,
  HomeTab,
  ManageBloodUnits,
  ManageEvents,
  ManageStaff,
  ManageUsers,
} from "../screens";

export default function Root() {
  return (
    <Stack>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      // User Level
      <Stack.Screen name="Donate" component={Donate} />
      <Stack.Screen name="Request" component={Request} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      // Staff Level
      <Stack.Screen name="ManageBloodUnits" component={ManageBloodUnits} />
      <Stack.Screen name="ManageEvents" component={ManageEvents} />
      <Stack.Screen name="ManageUsers" component={ManageUsers} />
      <Stack.Screen name="ManageStaff" component={ManageStaff} />
      // Account
      {/* <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack>
  );
}

// import { SignedInContext } from "../context/SignedInContext";
// const [isSignedIn, setIsSignedIn] = useState(false);
// <SignedInContext.Provider value={[isSignedIn, setIsSignedIn]}>
//   </SignedInContext.Provider>
