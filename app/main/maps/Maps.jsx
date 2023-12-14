import { View, Text, ScrollView } from "react-native";

import styles from "./maps.style";

const Maps = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
        }}
      >
        <Text>Maps</Text>
      </View>
    </ScrollView>
  );
};

export default Maps;
