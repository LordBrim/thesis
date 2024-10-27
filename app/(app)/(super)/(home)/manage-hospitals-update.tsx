import {
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "constants/theme";
import TextInputWrapper from "components/common/TextInputWrapper";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import { updateFAQInFirebase, updateQuestion } from "rtx/slices/faq";
import { updateHospital } from "rtx/slices/hospitals";

export default function ManageFaqUpdate() {
  const { name, logoUrl, address, contactNumber, latitude, longtitude, stock } =
    useLocalSearchParams();
  const [oldHospitalName, setOldHospitalName] = useState(name);
  // const [oldLogoUrl, setOldLogoUrl] = useState(logoUrl);
  // const [oldAddress, setOldAddress] = useState(address);
  // const [oldContactNumber, setOldContactNumber] = useState(contactNumber);
  // const [oldLatitude, setOldLatitude] = useState(latitude);
  // const [oldLongtitude, setOldLongtitude] = useState(longtitude);
  // const [oldStock, setOldStock] = useState(stock);
  const [updatedHospitalName, setUpdatedHospitalName] = useState(name);
  const [updatedLogoUrl, setUpdatedLogoUrl] = useState(logoUrl);
  const [updatedAddress, setUpdatedAddress] = useState(address);
  const [updatedContactNumber, setUpdatedContactNumber] =
    useState(contactNumber);
  const [updatedLatitude, setUpdatedLatitude] = useState(latitude);
  const [updatedLongtitude, setUpdatedLongtitude] = useState(longtitude);
  const [updatedStock, setUpdatedStock] = useState(stock);

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
          <Text style={{ fontWeight: "bold" }}>Save</Text>
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
    updatedLongtitude,
    updatedStock,
  ]);

  const handleUpdate = () => {
    dispatch(
      updateHospital({
        oldName: oldHospitalName.toString(),
        updatedHospital: {
          name: updatedHospitalName.toString(),
          logoUrl: updatedLogoUrl.toString(),
          address: updatedAddress.toString(),
          contactNumber: updatedContactNumber.toString(),
          coordinates: {
            latitude: parseFloat(updatedLatitude.toString()),
            longtitude: parseFloat(updatedLongtitude.toString()),
          },
          stock: [],
        },
      })
    );
    // updateFAQInFirebase(
    //   oldTitle,
    //   {
    //     question: oldQuestion,
    //     answer: oldAnswer,
    //   },
    //   { question: updatedQuestion, answer: updatedAnswer }
    // );
    router.back();
  };

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
              padding: 12,
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
              padding: 12,
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
              padding: 12,
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
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Latitude">
          <TextInput
            value={updatedLatitude}
            onChangeText={(number) => setUpdatedLatitude(number)}
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
        <TextInputWrapper label="Longtitude">
          <TextInput
            value={updatedLongtitude}
            onChangeText={(number) => setUpdatedLongtitude(number)}
            placeholder="Enter a longtitude..."
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
});
