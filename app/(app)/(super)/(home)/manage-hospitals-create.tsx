import {
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Button,
  View,
  Switch,
} from "react-native";
import { useEffect, useState } from "react";
import { COLORS } from "constants/theme";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import TextInputWrapper from "components/common/TextInputWrapper";
import { useDispatch } from "react-redux";
import {
  addHospitalToFirebase,
  createHospital,
  getHospitals,
} from "rtx/slices/hospitals";
import { router, useNavigation } from "expo-router";
import { AppDispatch } from "app/store";

export default function ManageFaqCreate() {
  const [newHospitalName, setNewHospitalName] = useState("");
  const [newLogoUrl, setNewLogoUrl] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");
  const [newLatitude, setNewLatitude] = useState("");
  const [newLongitude, setNewLongitude] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            padding: 12,
            borderRadius: 10,
            width: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleCreate}
        >
          <Text style={{ fontFamily: "Poppins_700Bold" }}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    newHospitalName,
    newLogoUrl,
    newAddress,
    newContactNumber,
    newLatitude,
    newLongitude,
  ]);
  const handleCreate = () => {
    dispatch(
      createHospital({
        disabled: false,
        name: newHospitalName,
        logoUrl: newLogoUrl,
        address: newAddress,
        contactNumber: newContactNumber,
        coordinates: {
          latitude: parseFloat(newLatitude),
          longitude: parseFloat(newLongitude),
        },
        stock: [
          { type: "O+", available: false },
          { type: "O-", available: false },
          { type: "A+", available: false },
          { type: "A-", available: false },
          { type: "B+", available: false },
          { type: "B-", available: false },
          { type: "AB+", available: false },
          { type: "AB-", available: false },
        ],
        incentives: {
          info: "",
          number: 4,
          data: [],
        },
      })
    );
    addHospitalToFirebase(
      false,
      newHospitalName,
      newLogoUrl,
      newAddress,
      newContactNumber,
      parseFloat(newLatitude),
      parseFloat(newLongitude),
      [
        { type: "A+", available: false },
        { type: "A-", available: false },
        { type: "B+", available: false },
        { type: "B-", available: false },
        { type: "AB+", available: false },
        { type: "AB-", available: false },
        { type: "O+", available: false },
        { type: "O-", available: false },
      ],
      {
        info: "",
        number: 4,
        data: [],
      }
    );
    router.back();
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Hospital",
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
      },
      headerTitleAlign: "center",
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollview}
        overScrollMode="never"
        persistentScrollbar={true}
      >
        <TextInputWrapper label="Name">
          <TextInput
            value={newHospitalName}
            onChangeText={(text) => setNewHospitalName(text)}
            placeholder="Enter a hospital name..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            multiline={true}
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Logo Url">
          <TextInput
            value={newLogoUrl}
            onChangeText={(text) => setNewLogoUrl(text)}
            placeholder="Enter a logo url..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            multiline={true}
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Address">
          <TextInput
            value={newAddress}
            onChangeText={(text) => setNewAddress(text)}
            placeholder="Enter an address..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            multiline={true}
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Contact Number">
          <TextInput
            value={newContactNumber}
            onChangeText={(text) => setNewContactNumber(text)}
            placeholder="Enter a contact number..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            keyboardType="number-pad"
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Latitude">
          <TextInput
            value={newLatitude}
            onChangeText={(number) => setNewLatitude(number)}
            placeholder="Enter a latitude..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            keyboardType="number-pad"
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Longitude">
          <TextInput
            value={newLongitude}
            onChangeText={(number) => setNewLongitude(number)}
            placeholder="Enter a longitude..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            keyboardType="number-pad"
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollview: {
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: 16,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  blood: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
  },
  detail: {
    fontFamily: "Poppins_700Bold",
  },
});
