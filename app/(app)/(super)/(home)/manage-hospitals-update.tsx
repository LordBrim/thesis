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
  const [updatedStock, setUpdatedStock] = useState(hospital.stock);
  const [isEnabledAplus, toggleAplus] = useState(updatedStock[0].available);
  const [isEnabledAminus, toggleAminus] = useState(updatedStock[1].available);
  const [isEnabledBplus, toggleBplus] = useState(updatedStock[2].available);
  const [isEnabledBminus, toggleBminus] = useState(updatedStock[3].available);
  const [isEnabledABplus, toggleABplus] = useState(updatedStock[4].available);
  const [isEnabledABminus, toggleABminus] = useState(updatedStock[5].available);
  const [isEnabledOplus, toggleOplus] = useState(updatedStock[6].available);
  const [isEnabledOminus, toggleOminus] = useState(updatedStock[7].available);
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
    updatedLongitude,
    updatedStock,
    isEnabledAplus,
    isEnabledAminus,
    isEnabledBplus,
    isEnabledBminus,
    isEnabledABplus,
    isEnabledABminus,
    isEnabledOplus,
    isEnabledOminus,
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
          stock: [
            { type: updatedStock[0].type, available: isEnabledAplus },
            { type: updatedStock[1].type, available: isEnabledAminus },
            { type: updatedStock[2].type, available: isEnabledBplus },
            { type: updatedStock[3].type, available: isEnabledBminus },
            { type: updatedStock[4].type, available: isEnabledABplus },
            { type: updatedStock[5].type, available: isEnabledABminus },
            { type: updatedStock[6].type, available: isEnabledOplus },
            { type: updatedStock[7].type, available: isEnabledOminus },
          ],
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
      stock: [
        { type: updatedStock[0].type, available: isEnabledAplus },
        { type: updatedStock[1].type, available: isEnabledAminus },
        { type: updatedStock[2].type, available: isEnabledBplus },
        { type: updatedStock[3].type, available: isEnabledBminus },
        { type: updatedStock[4].type, available: isEnabledABplus },
        { type: updatedStock[5].type, available: isEnabledABminus },
        { type: updatedStock[6].type, available: isEnabledOplus },
        { type: updatedStock[7].type, available: isEnabledOminus },
      ],
    });
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
            value={updatedLongitude}
            onChangeText={(number) => setUpdatedLongitude(number)}
            placeholder="Enter a longtitude..."
            autoCapitalize="none"
            enablesReturnKeyAutomatically
            keyboardType="number-pad"
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>

        <View style={styles.row}>
          {/* Type A */}
          <View style={styles.column}>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[0].type}</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledAplus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleAplus(!isEnabledAplus)}
                value={isEnabledAplus}
              />
            </View>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[1].type}</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledAminus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleAminus(!isEnabledAminus)}
                value={isEnabledAminus}
              />
            </View>
          </View>
          {/* Type B */}
          <View style={styles.column}>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[2].type}</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledBplus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleBplus(!isEnabledBplus)}
                value={isEnabledBplus}
              />
            </View>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[3].type}</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledBminus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleBminus(!isEnabledBminus)}
                value={isEnabledBminus}
              />
            </View>
          </View>
          {/* Type AB */}
          <View style={styles.column}>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[4].type}</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledABplus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleABplus(!isEnabledABplus)}
                value={isEnabledABplus}
              />
            </View>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[5].type}</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledABminus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleABminus(!isEnabledABminus)}
                value={isEnabledABminus}
              />
            </View>
          </View>
          {/* Type O */}
          <View style={styles.column}>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[6].type}</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledOplus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleOplus(!isEnabledOplus)}
                value={isEnabledOplus}
              />
            </View>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[7].type}</Text>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={isEnabledOminus ? "white" : "#f4f3f4"}
                onValueChange={() => toggleOminus(!isEnabledOminus)}
                value={isEnabledOminus}
              />
            </View>
          </View>
        </View>
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
    fontWeight: "bold",
  },
});
