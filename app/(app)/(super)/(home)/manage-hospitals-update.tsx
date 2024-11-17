import {
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "constants/theme";
import TextInputWrapper from "components/common/TextInputWrapper";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateHospital, updateHospitalByUuid } from "rtx/slices/hospitals";
import { View } from "react-native";
import { RootState } from "app/store";

export default function ManageFaqUpdate() {
  const { uuid } = useLocalSearchParams();
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const hospital = hospitals.find((item) => item.uuid === uuid);
  const [updatedHospitalName, setUpdatedHospitalName] = useState(hospital.name);
  const [updatedLogoUrl, setUpdatedLogoUrl] = useState(hospital.logoUrl);
  const [updatedAddress, setUpdatedAddress] = useState(hospital.address);
  const [updatedContactNumber, setUpdatedContactNumber] = useState(
    hospital.contactNumber
  );
  const [updatedLatitude, setUpdatedLatitude] = useState(
    hospital.coordinates.latitude.toString()
  );
  const [updatedLongitude, setUpdatedLongitude] = useState(
    hospital.coordinates.longitude.toString()
  );
  const dispatch = useDispatch();
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
          onPress={handleUpdate}
        >
          <Text style={{ fontFamily: "Poppins_700Bold" }}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    updatedHospitalName,
    updatedLogoUrl,
    updatedAddress,
    updatedContactNumber,
    updatedLatitude,
    updatedLongitude,
  ]);
  const handleUpdate = () => {
    dispatch(
      updateHospital({
        uuid: uuid.toString(),
        updatedHospital: {
          uuid: hospital.uuid,
          name: updatedHospitalName,
          logoUrl: updatedLogoUrl,
          address: updatedAddress,
          contactNumber: updatedContactNumber,
          coordinates: {
            latitude: parseFloat(updatedLatitude),
            longitude: parseFloat(updatedLongitude),
          },
          stock: hospital.stock,
          incentives: hospital.incentives,
        },
      })
    );
    updateHospitalByUuid(uuid.toString(), {
      name: updatedHospitalName,
      address: updatedAddress,
      contactNumber: updatedContactNumber,
      logoUrl: updatedLogoUrl,
      coordinates: {
        latitude: parseFloat(updatedLatitude),
        longitude: parseFloat(updatedLongitude),
      },
    });
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
            value={updatedHospitalName}
            onChangeText={(text) => setUpdatedHospitalName(text)}
            placeholder="Enter a hospital name..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            multiline={true}
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingTop: 16,
              paddingBottom: 8,
              fontFamily: "Poppins_400Regular",
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Logo Url">
          <TextInput
            value={updatedLogoUrl}
            onChangeText={(text) => setUpdatedLogoUrl(text)}
            placeholder="Enter a logo url..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            multiline={true}
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingTop: 16,
              paddingBottom: 8,
              fontFamily: "Poppins_400Regular",
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Address">
          <TextInput
            value={updatedAddress}
            onChangeText={(text) => setUpdatedAddress(text)}
            placeholder="Enter an address..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            multiline={true}
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingTop: 16,
              paddingBottom: 8,
              fontFamily: "Poppins_400Regular",
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Contact Number">
          <TextInput
            value={updatedContactNumber}
            onChangeText={(text) => setUpdatedContactNumber(text)}
            placeholder="Enter a contact number..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            keyboardType="number-pad"
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingTop: 16,
              paddingBottom: 8,
              fontFamily: "Poppins_400Regular",
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Latitude">
          <TextInput
            value={updatedLatitude}
            onChangeText={(number) => setUpdatedLatitude(number)}
            placeholder="Enter a latitude..."
            autoCapitalize="none"
            enablesReturnKeyAutomatically
            keyboardType="number-pad"
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingTop: 16,
              paddingBottom: 8,
              fontFamily: "Poppins_400Regular",
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Longtitude">
          <TextInput
            value={updatedLongitude}
            onChangeText={(number) => setUpdatedLongitude(number)}
            placeholder="Enter a longtitude..."
            autoCapitalize="none"
            enablesReturnKeyAutomatically
            keyboardType="number-pad"
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingTop: 16,
              paddingBottom: 8,
              fontFamily: "Poppins_400Regular",
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
    justifyContent: "center",
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
