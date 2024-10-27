import {
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import { COLORS } from "constants/theme";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import TextInputWrapper from "components/common/TextInputWrapper";
import { useDispatch } from "react-redux";
import { createHospital } from "rtx/slices/hospitals";
import { router, useNavigation } from "expo-router";

export default function ManageFaqCreate() {
  const [newHospitalName, setNewHospitalName] = useState("");
  const [newLogoUrl, setNewLogoUrl] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");
  const [newLatitude, setNewLatitude] = useState("");
  const [newLongtitude, setNewLongtitude] = useState("");
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
          onPress={handleCreate}
        >
          <Text style={{ fontWeight: "bold" }}>Add</Text>
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
    newLongtitude,
  ]);

  const handleCreate = () => {
    dispatch(
      createHospital({
        name: newHospitalName,
        logoUrl: newLogoUrl,
        address: newAddress,
        contactNumber: newContactNumber,
        coordinates: {
          latitude: parseFloat(newLatitude),
          longtitude: parseFloat(newLongtitude),
        },
        stock: [],
      })
    );
    // addFAQToFirebase(newTitle, newQuestion, newAnswer);
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
        <TextInputWrapper label="Longtitude">
          <TextInput
            value={newLongtitude}
            onChangeText={(number) => setNewLongtitude(number)}
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
