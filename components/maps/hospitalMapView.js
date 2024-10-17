import axios from "axios";
import * as Location from "expo-location";
import { getDistance } from "geolib"; // You'll need to install this package
import React, { useEffect, useRef, useState } from "react";
import { Animated, Button, Image, Text, View, Linking } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline, UrlTile } from "react-native-maps";
import { Divider, Icon } from "react-native-paper";
import BackButton from "../../constants/backButton";
import { COLORS } from "../../constants";
import HospitalMarker from "./HospitalMarkers";

import Plus from "../../assets/icons/Plus";
import Minus from "../../assets/icons/Minus";
import ABloodType from "../../assets/icons/AB_bloodType";
import ABBloodType from "../../assets/icons/AB_bloodType";
import BBloodType from "../../assets/icons/B_bloodType";
import OBloodType from "../../assets/icons/O_bloodType";
import CustomButtonWithIcon from "components/common/CustomButtonWithIcons";

function isSameLocation(location1, location2) {
  const epsilon = 0.0001; // Threshold for floating point comparison
  return (
    Math.abs(location1.latitude - location2.latitude) < epsilon &&
    Math.abs(location1.longitude - location2.longitude) < epsilon
  );
}

const DisplayedIcons = [
  {
    Icon: ABloodType,
    types: ["A+", "A-"],
  },
  {
    Icon: BBloodType,
    types: ["B+", "B-"],
  },
  {
    Icon: ABBloodType,
    types: ["AB+", "AB-"],
  },
  {
    Icon: OBloodType,
    types: ["O+", "O-"],
  },
];

const HospitalMapView = ({
  mapStyle,
  selectedHospital,
  setMapHeader,
  setMapBackground,
  hospitals,
  styles,
  goBack,
  navigation,
}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const currentLocationRef = useRef(null);
  const selectedHospitalRef = useRef(selectedHospital);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const infoTopOffset = useRef(new Animated.Value(-120)).current;
  const infoBottomOffset = useRef(new Animated.Value(-400)).current;
  const [isMarkerSelected, setIsMarkerSelected] = useState(false);
  useEffect(() => {
    if (selectedMarker) {
      // setMapBackground(COLORS.redTop);
      // setMapHeader(COLORS.white);
      Animated.timing(infoTopOffset, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
      Animated.timing(infoBottomOffset, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
      navigation.setOptions({ isMarkerSelected: true });
    } else {
      Animated.timing(infoTopOffset, {
        toValue: -120,
        duration: 500,
        useNativeDriver: false,
      }).start();
      Animated.timing(infoBottomOffset, {
        toValue: -400,
        duration: 500,
        useNativeDriver: false,
      }).start();
      // setMapBackground(COLORS.white);
      // setMapHeader("#000000");
      navigation.setOptions({ isMarkerSelected: false });
    }
    return () => () => {
      setSelectedMarker(null);
    };
  }, [selectedMarker]);
  const openGoogleMapsForDriving = () => {
    if (currentLocation && selectedHospital) {
      const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
      const destination = `${selectedHospital.coordinates.latitude},${selectedHospital.coordinates.longitude}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

      // Open Google Maps with the driving directions
      Linking.openURL(url).catch((err) =>
        console.error("Error launching Google Maps: ", err)
      );
    }
  };
  useEffect(() => {
    let watchId;

    const startWatching = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        watchId = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.Best, timeInterval: 500 },
          (location) => {
            setCurrentLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });

            // Update the routeCoordinates state
            setRouteCoordinates((prevRouteCoordinates) => {
              // Remove the coordinates up to and including the current location
              const newRouteCoordinates = prevRouteCoordinates.slice();
              while (
                newRouteCoordinates.length > 0 &&
                !isSameLocation(newRouteCoordinates[0], location.coords)
              ) {
                newRouteCoordinates.shift();
              }
              return newRouteCoordinates;
            });
          }
        );
      } else {
        // Handle permission denied...
      }
    };

    startWatching();

    return () => {
      if (watchId) {
        watchId.remove();
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      // Get the current location
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      currentLocationRef.current = location.coords; // Update the ref

      // Calculate the distance to the selected hospital
      if (selectedHospital) {
        selectedHospitalRef.current = selectedHospital; // Update the ref
        const start = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        const end = {
          latitude: selectedHospital.coordinates.latitude,
          longitude: selectedHospital.coordinates.longitude,
        };
        const distanceInMeters = getDistance(start, end);
        setDistance((distanceInMeters / 1000).toFixed(1)); // Convert to kilometers
      }
    })();
  }, []);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!currentLocation || !selectedHospital) {
        console.log("Current location or selected hospital is not defined yet");
        return;
      }
      const start = `${currentLocation.longitude},${currentLocation.latitude}`;
      const end = `${selectedHospital.coordinates.longitude},${selectedHospital.coordinates.latitude}`;
      console.log("Start:", start);
      console.log("End:", end);
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62480d5edcd000074935966b0d86d130c538&start=${start}&end=${end}`;

      try {
        const response = await axios.get(url);
        const data = response.data;
        const distanceInMeters =
          data.features[0].properties.segments[0].distance;
        setDistance((distanceInMeters / 1000).toFixed(1)); // Convert to kilometers and set the state

        const route = data.features[0].geometry.coordinates;
        const routeCoordinates = route.map((coord) => ({
          longitude: coord[0],
          latitude: coord[1],
        }));
        setRouteCoordinates(routeCoordinates);
      } catch (error) {
        console.error("Error fetching route:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    };
    fetchRoute();
  }, [currentLocation, selectedHospital]);

  return (
    <>
      <Animated.View style={[styles.infoTop, { top: infoTopOffset }]}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon source="hospital-building" size={20} color="white" />

          <Text style={styles.infoTopTitle}>{selectedHospital.name}</Text>
          <CustomButtonWithIcon
            icon={"location-arrow"}
            size={24}
            title={"Drive Mode"}
            onPress={openGoogleMapsForDriving}
            buttonStyle={{
              borderRadius: 100,
              backgroundColor: "white",
              borderColor: COLORS.primary,
              borderWidth: 1,
            }}
            iconColor={COLORS.primary}
            textStyle={{ fontSize: 12, color: COLORS.primary }}
          />
        </View>
        <Text style={styles.infoTopDistance}>
          {distance
            ? `${distance} km away from your current location`
            : "Calculating..."}
        </Text>
      </Animated.View>
      {selectedHospital && selectedHospital.coordinates ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={mapStyle}
          // mapType="none"
          initialRegion={{
            latitude: selectedHospital.coordinates.latitude,
            longitude: selectedHospital.coordinates.longitude,
            latitudeDelta: 0.0024,
            longitudeDelta: 0.0021,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onPress={() => {
            setSelectedMarker(null);
          }}
          onPanDrag={() => {
            setSelectedMarker(null);
          }}
        >
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={5}
            strokeColor="blue"
          />
          {hospitals.map((hospital) => (
            <HospitalMarker
              key={hospital.id}
              hospital={hospital}
              setSelectedMarker={setSelectedMarker}
              // showInfo={showInfo}
              styles={styles}
            />
          ))}
        </MapView>
      ) : null}

      <Animated.View
        style={[styles.infoBottom, { bottom: infoBottomOffset }]}
        key={selectedHospital.name}
      >
        <View
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            gap: 15,
            margin: 10,
          }}
        >
          <Image
            source={selectedHospital.logoUrl}
            style={{ width: 55, height: 55, top: 5 }}
          />
          <View
            style={{ display: "flex", flexDirection: "column", width: "90%" }}
          >
            <Text style={[{ color: COLORS.redWhite, fontSize: 20 }]}>
              Address
            </Text>
            <Text style={{ width: "90%" }}>{selectedHospital.address}</Text>
          </View>
        </View>
        <Divider style={{ margin: 10, width: "80%", height: 1 }} />
        <Text
          style={{
            fontSize: 14,
            marginBottom: 15,
          }}
        >
          The hospitals needs the following blood types:
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          {/* Display all icons and only change color based on availability */}
          {DisplayedIcons.map(({ Icon, types }, index) => (
            <View
              key={index}
              style={[
                {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  left: 0,
                },
              ]}
            >
              <Icon
                width={30}
                height={30}
                fill={
                  selectedHospital.bloodBanks
                    .filter((bt) => types.includes(bt.bloodType))
                    .some((t) => t.quantity > 0)
                    ? "red"
                    : "gray"
                }
              />

              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "column",
                }}
              >
                {types.map((bb, bbIndex) => {
                  const positive = bb.includes("+");
                  // Get the one bloobank with the same blood type.
                  let iconColor =
                    selectedHospital.bloodBanks.filter(
                      (bt) => bb == bt.bloodType
                    )[0]?.quantity > 0
                      ? "red"
                      : "gray";
                  const Icon = positive ? Plus : Minus;

                  return (
                    <Icon
                      key={bbIndex}
                      width={20}
                      height={20}
                      fill={iconColor}
                    />
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </Animated.View>

      <BackButton
        navigation={goBack}
        isPressed={Boolean(selectedMarker)}
        style={{
          position: "absolute",
          zIndex: 6,
          left: 18,
          backgroundColor: COLORS.redTop,
          borderColor: "white",
        }}
      />
    </>
  );
};

export default HospitalMapView;
