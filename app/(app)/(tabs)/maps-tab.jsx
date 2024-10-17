import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Easing,
  ScrollView,
  FlatList,
  TextInput,
  SafeAreaView,
  Pressable,
} from "react-native";
// import Divider from "../../../components/Divider";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../../constants/theme";
import { mapStyle } from "../../../components/maps/mapStyle";
import BackButton from "../../../constants/backButton";
import HospitalMapView from "../../../components/maps/hospitalMapView";
import TextInputWrapper from "components/common/TextInputWrapper";
import { FontAwesome6 } from "@expo/vector-icons";
import { HORIZONTAL_SCREEN_MARGIN } from "constants";
import Description from "components/common/texts/Description";
import { GS } from "constants";

// TODO: Connect this with Firebase with a Hospitals Colleciton.
const HospitalsData = [
  {
    id: 1,
    name: "UERM Hospital",
    coordinates: { latitude: 14.607184, longitude: 121.020384 },
    address: "64 Aurora Blvd, Quezon City, 1113 Metro Manila",
    logoUrl: { uri: "https://via.placeholder.com/150" },
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
    logoUrl: { uri: "https://via.placeholder.com/150" },

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
    logoUrl: { uri: "https://via.placeholder.com/150" },
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
    logoUrl: { uri: "https://via.placeholder.com/150" },
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

  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: Add search function for multiple hospitals */}
      <View style={styles.cTop}>
        <View style={{ gap: 8 }}>
          <Text style={GS.h1}>Find a medical institution</Text>
          <Description description="At Lifeline, we partner with medical institutions to help patients easily find blood banks based on location, specialty, and services." />
        </View>

        <TextInputWrapper>
          <TextInput
            placeholder="Find a medical institution..."
            // onChangeText={() => void}
            // value={searchText}
            style={{ flex: 1 }}
          />
          <FontAwesome6 name="magnifying-glass" size={24} color={"black"} />
        </TextInputWrapper>
      </View>
      {/* <FlatList
        data={HospitalsData}
        renderItem={({ item }) => <Hospital name={item.name} />}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false} // Disable scrolling for FlatList
        overScrollMode="never"
      /> */}

      {HospitalsData &&
        HospitalsData.map((hospital) => (
          <Pressable
            style={styles.hContainer}
            key={hospital.id}
            android_ripple={{ radius: 200 }}
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
      {/* {!selectedHospital &&
        hospitals.map((hospital) => (
          <TouchableWithoutFeedback
            key={hospital.id}
            onPressIn={() => setPressedButtonId(hospital.id)}
            onPressOut={() => setPressedButtonId(null)}
            onPress={() => focusMap(hospital)}
          >
            <Text>{hospital.name}</Text>
          </TouchableWithoutFeedback>
        ))} */}
      {/* {selectedHospital && (
        <HospitalMapView
          mapStyle={mapStyle}
          selectedHospital={selectedHospital}
          setSelectedHospital={setSelectedHospital}
          setPressedButtonId={setPressedButtonId}
          hospitals={hospitals}
          navigation={navigation}
          goBack={() => {
            setPressedButtonId(null);
            setSelectedHospital(null);
          }}
          styles={styles}
          // setMapBackground={setMapBackground}
          // setMapHeader={setMapHeader}
        />
      )} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  cTop: {
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
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
    // your button styles when pressed
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
    // your text styles when button is pressed
    fontSize: SIZES.large,
    textAlign: "left",
    color: "white",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute", //use absolute position to show button on top of the map
    bottom: "10%", //for center align
    alignSelf: "center", //for align to right
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
    color: COLORS.white,
  },
  infoTopDistance: {
    fontSize: SIZES.medium,
    color: COLORS.white,
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
