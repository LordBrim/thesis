import React from "react";
import { COLORS } from "../../../../constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ManageUserAppointments from "./manage-user-appointments";
import ManageUserRequests from "./manage-user-requests";
import ManageBankTransfers from "./manage-bank-transfers";

const Tab = createMaterialTopTabNavigator();

export default function ManageTickets() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Tab.Screen name="User Appointments" component={ManageUserAppointments} />
      <Tab.Screen name="User    Requests" component={ManageUserRequests} />
      <Tab.Screen name="Bank Transfers" component={ManageBankTransfers} />
    </Tab.Navigator>
  );
}
