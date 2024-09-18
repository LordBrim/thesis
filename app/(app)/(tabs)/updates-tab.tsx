import { View, Text } from "react-native";

import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DonationHistory, HomeTab } from "app/screens";
import UpdatesGeneral from "../(updates)/updates-general";

const Tab = createMaterialTopTabNavigator();

export default function UpdatesTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="General" component={UpdatesGeneral} />
      <Tab.Screen name="History" component={DonationHistory} />
      <Tab.Screen name="Incentives" component={DonationHistory} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
});
