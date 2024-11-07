import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, SIZES } from "../../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RequestReviewScreen({
  patientName,
  selectedBloodType,
  selectedRelationship,
  contactNumber,
  packedRequest,
  packedRequestInfo,
  imageUri,
  isEmergency,
  emergencyReason,
}) {
  const [imageModalVisible, setImageModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Review Your Request</Text>
        <Text style={styles.label}>Patient's Name:</Text>
        <Text style={styles.value}>{patientName}</Text>

        <Text style={styles.label}>Blood Type:</Text>
        <Text style={styles.value}>{selectedBloodType}</Text>

        <Text style={styles.label}>Relationship to Patient:</Text>
        <Text style={styles.value}>{selectedRelationship}</Text>

        <Text style={styles.label}>Contact Number:</Text>
        <Text style={styles.value}>{contactNumber}</Text>

        <Text style={styles.label}>Transfusion:</Text>
        <Text style={styles.value}>{packedRequest}</Text>

        {packedRequestInfo ? (
          <>
            <Text style={styles.label}>Additional Information:</Text>
            <Text style={styles.value}>{packedRequestInfo}</Text>
          </>
        ) : null}

        <Text style={styles.label}>Is this an Emergency?</Text>
        <Text style={styles.value}>{isEmergency ? "Yes" : "No"}</Text>

        {isEmergency && (
          <>
            <Text style={styles.label}>Emergency Reason:</Text>
            <Text style={styles.value}>{emergencyReason}</Text>
          </>
        )}

        {imageUri ? (
          <>
            <Text style={styles.label}>Uploaded Image:</Text>
            <TouchableOpacity onPress={() => setImageModalVisible(true)}>
              <Image source={{ uri: imageUri }} style={styles.image} />
            </TouchableOpacity>
            <Modal visible={imageModalVisible} transparent={true}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setImageModalVisible(false)}
                >
                  <Ionicons name="close" size={36} color="white" />
                </TouchableOpacity>
                <Image source={{ uri: imageUri }} style={styles.modalImage} />
              </View>
            </Modal>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    marginTop: 8,
  },
  value: {
    fontSize: SIZES.medium,
    marginBottom: 8,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalCloseButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  modalImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
});
