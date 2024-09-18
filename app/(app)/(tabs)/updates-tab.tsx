import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UpdatesGeneral from "../(updates)/updates-general";
import UpdatesHistory from "../(updates)/updates-history";
import UpdatesIncentives from "../(updates)/updates-incentives";

const Tab = createMaterialTopTabNavigator();

export default function UpdatesTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="General" component={UpdatesGeneral} />
      <Tab.Screen name="Donations" component={UpdatesHistory} />
      <Tab.Screen name="Incentives" component={UpdatesIncentives} />
    </Tab.Navigator>
  );
}
