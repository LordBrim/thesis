import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { FAB, Icon } from "react-native-paper";
import Divider from "../../../components/Divider";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../../constants/theme";
import { mapStyle } from "./mapStyle";
import BackButton from "../../../components/backButton";

const hospitals = [
  {
    id: 1,
    name: "UERM Hospital",
    coordinates: { latitude: 14.607184, longitude: 121.020384 },
  },
  {
    id: 2,
    name: "De Los Santos Medical Center",
    coordinates: { latitude: 14.6200998, longitude: 121.0175533 },
  },
  {
    id: 3,
    name: "Our Lady of Lourdes Hospital",
    coordinates: { latitude: 14.5949547, longitude: 121.0199822 },
  },
  {
    id: 4,
    name: "Quirino Memorial Medical Center",
    coordinates: { latitude: 14.6222558, longitude: 121.0702733 },
  },
];

function App() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isMapViewShown, setIsMapViewShown] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pressedButtonId, setPressedButtonId] = useState(null);

  const navigation = useNavigation();

  const focusMap = (hospital) => {
    setSelectedHospital(hospital);
    setIsMapViewShown(true);

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

  const goBack = () => {
    setIsMapViewShown(false);
    setSelectedHospital(null);
    setPressedButtonId(null);
  };
  const toHomeScreen = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {!selectedHospital && (
        <View style={{ width: "90%" }}>
          <BackButton navigation={toHomeScreen} />
          <Text style={styles.header}>
            Map <Text style={{ color: COLORS.redWhite }}>Locator</Text>
          </Text>
          <Text style={styles.subHeader}>
            Display all affiliated hospitals in the map.
          </Text>
        </View>
      )}
      {!selectedHospital && <Divider marginTop={30} marginBottom={30} />}
      {!selectedHospital &&
        hospitals.map((hospital) => (
          <TouchableWithoutFeedback
            key={hospital.id}
            onPressIn={() => setPressedButtonId(hospital.id)}
            onPressOut={() => setPressedButtonId(null)}
            onPress={() => focusMap(hospital)}
          >
            <View
              style={
                hospital.id === pressedButtonId
                  ? styles.buttonHospitalPressed
                  : styles.buttonHospital
              }
            >
              <Text
                style={
                  hospital.id === pressedButtonId
                    ? styles.textHospitalPressed
                    : styles.textHospital
                }
              >
                {hospital.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      {isMapViewShown && (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: selectedHospital.coordinates.latitude,
              longitude: selectedHospital.coordinates.longitude,
              latitudeDelta: 0.0024,
              longitudeDelta: 0.0021,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsPointsOfInterest={false}
          >
            {hospitals.map((hospital) => (
              <Marker coordinate={hospital.coordinates} key={hospital.name}>
                <View style={styles.markerContainer}>
                  <Text style={styles.markerText}>{hospital.name}</Text>
                  <Image
                    source={require("../../../assets/icons/marker.png")}
                    style={styles.markerImage}
                  />
                </View>
              </Marker>
            ))}
          </MapView>
          <FAB
            style={styles.fab}
            icon="chevron-left"
            onPress={goBack}
            customSize={40}
            label="Back"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.redWhite,
    borderColor: COLORS.redWhite,
  },
  textHospital: {
    fontFamily: FONT.Grotesk_regular,
    fontSize: SIZES.large,
    textAlign: "left",
    color: COLORS.black,
  },
  textHospitalPressed: {
    // your text styles when button is pressed
    fontFamily: FONT.Grotesk_regular,
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
  },
  header: {
    fontFamily: FONT.Grotesk,
    fontSize: SIZES.xLarge,
    marginBottom: SIZES.medium,
    marginTop: 30,
  },
  subHeader: {
    fontFamily: FONT.raleway_italic,
    fontSize: SIZES.medium,
  },
});

export default App;
