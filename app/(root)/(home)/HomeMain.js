import {
  Home,
  Donate,
  Request,
  Event,
  ManageBloodUnits,
  ManageEvents,
  ManageStaff,
  ManageUsers,
} from "../../screens";

import { createStackNavigator } from "@react-navigation/stack";

export default function HomeMain() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Donate"
        component={Donate}
        options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="Request"
        component={Request}
        options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="ManageBloodUnits" component={ManageBloodUnits} />
      <Stack.Screen name="ManageEvents" component={ManageEvents} />
      <Stack.Screen name="ManageStaff" component={ManageStaff} />
      <Stack.Screen name="ManageUsers" component={ManageUsers} />
    </Stack.Navigator>
  );
}
