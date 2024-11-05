import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
} from "react-native";
import React, { useState, useRef } from "react";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES } from "../../../../constants";
import { MINOR_COMPONENT_HEIGHT } from "../../../../constants/measurements";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import RadioGroup from "react-native-radio-buttons-group";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButtonWithIcon from "../../../../components/common/CustomButtonWithIcons";
import IconModal from "../../(common)/custom-album-modal";

export default function RequestBloodunitScreen({
  patientName,
  setPatientName,
  selectedBloodType,
  setSelectedBloodType,
  selectedRelationship,
  setSelectedRelationship,
  contactNumber,
  setContactNumber,
  setImageUri,
  imageUri,
  isEmergency,
  setIsEmergency,
  emergencyReason,
  setEmergencyReason,
  packedRequest,
  setPackedRequest,
  packedRequestInfo,
  setPackedRequestInfo,
  errors,
  setErrors,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [radioButtons, setRadioButtons] = useState([
    { id: "1", label: "Yes", value: "yes", selected: isEmergency },
    { id: "2", label: "No", value: "no", selected: !isEmergency },
  ]);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const bloodTypePickerRef = useRef();
  const relationshipPickerRef = useRef();
  const transfusionPickerRef = useRef();

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

  const handleImagePicker = async (type) => {
    let result;
    if (type === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
    }

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const source = { uri: result.assets[0].uri };
      console.log(source);
      setImageUri(source.uri);
    }
    setModalVisible(false);
  };

  const handleRadioChange = (radioButtonsArray) => {
    console.log("radioButtonsArray:", radioButtonsArray); // Debugging
    let selectedButton;

    if (Array.isArray(radioButtonsArray)) {
      selectedButton = radioButtonsArray.find((button) => button.selected);
    } else if (typeof radioButtonsArray === "object") {
      selectedButton = radioButtonsArray;
    }
    if (selectedButton) {
      setIsEmergency(selectedButton.value === "yes");
      setRadioButtons([selectedButton]);
    } else {
      console.error("No button selected");
    }
  };

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "patientName":
        if (!value) error = "Patient's name is required.";
        break;
      case "selectedBloodType":
        if (!value) error = "Blood type is required.";
        break;
      case "selectedRelationship":
        if (!value) error = "Relationship to patient is required.";
        break;
      case "contactNumber":
        if (!value) error = "Contact number is required.";
        else if (!/^\d{3} \d{3} \d{4}$/.test(value))
          error = "Contact number is invalid.";
        break;
      case "emergencyReason":
        if (isEmergency && !value) error = "Emergency reason is required.";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollViewContainer}
      extraScrollHeight={Platform.OS === "ios" ? 20 : 0}
      enableOnAndroid={true}
    >
      <View style={styles.container}>
        <Text style={styles.title}>File A Request</Text>
        <Text
          style={{
            color: COLORS.secondary,
            fontSize: 15,
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          Please ensure all fields are completed before submission. Incomplete
          requests will not be processed.
        </Text>
        <Text style={styles.header}>Patient's Name</Text>
        <TextInput
          style={styles.inputContainer}
          onChangeText={(text) => {
            setPatientName(text);
            validateField("patientName", text);
          }}
          value={patientName}
          placeholder="Enter patient's name"
        />
        {errors.patientName && (
          <Text style={styles.errorText}>{errors.patientName}</Text>
        )}
        <Text style={styles.header}>Blood Type</Text>
        <View style={styles.picker}>
          <Picker
            ref={bloodTypePickerRef}
            selectedValue={selectedBloodType}
            onValueChange={(itemValue) => {
              setSelectedBloodType(itemValue);
              validateField("selectedBloodType", itemValue);
            }}
            mode="dropdown"
          >
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
          </Picker>
        </View>
        {errors.selectedBloodType && (
          <Text style={styles.errorText}>{errors.selectedBloodType}</Text>
        )}
        <Text style={styles.header}>Transfusion</Text>
        <View style={styles.picker}>
          <Picker
            ref={transfusionPickerRef}
            selectedValue={packedRequest}
            onValueChange={(itemValue) => setPackedRequest(itemValue)}
            mode="dropdown"
          >
            <Picker.Item label="Whole Blood" value="Whole Blood" />
            <Picker.Item label="Packed RBC" value="Packed RBC" />
            <Picker.Item label="Washed RBC" value="Washed RBC" />
            <Picker.Item label="Platelet" value="Platelet" />
            <Picker.Item
              label="Fresh Frozen Plasma"
              value="Fresh Frozen Plasma"
            />
            <Picker.Item label="Cryoprecipitate" value="Cryoprecipitate" />
            <Picker.Item label="Albumin" value="Albumin" />
            <Picker.Item label="Immunoglobulin" value="Immunoglobulin" />
            <Picker.Item
              label="Factor Concentrate"
              value="Factor Concentrate"
            />
            <Picker.Item label="Cord Blood" value="Cord Blood" />
            <Picker.Item label="Stem Cells" value="Stem Cells" />
            <Picker.Item label="Bone Marrow" value="Bone Marrow" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
        <TextInput
          style={styles.inputContainer}
          onChangeText={setPackedRequestInfo}
          value={packedRequestInfo}
          placeholder="Additional Information"
        />
        <Text style={styles.header}>Relationship To Patient</Text>
        <View style={styles.picker}>
          <Picker
            ref={relationshipPickerRef}
            selectedValue={selectedRelationship}
            onValueChange={(itemValue) => {
              setSelectedRelationship(itemValue);
              validateField("selectedRelationship", itemValue);
            }}
            mode="dropdown"
          >
            {relationships.map((relationship) => (
              <Picker.Item
                key={relationship.value}
                label={relationship.label}
                value={relationship.value}
              />
            ))}
          </Picker>
        </View>
        {errors.selectedRelationship && (
          <Text style={styles.errorText}>{errors.selectedRelationship}</Text>
        )}
        <Text style={styles.header}>Is this request an Emergency?</Text>
        <RadioGroup
          radioButtons={[
            {
              id: "yes",
              label: "Yes",
              value: "Yes",
              color: selectedId === "yes" ? COLORS.black : undefined,
              labelStyle:
                selectedId === "yes"
                  ? { fontWeight: "bold", color: COLORS.black }
                  : undefined,
            },
            {
              id: "no",
              label: "No",
              value: "No",
              color: selectedId === "no" ? COLORS.black : undefined,
              labelStyle:
                selectedId === "no"
                  ? { fontWeight: "bold", color: COLORS.black }
                  : undefined,
            },
          ]}
          onPress={(selectedId) => {
            const selectedButton = [
              {
                id: "yes",
                label: "Yes",
                value: "Yes",
                selected: selectedId === "yes",
              },
              {
                id: "no",
                label: "No",
                value: "No",
                selected: selectedId === "no",
              },
            ].find((button) => button.selected);
            if (selectedButton) {
              setSelectedId(selectedButton.id);
              setIsEmergency(selectedButton.value === "Yes");
            }
          }}
          selectedId={selectedId}
          layout="column"
          containerStyle={styles.radioGroup}
        />
        {selectedId === "yes" && (
          <>
            <TextInput
              style={styles.inputContainer}
              onChangeText={(text) => {
                setEmergencyReason(text);
                validateField("emergencyReason", text);
              }}
              value={emergencyReason}
              placeholder="Reasons for emergency"
            />
            {errors.emergencyReason && (
              <Text style={styles.errorText}>{errors.emergencyReason}</Text>
            )}
          </>
        )}

        <Text style={styles.header}>Contact Information</Text>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.phonePrefix}>+63</Text>
          <TextInput
            style={[styles.inputContainer, styles.phoneInput]}
            onChangeText={(text) => {
              handleContactNumberChange(text);
              validateField("contactNumber", text);
            }}
            value={contactNumber}
            placeholder="912 345 6789"
            keyboardType="phone-pad"
            maxLength={12}
          />
        </View>
        {errors.contactNumber && (
          <Text style={styles.errorText}>{errors.contactNumber}</Text>
        )}

        <Text style={styles.header}>Upload Blood Request Form</Text>
        <CustomButtonWithIcon
          onPress={() => setModalVisible(true)}
          icon="upload"
          iconSize={24}
          iconColor="white"
          title="Upload Image"
          buttonStyle={{ backgroundColor: COLORS.primary }}
          textStyle={{ color: "white" }}
        />
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
        )}
        <IconModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleImagePicker={handleImagePicker}
        />
      </View>
    </KeyboardAwareScrollView>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    width: "80%",
  },
  radioGroup: {
    alignItems: "flex-start", // Align items to the left
    justifyContent: "flex-start", // Ensure proper alignment
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
    zIndex: 1,
  },
  inputLabel: {
    textTransform: "capitalize",
    backgroundColor: COLORS.white,
    paddingHorizontal: 4,
    borderRadius: 50,
  },
  picker: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.xSmall,
    marginBottom: 10,
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  //   marginVertical: 5,
  // },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  phonePrefix: {
    fontSize: 18,
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
});
