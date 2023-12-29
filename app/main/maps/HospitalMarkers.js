import React from "react";
import { View, Text, Image } from "react-native";
import { Marker } from "react-native-maps";

const HospitalMarker = ({ hospital, setSelectedMarker, styles }) => (
  <Marker
    coordinate={hospital.coordinates}
    key={hospital.name}
    onPress={() => {
      setSelectedMarker(hospital); // Set the selected hospital
    }}
  >
    <View style={styles.markerContainer}>
      <Text style={styles.markerText}>{hospital.name}</Text>
      <Image
        source={require("../../../assets/icons/marker.png")}
        style={styles.markerImage}
      />
    </View>
  </Marker>
);

export default HospitalMarker;
