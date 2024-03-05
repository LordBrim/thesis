import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ForgotPassword, Login, Register } from "./screens";

const Stack = createNativeStackNavigator();

export default function Authentication() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
