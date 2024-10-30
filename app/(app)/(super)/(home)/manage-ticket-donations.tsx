import React from "react";
import { COLORS } from "../../../../constants";
import { StyleSheet, Text, View } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

export default function ManageTicketsDonations() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Tab.Screen name="Pending" component={ManageTicketsDonationsPending} />
      <Tab.Screen name="Archived" component={ManageTicketsDonationsArchived} />
    </Tab.Navigator>
  );
}

function ManageTicketsDonationsPending() {
  return (
    <View style={styles.container}>
      <Text>Pending User Donations</Text>
    </View>
  );
}

function ManageTicketsDonationsArchived() {
  return (
    <View style={styles.container}>
      <Text>Archived User Donations</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
