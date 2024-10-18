import { View, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";

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

function DonationIncentives() {
  return (
    <FlatList
      data={sampleData}
      renderItem={({ item }) => <DonationIncentive checked={item.checked} />}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
      contentContainerStyle={styles.disContainer}
      style={styles.disContainer}
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
        source={require("../../../../assets/images/bloodbag.png")}
        style={[styles.bloodbag, { opacity: checked ? 0.6 : 1 }]}
      />
      {checked && (
        <Image
          source={require("../../../../assets/images/check.png")}
          style={styles.checkmark}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    flexDirection: "column",
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: HORIZONTAL_SCREEN_MARGIN,
    alignItems: "center",
  },
  disContainer: {
    gap: HORIZONTAL_SCREEN_MARGIN,
    maxHeight: 70,
    flexDirection: "row",
  },
  dsContainer: {
    width: 50,
    maxWidth: 50,
    maxHeight: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  bloodbag: {
    height: 45,
    width: 25,
  },
  checkmark: {
    height: 50,
    width: 50,
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
