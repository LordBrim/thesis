import React from "react";
import { View, Text, Image } from "react-native";
import { Marker } from "react-native-maps";
import { COLORS } from "../../constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
const HospitalMarker = ({ data, setSelectedMarker, styles, type }) => {
  const isHospital = type === "hospital";
  const coordinates = isHospital
    ? data.coordinates
    : { latitude: data.latitude, longitude: data.longitude };
  const name = isHospital ? data.name : data.title;
  const description = isHospital ? data.address : data.description;

  return (
    <Marker
      coordinate={coordinates}
      key={name}
      onPress={() => {
        console.log("Marker pressed:", name);
        setSelectedMarker(data); // Set the selected data (hospital or event)
      }}
    >
      <View style={styles.markerContainer}>
        {isHospital ? (
          <MaterialCommunityIcons
            name="hospital-marker"
            size={30}
            color={COLORS.primary}
          />
        ) : (
          <Fontisto
            name="blood"
            size={24}
            color={COLORS.primary}
            style={{ marginRight: 5 }}
          />
        )}
        <Text style={styles.markerText}>{name}</Text>
      </View>
    </Marker>
  );
};

export default HospitalMarker;
