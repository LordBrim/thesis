// import React, { useEffect, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
//   Easing,
// } from "react-native";
// // import Divider from "../../../components/Divider";
// import { useNavigation } from "@react-navigation/native";
// import { COLORS, FONT, SIZES, SHADOWS } from "../../../constants/theme";
// import { mapStyle } from "../../../components/maps/mapStyle";
// import BackButton from "../../../constants/backButton";
// import HospitalMapView from "../../../components/maps/hospitalMapView";
// const hospitals = [
//   {
//     id: 1,
//     name: "UERM Hospital",
//     coordinates: { latitude: 14.607184, longitude: 121.020384 },
//     address: "64 Aurora Blvd, Quezon City, 1113 Metro Manila",
//     logoUrl: { uri: "https://via.placeholder.com/150" },
//     bloodBanks: [
//       { bloodType: "A+", quantity: 0 },
//       { bloodType: "A-", quantity: 0 },
//       { bloodType: "B+", quantity: 10 },
//       { bloodType: "B-", quantity: 10 },
//       { bloodType: "AB+", quantity: 10 },
//       { bloodType: "AB-", quantity: 10 },
//       { bloodType: "O+", quantity: 10 },
//       { bloodType: "O-", quantity: 0 },
//     ],
//   },
//   {
//     id: 2,
//     name: "De Los Santos Medical Center",
//     coordinates: { latitude: 14.6200998, longitude: 121.0175533 },
//     address: "201 E Rodriguez Sr. Ave, Quezon City, 1112 Metro Manila",
//     logoUrl: { uri: "https://via.placeholder.com/150" },

//     bloodBanks: [
//       { bloodType: "A+", quantity: 10 },
//       { bloodType: "A-", quantity: 0 },
//       { bloodType: "B+", quantity: 10 },
//       { bloodType: "B-", quantity: 10 },
//       { bloodType: "AB+", quantity: 10 },
//       { bloodType: "AB-", quantity: 10 },
//       { bloodType: "O+", quantity: 0 },
//       { bloodType: "O-", quantity: 0 },
//     ],
//   },
//   {
//     id: 3,
//     name: "Our Lady of Lourdes Hospital",
//     coordinates: { latitude: 14.5949547, longitude: 121.0199822 },
//     address: "46 P. Sanchez St, Santa Mesa, Manila, 1016 Metro Manila",
//     logoUrl: { uri: "https://via.placeholder.com/150" },
//     bloodBanks: [
//       { bloodType: "A+", quantity: 0 },
//       { bloodType: "A-", quantity: 0 },
//       { bloodType: "B+", quantity: 10 },
//       { bloodType: "B-", quantity: 10 },
//       { bloodType: "AB+", quantity: 10 },
//       { bloodType: "AB-", quantity: 10 },
//       { bloodType: "O+", quantity: 0 },
//       { bloodType: "O-", quantity: 0 },
//     ],
//   },
//   {
//     id: 4,
//     name: "Quirino Memorial Medical Center",
//     coordinates: { latitude: 14.6222558, longitude: 121.0702733 },
//     address: "Project 4, Quezon City, 1109 Metro Manila",
//     logoUrl: { uri: "https://via.placeholder.com/150" },
//     bloodBanks: [
//       { bloodType: "A+", quantity: 0 },
//       { bloodType: "A-", quantity: 0 },
//       { bloodType: "B+", quantity: 10 },
//       { bloodType: "B-", quantity: 10 },
//       { bloodType: "AB+", quantity: 10 },
//       { bloodType: "AB-", quantity: 10 },
//       { bloodType: "O+", quantity: 0 },
//       { bloodType: "O-", quantity: 0 },
//     ],
//   },
// ];

// function Maps({ setMapBackground, setMapHeader }) {
//   const [selectedHospital, setSelectedHospital] = useState(null);
//   const [pressedButtonId, setPressedButtonId] = useState(null);

//   const navigation = useNavigation();
//   const [isMarkerSelected, setIsMarkerSelected] = useState(false);

//   useEffect(() => {
//     setIsMarkerSelected(selectedHospital !== null);
//     navigation.setOptions({ isMarkerSelected });
//   }, [selectedHospital, navigation]);

//   const focusMap = (hospital) => {
//     setSelectedHospital(hospital);

//     selectedHospital?.current.animateCamera(
//       {
//         center: {
//           latitude: hospital.coordinates.latitude,
//           longitude: hospital.coordinates.longitude,
//         },
//       },
//       { duration: 1000 },
//       { easing: Easing.linear },
//       zoomTo(18)
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {!selectedHospital && (
//         <View style={{ width: "90%" }}>
//           <Text style={styles.header}>
//             Map <Text style={{ color: COLORS.redWhite }}>Locator</Text>
//           </Text>
//           <Text style={styles.subHeader}>
//             Display all affiliated hospitals in the map.
//           </Text>
//         </View>
//       )}
//       {/* {!selectedHospital && <Divider marginTop={30} marginBottom={30} />} */}
//       {!selectedHospital &&
//         hospitals.map((hospital) => (
//           <TouchableWithoutFeedback
//             key={hospital.id}
//             onPressIn={() => setPressedButtonId(hospital.id)}
//             onPressOut={() => setPressedButtonId(null)}
//             onPress={() => focusMap(hospital)}
//           >
//             <View
//               style={
//                 hospital.id === pressedButtonId
//                   ? styles.buttonHospitalPressed
//                   : styles.buttonHospital
//               }
//             >
//               <Text
//                 style={
//                   hospital.id === pressedButtonId
//                     ? styles.textHospitalPressed
//                     : styles.textHospital
//                 }
//               >
//                 {hospital.name}
//               </Text>
//             </View>
//           </TouchableWithoutFeedback>
//         ))}
//       {selectedHospital && (
//         <HospitalMapView
//           mapStyle={mapStyle}
//           selectedHospital={selectedHospital}
//           setSelectedHospital={setSelectedHospital}
//           setPressedButtonId={setPressedButtonId}
//           hospitals={hospitals}
//           navigation={navigation}
//           goBack={() => {
//             setPressedButtonId(null);
//             setSelectedHospital(null);
//           }}
//           styles={styles}
//           // setMapBackground={setMapBackground}
//           // setMapHeader={setMapHeader}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: "100%",
//     alignItems: "center",
//     backgroundColor: COLORS.white,
//   },
//   buttonHospital: {
//     width: "80%",
//     padding: SIZES.medium,
//     marginVertical: SIZES.small,
//     backgroundColor: "white",
//     borderWidth: 2,
//     borderRadius: 10,
//     elevation: 5,
//     borderColor: COLORS.gray2,
//   },
//   buttonHospitalPressed: {
//     // your button styles when pressed
//     width: "85%",
//     padding: SIZES.medium,
//     marginVertical: SIZES.medium,
//     backgroundColor: "white",
//     borderWidth: 2,
//     elevation: 5,
//     borderRadius: 10,
//     borderColor: COLORS.gray,
//     backgroundColor: COLORS.redWhite,
//     borderColor: COLORS.redWhite,
//   },
//   textHospital: {
//     fontSize: SIZES.large,
//     textAlign: "left",
//     color: COLORS.black,
//   },
//   textHospitalPressed: {
//     // your text styles when button is pressed
//     fontSize: SIZES.large,
//     textAlign: "left",
//     color: "white",
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
//   buttonContainer: {
//     position: "absolute", //use absolute position to show button on top of the map
//     bottom: "10%", //for center align
//     alignSelf: "center", //for align to right
//     backgroundColor: COLORS.red,
//   },
//   markerContainer: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     padding: 5,
//     borderRadius: 5,
//     elevation: 5,
//   },
//   markerText: {
//     color: "#000",
//   },
//   markerImage: {
//     width: 25,
//     height: 25,
//   },
//   fab: {
//     position: "absolute",
//     backgroundColor: "white",
//     borderRadius: 10,
//     borderColor: COLORS.gray,
//     borderWidth: 1,
//     width: 100,
//     shadowColor: "black",
//     elevation: 5,
//     flexDirection: "row",
//     margin: 16,
//     left: 0,
//     top: 0,
//     zIndex: 6,
//   },
//   header: {
//     fontSize: SIZES.xLarge,
//     marginBottom: SIZES.medium,
//     marginTop: 30,
//   },
//   subHeader: {
//     fontSize: SIZES.medium,
//   },
//   infoBottom: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "white",
//     padding: 10,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//   },
//   infoTop: {
//     position: "absolute",
//     zIndex: 5,
//     height: 120,
//     left: 0,
//     right: 0,
//     top: 0,
//     paddingTop: 20,
//     backgroundColor: COLORS.redTop,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     padding: 10,
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//   },
//   infoTopTitle: {
//     fontSize: SIZES.xLarge,
//     fontWeight: "bold",
//     color: COLORS.white,
//   },
//   infoTopDistance: {
//     fontSize: SIZES.medium,
//     color: COLORS.white,
//   },
// });

// export default Maps;
