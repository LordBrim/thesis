import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Easing,
  TextInput,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../../../constants/theme";

import { mapStyle } from "../../../../components/maps/mapStyle";
import HospitalMapView from "../../../../components/maps/hospitalMapView";
import TextInputWrapper from "components/common/TextInputWrapper";
import { FontAwesome6 } from "@expo/vector-icons";
import { HORIZONTAL_SCREEN_MARGIN } from "constants";
import Description from "components/common/texts/Description";
import UERMLogo from "../../../../assets/images/hospital/uerm.png";
import DeLosSantosLogo from "../../../../assets/images/hospital/santos.png";
import LourdesLogo from "../../../../assets/images/hospital/lourdes.png";
import QuirinoLogo from "../../../../assets/images/hospital/quirino.png";
import { GS } from "constants";
const HospitalsData = [
  {
    id: 1,
    name: "UERM Hospital",
    coordinates: { latitude: 14.607184, longitude: 121.020384 },
    address: "64 Aurora Blvd, Quezon City, 1113 Metro Manila",
    logoUrl: UERMLogo,
    bloodBanks: [
      { bloodType: "A+", quantity: 0 },
      { bloodType: "A-", quantity: 0 },
      { bloodType: "B+", quantity: 10 },
      { bloodType: "B-", quantity: 10 },
      { bloodType: "AB+", quantity: 10 },
      { bloodType: "AB-", quantity: 10 },
      { bloodType: "O+", quantity: 10 },
      { bloodType: "O-", quantity: 0 },
    ],
  },
  {
    id: 2,
    name: "De Los Santos Medical Center",
    coordinates: { latitude: 14.6200998, longitude: 121.0175533 },
    address: "201 E Rodriguez Sr. Ave, Quezon City, 1112 Metro Manila",
    logoUrl: DeLosSantosLogo,
    bloodBanks: [
      { bloodType: "A+", quantity: 10 },
      { bloodType: "A-", quantity: 0 },
      { bloodType: "B+", quantity: 10 },
      { bloodType: "B-", quantity: 10 },
      { bloodType: "AB+", quantity: 10 },
      { bloodType: "AB-", quantity: 10 },
      { bloodType: "O+", quantity: 0 },
      { bloodType: "O-", quantity: 0 },
    ],
  },
  {
    id: 3,
    name: "Our Lady of Lourdes Hospital",
    coordinates: { latitude: 14.5949547, longitude: 121.0199822 },
    address: "46 P. Sanchez St, Santa Mesa, Manila, 1016 Metro Manila",
    logoUrl: LourdesLogo,
    bloodBanks: [
      { bloodType: "A+", quantity: 0 },
      { bloodType: "A-", quantity: 0 },
      { bloodType: "B+", quantity: 10 },
      { bloodType: "B-", quantity: 10 },
      { bloodType: "AB+", quantity: 10 },
      { bloodType: "AB-", quantity: 10 },
      { bloodType: "O+", quantity: 0 },
      { bloodType: "O-", quantity: 0 },
    ],
  },
  {
    id: 4,
    name: "Quirino Memorial Medical Center",
    coordinates: { latitude: 14.6222558, longitude: 121.0702733 },
    address: "Project 4, Quezon City, 1109 Metro Manila",
    logoUrl: QuirinoLogo,
    bloodBanks: [
      { bloodType: "A+", quantity: 0 },
      { bloodType: "A-", quantity: 0 },
      { bloodType: "B+", quantity: 10 },
      { bloodType: "B-", quantity: 10 },
      { bloodType: "AB+", quantity: 10 },
      { bloodType: "AB-", quantity: 10 },
      { bloodType: "O+", quantity: 0 },
      { bloodType: "O-", quantity: 0 },
    ],
  },
];

function Maps({ setMapBackground, setMapHeader }) {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [pressedButtonId, setPressedButtonId] = useState(null);

  const navigation = useNavigation();
  const [isMarkerSelected, setIsMarkerSelected] = useState(false);

  useEffect(() => {
    setIsMarkerSelected(selectedHospital !== null);
    navigation.setOptions({ isMarkerSelected });
  }, [selectedHospital, navigation]);

  const focusMap = (hospital) => {
    setSelectedHospital(hospital);

    selectedHospital?.current.animateCamera(
      {
        center: {
          latitude: hospital.coordinates.latitude,
          longitude: hospital.coordinates.longitude,
        },
      },
      { duration: 1000 },
      { easing: Easing.linear },
      zoomTo(18)
    );
  };

  const handleSearch = () => {
    console.error("Search Hospital is not yet implemented!");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: Add search function for multiple hospitals */}
      {!selectedHospital && (
        <View style={styles.cTop}>
          <View style={{ gap: 8 }}>
            <Text style={GS.h1}>Find a medical institution</Text>
            <Description description="At Lifeline, we partner with medical institutions to help patients easily find blood banks based on location, specialty, and services." />
          </View>

          <TextInputWrapper>
            <TextInput
              placeholder="Find a medical institution..."
              style={{
                flex: 1,
                padding: 12,
              }}
            />
            <TouchableOpacity
              style={{ paddingRight: 12 }}
              onPress={handleSearch}
            >
              <FontAwesome6 name="magnifying-glass" size={24} color={"black"} />
            </TouchableOpacity>
          </TextInputWrapper>
        </View>
      )}
      {!selectedHospital &&
        HospitalsData.map((hospital) => (
          <Pressable
            style={styles.hContainer}
            key={hospital.id}
            android_ripple={{ radius: 200 }}
            onPress={() => focusMap(hospital)}
          >
            <Text style={styles.hName}>{hospital.name}</Text>
            <View style={styles.icon}>
              <FontAwesome6
                name="chevron-right"
                size={18}
                color={COLORS.slate400}
              />
            </View>
          </Pressable>
        ))}
      {selectedHospital && (
        <HospitalMapView
          mapStyle={mapStyle}
          selectedHospital={selectedHospital}
          setSelectedHospital={setSelectedHospital}
          setPressedButtonId={setPressedButtonId}
          hospitals={HospitalsData}
          navigation={navigation}
          goBack={() => {
            setPressedButtonId(null);
            setSelectedHospital(null);
          }}
          styles={styles}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  cTop: {
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
    fontWeight: "bold",
    gap: 16,
  },
  buttonHospital: {
    width: "80%",
    padding: SIZES.medium,
    marginVertical: SIZES.small,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    elevation: 5,
    borderColor: COLORS.gray2,
  },
  buttonHospitalPressed: {
    width: "85%",
    padding: SIZES.medium,
    marginVertical: SIZES.medium,
    backgroundColor: "white",
    borderWidth: 2,
    elevation: 5,
    borderRadius: 10,
    borderColor: COLORS.gray,
  },
  textHospital: {
    fontSize: SIZES.large,
    textAlign: "left",
    color: COLORS.black,
  },
  textHospitalPressed: {
    fontSize: SIZES.large,
    textAlign: "left",
    color: "white",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "10%",
    alignSelf: "center",
    backgroundColor: COLORS.red,
  },
  markerContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    elevation: 5,
  },
  markerText: {
    color: "#000",
  },
  markerImage: {
    width: 25,
    height: 25,
  },
  fab: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: COLORS.gray,
    borderWidth: 1,
    width: 100,
    shadowColor: "black",
    elevation: 5,
    flexDirection: "row",
    margin: 16,
    left: 0,
    top: 0,
    zIndex: 6,
  },
  header: {
    fontSize: SIZES.xLarge,
    marginBottom: SIZES.medium,
    marginTop: 30,
  },
  subHeader: {
    fontSize: SIZES.medium,
  },
  infoBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  infoTop: {
    position: "absolute",
    zIndex: 5,
    height: 120,
    left: 0,
    right: 0,
    top: 0,
    paddingTop: 20,
    backgroundColor: COLORS.redTop,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  infoTopTitle: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    color: COLORS.background,
  },
  infoTopDistance: {
    fontSize: SIZES.medium,
    color: COLORS.background,
  },
  hContainer: {
    flex: 1,
    width: "100%",
    borderColor: COLORS.slate100,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 50,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingVertical: 12,
  },
  hName: {
    flex: 1,
    fontWeight: "600",
  },
  icon: {
    width: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Maps;
