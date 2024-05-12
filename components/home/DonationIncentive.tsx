import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { SIZES, SPACES } from "../../constants";

type IDonationIncentive = {
  checked?: boolean;
};

export default function DonationIncentive({ checked }: IDonationIncentive) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/bloodbag.png")}
        style={[styles.bloodbag, { opacity: checked ? 0.6 : 1 }]}
      />
      {checked && (
        <Image
          source={require("../../assets/images/check.png")}
          style={styles.checkmark}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 84,
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bloodbag: {
    height: 55,
    width: 30,
  },
  checkmark: {
    height: 80,
    width: 80,
    aspectRatio: 1 / 1,
    position: "absolute",
    opacity: 1,
  },
});
