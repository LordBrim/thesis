import Foundation from "@expo/vector-icons/Foundation";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import moment from "moment";
import {
  Text,
  View,
  Linking,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import { Divider, Icon } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import {
  COLORS,
  SIZES,
  HORIZONTAL_SCREEN_MARGIN,
} from "../../../../constants/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import { Image } from "expo-image";

import HospitalMarker from "../../../../components/maps/HospitalMarkers";
import Plus from "../../../../assets/icons/Plus";
import Minus from "../../../../assets/icons/Minus";
import ABloodType from "../../../../assets/icons/A_bloodType";
import ABBloodType from "../../../../assets/icons/AB_bloodType";
import BBloodType from "../../../../assets/icons/B_bloodType";
import OBloodType from "../../../../assets/icons/O_bloodType";
import CustomButtonWithIcon from "components/common/CustomButtonWithIcons";
import { getDistance } from "geolib";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "firebase-config";
import axios from "axios";
import Fontisto from "@expo/vector-icons/Fontisto";
import { mapStyle } from "components/maps/mapStyle";
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import { useRouter } from "expo-router";
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

const METRO_MANILA_BOUNDS = {
  north: 14.853,
  south: 14.271,
  east: 121.135,
  west: 120.856,
};

const limitMapToMetroManila = (region) => {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
  const north = latitude + latitudeDelta / 2;
  const south = latitude - latitudeDelta / 2;
  const east = longitude + longitudeDelta / 2;
  const west = longitude - latitudeDelta / 2;

  if (north > METRO_MANILA_BOUNDS.north) {
    region.latitude = METRO_MANILA_BOUNDS.north - latitudeDelta / 2;
  }
  if (south < METRO_MANILA_BOUNDS.south) {
    region.latitude = METRO_MANILA_BOUNDS.south + latitudeDelta / 2;
  }
  if (east > METRO_MANILA_BOUNDS.east) {
    region.longitude = METRO_MANILA_BOUNDS.east - longitudeDelta / 2;
  }
  if (west < METRO_MANILA_BOUNDS.west) {
    region.longitude = METRO_MANILA_BOUNDS.west + latitudeDelta / 2;
  }

  return region;
};

const HospitalMapView = () => {
  const router = useRouter(); // Initialize the router
  const navigation = useNavigation();
  const route = useRoute();
  const { event } = route.params || {};
  const selectedEvent = event ? JSON.parse(event) : null;
  const { hospital, hospitals } = route.params || {};

  const selectedHospital = hospital ? JSON.parse(hospital) : null;
  const [parsedHospitals, setParsedHospitals] = useState(
    hospitals ? JSON.parse(hospitals) : []
  );
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const currentLocationRef = useRef(null);
  const selectedHospitalRef = useRef(selectedHospital);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [events, setEvents] = useState([]); // State to store events
  const [loading, setLoading] = useState(true); // State for loading
  const previousLocation = useRef(null);
  const previousHospital = useRef(null);
  const mapViewRef = useRef(null); // Add this line to define mapViewRef
  const isSameLocation = (loc1, loc2) => {
    return loc1.latitude === loc2.latitude && loc2.longitude === loc2.longitude;
  };

  // Add bottom sheet refs and state
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [400, "70%"], []);
  const handleSheetChanges = useCallback((index) => {}, []);

  // !for testing purpose

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    }
  };

  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false); // Add state for permission cancelled

  useEffect(() => {
    console.log("Selected Marker:", selectedMarker);
    if (selectedMarker) {
      openBottomSheet();
      fetchRoute();
    }
    console.log("ue 1 triggered");
  }, [selectedMarker]);

  const openGoogleMapsForDriving = () => {
    if (currentLocation && selectedMarker) {
      const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
      const destination = selectedMarker.coordinates
        ? `${selectedMarker.coordinates.latitude},${selectedMarker.coordinates.longitude}`
        : `${selectedMarker.latitude},${selectedMarker.longitude}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

      Linking.openURL(url).catch((err) =>
        console.error("Error launching Google Maps: ", err)
      );
    }
  };

  const fetchRoute = async () => {
    if (!currentLocation || !selectedMarker) {
      return;
    }

    const start = `${currentLocation.longitude},${currentLocation.latitude}`;
    const end = selectedMarker.coordinates
      ? `${selectedMarker.coordinates.longitude},${selectedMarker.coordinates.latitude}`
      : `${selectedMarker.longitude},${selectedMarker.latitude}`;
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62480d5edcd000074935966b0d86d130c538&start=${start}&end=${end}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      const route = data.features[0].geometry.coordinates;
      const routeCoordinates = route.map((coord) => ({
        longitude: coord[0],
        latitude: coord[1],
      }));
      setRouteCoordinates(routeCoordinates);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was cancelled");
        setLocationPermissionDenied(true); // Set state to true if permission is cancelled
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      currentLocationRef.current = location.coords;

      if (selectedHospital) {
        if (selectedHospitalRef.current !== selectedHospital) {
          selectedHospitalRef.current = selectedHospital;
          const start = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          const end = {
            latitude: selectedHospital.coordinates.latitude,
            longitude: selectedHospital.coordinates.longitude,
          };
          const distanceInMeters = getDistance(start, end);
          setDistance((distanceInMeters / 1000).toFixed(1));
        }
      }
    })();
    console.log("ue 2 triggered");
  }, []);

  const isActiveEvent = (startDate, startTime, endDate, endTime) => {
    const now = moment();
    const start = moment(`${startDate} ${startTime}`, "MM/DD/YYYY hh:mm A");
    const end = moment(`${endDate} ${endTime}`, "MM/DD/YYYY hh:mm A");
    return now.isBetween(start, end);
  };

  const isUpcomingEvent = (startDate, startTime) => {
    const now = moment();
    const start = moment(`${startDate} ${startTime}`, "MM/DD/YYYY hh:mm A");
    return now.isBefore(start);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, "events"));
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredEvents = eventsData.filter(
          (event) =>
            isActiveEvent(
              event.startDate,
              event.startTime,
              event.endDate,
              event.endTime
            ) || isUpcomingEvent(event.startDate, event.startTime)
        );
        setEvents(filteredEvents);
        console.log(filteredEvents);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
    console.log("ue 3 triggered");
  }, []);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIRESTORE_DB, "hospital")
        );
        const hospitalsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setParsedHospitals(hospitalsData);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching hospitals: ", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    if (!hospitals) {
      fetchHospitals();
    } else {
      setLoading(false); // Set loading to false if hospitals are already provided
    }
    console.log("ue 4 triggered");
  }, [hospitals]);

  const handleMapInteraction = () => {
    bottomSheetRef.current?.close(); // Close the bottom sheet
    setSelectedMarker(null); // Deselect the marker
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return moment(dateString, "MM/DD/YYYY").format("MMMM D, YYYY");
  };

  const initialRegion = selectedHospital
    ? {
        latitude: selectedHospital.coordinates.latitude,
        longitude: selectedHospital.coordinates.longitude,
        latitudeDelta: 0.0024,
        longitudeDelta: 0.0021,
      }
    : selectedEvent
    ? {
        latitude: parseFloat(selectedEvent.latitude),
        longitude: parseFloat(selectedEvent.longitude),
        latitudeDelta: 0.0024,
        longitudeDelta: 0.0021,
      }
    : null;
  const defaultRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Show a message if location permission is cancelled */}
      {locationPermissionDenied && (
        <View style={styles.permissionDeniedContainer}>
          <Text style={styles.permissionDeniedText}>
            Location permission is required to show the route.
          </Text>
        </View>
      )}
      <MapView
        ref={mapViewRef} // Add this line to attach the ref to MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={initialRegion || defaultRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChangeComplete={(region) => {
          const limitedRegion = limitMapToMetroManila(region);
          mapViewRef.current?.animateToRegion(limitedRegion, 1000);
        }}
        onPanDrag={handleMapInteraction}
        onPress={handleMapInteraction}
      >
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={5}
          strokeColor="blue"
        />
        {parsedHospitals
          .filter((hospital) => !hospital.disabled)
          .map((hospital) => (
            <HospitalMarker
              key={hospital.id}
              data={hospital}
              setSelectedMarker={setSelectedMarker}
              styles={styles}
              type="hospital"
            />
          ))}
        {events.map((event) => (
          <HospitalMarker
            key={event.id}
            data={event}
            setSelectedMarker={setSelectedMarker}
            styles={styles}
            type="event"
          />
        ))}
      </MapView>
      <Modal
        transparent={true}
        animationType="fade"
        visible={loading}
        onRequestClose={() => {}}
      >
        <View style={styles.modalBackground}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: COLORS.background,
                fontSize: 15,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Loading fetching data...
            </Text>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </View>
      </Modal>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.bottomSheetContent}
        >
          {selectedMarker && selectedMarker.type === "hospital" ? (
            <View style={styles.topAlignedContent}>
              <View style={styles.rowContent}>
                <Image
                  source={{ uri: selectedHospital?.logoUrl }}
                  style={{ width: 60, height: 60 }}
                />
                <View style={[styles.columnContent, { marginLeft: 10 }]}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      source="hospital-building"
                      size={20}
                      color={COLORS.primary}
                    />
                    <Text style={styles.hospitalName}>
                      {selectedMarker?.name}
                    </Text>
                  </View>
                  <Text style={styles.address}>{selectedMarker?.address}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignselectedMarkers: "center",
                    }}
                  >
                    <Foundation
                      name="telephone"
                      size={15}
                      color={COLORS.primary}
                    />
                    <Text
                      style={{
                        margin: 5,
                        textDecorationLine: "underline",
                        color: COLORS.primary,
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      {selectedMarker?.contactNumber}
                    </Text>
                  </View>
                </View>
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.bloodTypeText}>
                The hospitals needs the following blood types:
              </Text>
              <View style={styles.bloodTypeContainer}>
                {DisplayedIcons.map(({ Icon, types }, index) => (
                  <View key={index} style={styles.bloodTypeselectedMarker}>
                    <Icon
                      width={30}
                      height={30}
                      fill={
                        selectedMarker?.stock
                          ?.filter((bt) => types.includes(bt.type))
                          .some((t) => t.available)
                          ? "red"
                          : "gray"
                      }
                      style={{ marginRight: 5 }}
                    />
                    <View style={styles.bloodTypeIndicators}>
                      {types.map((bb, bbIndex) => {
                        const positive = bb.includes("+");
                        let iconColor = selectedMarker?.stock?.filter(
                          (bt) => bb == bt.type
                        )[0]?.available
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
              <CustomButtonWithIcon
                icon={"plus-square"}
                iconSize={20}
                title={"Donate Blood"}
                onPress={() => router.push("/(app)/(user)/(home)/donate")}
                buttonStyle={{
                  borderRadius: 30,
                  width: "80%",
                  backgroundColor: "white",
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                }}
                iconColor={COLORS.primary}
                textStyle={{ fontSize: 15, color: COLORS.primary }}
              />
              <CustomButtonWithIcon
                icon={"location-arrow"}
                iconSize={20}
                title={"Drive to location"}
                onPress={openGoogleMapsForDriving}
                buttonStyle={{
                  borderRadius: 30,
                  width: "80%",
                  backgroundColor: "white",
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                }}
                iconColor={COLORS.primary}
                textStyle={{ fontSize: 15, color: COLORS.primary }}
              />
            </View>
          ) : selectedMarker && selectedMarker.type !== "hospital" ? (
            <View style={styles.topAlignedContent}>
              <Image
                source={{ uri: selectedMarker?.imageUrl }}
                style={{ width: "80%", height: 150, borderRadius: 10 }}
                contentFit="cover"
              />
              <View style={styles.rowContent}>
                <View style={[styles.columnContent, { marginLeft: 10 }]}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Fontisto name="blood" size={24} color={COLORS.primary} />
                    <Text style={styles.hospitalName}>
                      {selectedMarker?.title}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Fontisto
                      name="map"
                      size={24}
                      color="black"
                      marginRight={10}
                    />
                    <Text style={styles.address}>
                      {selectedMarker?.address}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Fontisto name="clock" size={24} color={COLORS.primary} />
                    <Text
                      style={{
                        margin: 5,
                        color: COLORS.primary,
                        fontSize: 15,
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      Start Date:{" "}
                      {formatDate(selectedMarker?.startDate) +
                        " - " +
                        selectedMarker?.startTime}
                      {"\n"}
                      End Date:{" "}
                      {formatDate(selectedMarker?.endDate) +
                        " - " +
                        selectedMarker?.endTime}
                    </Text>
                  </View>
                  <Text
                    style={{
                      margin: 10,
                      textAlign: "justify",
                      fontSize: 15,
                      fontFamily: "Poppins_700Bold",
                    }}
                  >
                    Event Details:
                    {"\n"}
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      {selectedMarker?.description}
                    </Text>
                  </Text>
                  <CustomButtonWithIcon
                    icon={"location-arrow"}
                    iconSize={20}
                    title={"Drive to location"}
                    onPress={openGoogleMapsForDriving}
                    buttonStyle={{
                      borderRadius: 30,
                      width: "80%",
                      backgroundColor: "white",
                      borderColor: COLORS.primary,
                      borderWidth: 1,
                    }}
                    iconColor={COLORS.primary}
                    textStyle={{ fontSize: 15, color: COLORS.primary }}
                  />
                </View>
              </View>
            </View>
          ) : null}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default HospitalMapView;
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetContent: {
    alignItems: "center",
  },
  topAlignedContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rowContent: {
    flexDirection: "row",
    alignselectedMarkers: "center",
    justifyContent: "center",
    left: 20,
  },
  columnContent: {
    flexDirection: "column",
  },
  hospitalName: {
    color: COLORS.primary,
    fontSize: 20,
    margin: 8,
    fontFamily: "Poppins_400Regular",
  },
  address: {
    width: "90%",
    fontFamily: "Poppins_400Regular",
  },
  divider: {
    margin: 10,
    width: "80%",
    height: 2,
  },
  bloodTypeText: {
    fontSize: 14,
    marginBottom: 15,
    fontFamily: "Poppins_400Regular",
  },
  bloodTypeContainer: {
    flexDirection: "row",
    gap: 10,
    alignselectedMarkers: "flex-start",
  },
  bloodTypeselectedMarker: {
    flexDirection: "row",
    alignselectedMarkers: "flex-start",
  },
  bloodTypeIndicators: {
    justifyContent: "center",
    alignselectedMarkers: "center",
    flexDirection: "column",
  },
  markerContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    padding: 5,
    borderRadius: 20,
    elevation: 5,
  },
  markerText: {
    color: COLORS.primary,
    fontFamily: "Poppins_700Bold",
    textAlignVertical: "center",
  },
  permissionDeniedContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
    padding: 10,
    zIndex: 1,
  },
  permissionDeniedText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
});
