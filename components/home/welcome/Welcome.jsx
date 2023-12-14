import { View, Text } from "react-native";

import styles from "./welcome.style";

const Welcome = () => {
  return (
    <View>
      <Text>Welcome To Lifeline, User</Text>
      <View>
        <Text>Donate</Text>
        <Text>Request</Text>
      </View>
    </View>
  );
};

export default Welcome;
