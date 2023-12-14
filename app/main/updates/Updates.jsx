import { View, Text, ScrollView } from "react-native";

import styles from "./updates.style";

const Updates = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
        }}
      >
        <Text>Updates</Text>
      </View>
    </ScrollView>
  );
};

export default Updates;
