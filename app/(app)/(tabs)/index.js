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
      <Tab.Screen name="HomeTab" component={Home} />
      <Tab.Screen
        name="UpdatesTab"
        component={Updates}
        options={{
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen name="MapsTab" component={Maps} />
      <Tab.Screen name="FAQTab" component={FAQ} />
      <Tab.Screen name="AccounTab" component={Account} />
    </Tab.Navigator>
  );
}
