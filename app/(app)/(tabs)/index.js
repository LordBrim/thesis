// import { SignedInContext } from "../context/SignedInContext";
// const [isSignedIn, setIsSignedIn] = useState(false);
// <SignedInContext.Provider value={[isSignedIn, setIsSignedIn]}>
//   </SignedInContext.Provider>

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import { Account, FAQ, Home, Maps, Updates } from "../../screens";

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="index"
        component={Home}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Updates"
        component={Updates}
        options={{
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen name="Maps" component={Maps} />
      <Tab.Screen name="FAQ" component={FAQ} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
