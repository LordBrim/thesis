import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import {
  COLORS,
  HORIZONTAL_SCREEN_MARGIN,
  SIZES,
  SPACES,
} from "../../../constants";

export default function UpdatesIncentives() {
  return (
    <FlatList
      data={sampleData}
      renderItem={({ item }) => <DonationIncentives />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      overScrollMode="never"
    />
  );
}

interface IDonationIncentives {
  name: string;
}

function DonationIncentives() {
  return (
    <FlatList
      data={sampleData}
      renderItem={({ item }) => <DonationIncentive checked={item.checked} />}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
      contentContainerStyle={styles.disContainer}
      overScrollMode="never"
    />
  );
}

type IDonationIncentive = {
  checked?: boolean;
};

function DonationIncentive({ checked }: IDonationIncentive) {
  return (
    <View style={styles.dsContainer}>
      <Image
        source={require("../../../assets/images/bloodbag.png")}
        style={[styles.bloodbag, { opacity: checked ? 0.6 : 1 }]}
      />
      {checked && (
        <Image
          source={require("../../../assets/images/check.png")}
          style={styles.checkmark}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: "column",
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: HORIZONTAL_SCREEN_MARGIN,
    alignItems: "center",
    borderWidth: 1,
  },
  disContainer: {
    flex: 1,
    gap: HORIZONTAL_SCREEN_MARGIN,
    borderWidth: 1,
    maxHeight: 70,
    flexDirection: "row-reverse",
    width: "100%",
  },
  dsContainer: {
    width: 70,
    maxWidth: 70,
    maxHeight: 70,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  bloodbag: {
    height: 55,
    width: 30,
  },
  checkmark: {
    height: 70,
    width: 70,
    aspectRatio: 1 / 1,
    position: "absolute",
    opacity: 1,
  },
});

const sampleData = [
  {
    id: 1,
    checked: true,
  },
  {
    id: 2,
    checked: false,
  },
  {
    id: 3,
    checked: false,
  },
  {
    id: 4,
    checked: false,
  },
];
