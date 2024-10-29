import {
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "constants/theme";
import TextInputWrapper from "components/common/TextInputWrapper";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateFAQInFirebase, updateQuestion } from "rtx/slices/faq";
import { updateHospital } from "rtx/slices/hospitals";
import { View } from "react-native";
import { RootState } from "app/store";

export default function ManageFaqUpdate() {
  const { name } = useLocalSearchParams();
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const hospital = hospitals.find((item) => item.name === name);

  const [oldHospitalName, setOldHospitalName] = useState(hospital.name);
  const [updatedHospitalName, setUpdatedHospitalName] = useState(hospital.name);
  const [updatedLogoUrl, setUpdatedLogoUrl] = useState(hospital.logoUrl);
  const [updatedAddress, setUpdatedAddress] = useState(hospital.address);
  const [updatedContactNumber, setUpdatedContactNumber] = useState(
    hospital.contactNumber
  );
  const [updatedLatitude, setUpdatedLatitude] = useState(
    hospital.coordinates.latitude.toString()
  );
  const [updatedLongtitude, setUpdatedLongtitude] = useState(
    hospital.coordinates.longtitude.toString()
  );
  const [updatedStock, setUpdatedStock] = useState(hospital.stock);
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
        oldName: oldHospitalName,
        updatedHospital: {
          name: updatedHospitalName,
          logoUrl: updatedLogoUrl,
          address: updatedAddress,
          contactNumber: updatedContactNumber,
          coordinates: {
            latitude: parseInt(updatedLatitude),
            longtitude: parseInt(updatedLongtitude),
          },
          stock: updatedStock,
        },
      })
    );
    // TODO: Update in firebase
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

        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[0].type}</Text>
              <StockItem available={updatedStock[0].available} />
            </View>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[1].type}</Text>
              <StockItem available={updatedStock[1].available} />
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[2].type}</Text>
              <StockItem available={updatedStock[2].available} />
            </View>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[3].type}</Text>
              <StockItem available={updatedStock[3].available} />
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[4].type}</Text>
              <StockItem available={updatedStock[4].available} />
            </View>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[5].type}</Text>
              <StockItem available={updatedStock[5].available} />
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[6].type}</Text>
              <StockItem available={updatedStock[6].available} />
            </View>
            <View style={styles.blood}>
              <Text style={styles.detail}>{updatedStock[7].type}</Text>
              <StockItem available={updatedStock[7].available} />
            </View>
          </View>
        </View>

        {/* <FlatList
          data={updatedStock}
          renderItem={({ item }) => (
            <View
              style={styles.blood}
            >
              <Text style={styles.detail}>{item.type}</Text>
              <StockItem available={item.available} />
            </View>
          )}
          keyExtractor={(item) => item.type.toString()}
          overScrollMode="never"
          scrollEnabled={false}
          contentContainerStyle={{ gap: 16 }}
          numColumns={updatedStock.length / 2}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const StockItem = (available) => {
  const [isEnabled, setIsEnabled] = useState(available.available);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

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
