import React, { useEffect } from "react";
import { COLORS } from "../../../../constants";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "expo-router";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

export default function ManageTicketsDonations() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Donations",
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontSize: 16,
      },
      headerTitleAlign: "center",
    });
  }, []);
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
