import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES } from "../../../constants";
import { MINOR_COMPONENT_HEIGHT } from "constants/measurements";
import DropDownPicker from "react-native-dropdown-picker";
import CallToActionBtn from "components/common/CallToActionBtn";
import { firestoreOperations } from "../../../firestore-services";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";

export default function RequestBloodunitScreen() {
  const [patientName, setPatientName] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedRelationship, setSelectedRelationship] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [openBloodType, setOpenBloodType] = useState(false);
  const [openRelationship, setOpenRelationship] = useState(false);

  const bloodTypes = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ];
  const relationships = [
    { label: "Myself", value: "myself" },
    { label: "Parent", value: "parent" },
    { label: "Sibling", value: "sibling" },
    { label: "Spouse", value: "spouse" },
    { label: "Child", value: "child" },
    { label: "Relative", value: "relative" },
    { label: "Friend", value: "friend" },
    { label: "Caregiver", value: "caregiver" },
    { label: "Other", value: "other" },
  ];
  const handleContactNumberChange = (text) => {
    const cleanedText = text.replace(/\D/g, "");

    const formattedText = cleanedText.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1 $2 $3"
    );

    setContactNumber(formattedText);
  };
  const auth = getAuth();
  const user = auth.currentUser;
  const handleSubmit = async () => {
    try {
      const documentData = {
        patientName,
        selectedBloodType,
        selectedRelationship,
        contactNumber: "+63" + contactNumber.replace(/\s/g, ""),
        userId: auth.currentUser?.uid,
      };

      const documentId = await firestoreOperations.addDocument(
        "ticketRequest",
        documentData
      );
      console.log(`Added new document with ID: ${documentId}`);
      Alert.alert(
        "Success",
        "Document added successfully, Click OK to go back",
        [
          {
            text: "OK",
            onPress: () => {
              router.back();
              router.replace("/(app)/(tabs)");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File A Request</Text>

      <Text style={styles.header}>I Am Requesting For...</Text>
      {/* <TextInputWrapper label="Password">
              <TextInput
                value={password}
                placeholder="Enter your password..."
                onChangeText={(password) => setPassword(password)}
                autoCapitalize="none"
                autoCorrect={true}
                enablesReturnKeyAutomatically
                secureTextEntry={passwordVisibility}
              />
              <Pressable onPress={handlePasswordVisibility}>
                <Ionicons
                  name={rightIcon}
                  size={SIZES.xLarge}
                  color={COLORS.gray}
                />
              </Pressable>
            </TextInputWrapper> */}

      <Text style={styles.header}>Blood Type</Text>
      {/* <<<<<<< Updated upstream
      <DropDownPicker
        open={openBloodType}
        value={selectedBloodType}
        items={bloodTypes}
        setOpen={setOpenBloodType}
        setValue={setSelectedBloodType}
        placeholder="Select the blood type"
=======

      {/* <DropDownPicker
        open={open}
        value={selectedHospital}
        items={hospitals}
        setOpen={setOpen}
        setValue={setSelectedHospital}
        placeholder="Select a hospital"
>>>>>>> Stashed changes
        style={styles.inputContainer}
        labelStyle={styles.inputLabel}
      />

      <Text style={styles.header}>Patient's Name</Text>
      <TextInput
        style={styles.inputContainer}
        onChangeText={setPatientName}
        value={patientName}
        placeholder="Enter patient's name"
      />

      <Text style={styles.header}>Relationship To Patient</Text>
      <DropDownPicker
        open={openRelationship}
        value={selectedRelationship}
        items={relationships}
        setOpen={setOpenRelationship}
        setValue={setSelectedRelationship}
        placeholder="Select relationship to patient"
        style={styles.inputContainer}
        labelStyle={styles.inputLabel}
      />
      <Text style={styles.header}>Contact Information</Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, marginRight: 12 }}>+63</Text>
        <TextInput
          style={[styles.inputContainer, { width: "90%" }]}
          onChangeText={handleContactNumberChange}
          value={contactNumber}
          placeholder="912 345 6789"
          keyboardType="phone-pad"
          maxLength={12}
        />
      </View>

      <Text style={styles.header}>Upload Blood Request Form</Text>
      <Button
        title="Upload File"
        onPress={() => {
          // Add your file upload logic here
        }}
      />
      <View style={styles.fixed}>
        <CallToActionBtn
          label="submit"
          onPress={handleSubmit}
          style={{ flex: 1 }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
    gap: 12,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  header: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  fixed: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    width: "80%",
  },
  inputContainer: {
    width: "100%",
    height: MINOR_COMPONENT_HEIGHT,
    padding: SIZES.xSmall,
    borderWidth: 1,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.gray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SIZES.xxxSmall,
  },
  inputLabel: {
    textTransform: "capitalize",
    backgroundColor: COLORS.white,
    paddingHorizontal: 4,
    borderRadius: 50,
  },
});
