import { View, Text, ScrollView } from "react-native";

import styles from "./account.style";

const Account = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
        }}
      >
        <Text>Account</Text>
      </View>
    </ScrollView>
  );
};

export default Account;
