import React from "react";
import { View, Text, Image, Animated } from "react-native";
import BloodBankInfo from "./BloodBankInfo";
const InfoView = ({
  selectedHospital,
  infoBottom,
  infoVisible,
  BloodTypeIcons,
  styles,
}) => (
  <Animated.View
    style={[styles.infoBottom, { bottom: infoBottom }]}
    key={selectedHospital.name}
  >
    <Text>{selectedHospital.address}</Text>
    <Image
      source={{ uri: selectedHospital.logoUrl }}
      style={{ width: 50, height: 50 }}
    />
    {selectedHospital.bloodBanks.map((bank, index) => (
      <BloodBankInfo key={index} bank={bank} BloodTypeIcons={BloodTypeIcons} />
    ))}
  </Animated.View>
);

export default InfoView;
