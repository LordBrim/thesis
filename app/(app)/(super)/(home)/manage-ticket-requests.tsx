import React, { useEffect } from "react";
import { COLORS } from "../../../../constants";
import { StyleSheet, Text, View } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "expo-router";
const Tab = createMaterialTopTabNavigator();

export default function ManageTicketsRequests() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Tab.Screen name="Pending" component={ManageTicketsRequestsPending} />
      <Tab.Screen name="Archived" component={ManageTicketsRequestsArchived} />
    </Tab.Navigator>
  );
}

function ManageTicketsRequestsPending() {
  return (
    <View style={styles.container}>
      <Text>Pending User Requests</Text>
    </View>
  );
}

function ManageTicketsRequestsArchived() {
  return (
    <View style={styles.container}>
      <Text>Archived User Requests</Text>
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
