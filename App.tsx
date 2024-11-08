import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ManageTicketAllAppointments from "./app/(app)/(admin)/(home)/manage-ticket-all-appointments";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ManageTicketAllAppointments"
            component={ManageTicketAllAppointments}
          />
          {/* Add other screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
