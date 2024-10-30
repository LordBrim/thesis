import React from "react";
import { COLORS } from "../../../../constants";
import { StyleSheet, Text, View } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

export default function ManageTicketsTransfers() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Tab.Screen name="Pending" component={ManageTicketsTransfersPending} />
      <Tab.Screen name="Archived" component={ManageTicketsTransfersArchived} />
    </Tab.Navigator>
  );
}

function ManageTicketsTransfersPending() {
  return (
    <View style={styles.container}>
      <Text>Pending Bank Transfers</Text>
    </View>
  );
}

function ManageTicketsTransfersArchived() {
  return (
    <View style={styles.container}>
      <Text>Archived Bank Transfers</Text>
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
