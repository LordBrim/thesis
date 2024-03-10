import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
} from "./screens";

const Stack = createNativeStackNavigator();

export default function Authentication() {
  return (
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
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerRight: () => (
            <Link asChild push href="/QRScanner">
              <TouchableOpacity style={{ paddingRight: 16 }}>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
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
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      {/* QR Code Screens */}
      <Stack.Screen name="QRScanner" component={QRScanner} />
    </Stack.Navigator>
  );
}

// import { SignedInContext } from "../context/SignedInContext";
// const [isSignedIn, setIsSignedIn] = useState(false);
// <SignedInContext.Provider value={[isSignedIn, setIsSignedIn]}>
// </SignedInContext.Provider>
