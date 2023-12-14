import { View, Text, ScrollView, Flatlist } from "react-native";

import styles from "./faq.style";

const FAQ = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
        }}
      >
        <Text>FAQ</Text>
      </View>
    </ScrollView>
  );
};

export default FAQ;
