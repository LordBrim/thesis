import {
  View,
  Text,
  StyleSheet,
  Modal as RNModal,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../../../constants";

interface IModal {
  visible: boolean;
  onRequestClose: () => void;
  ticketNumber: string;
}

export default function Modal({
  visible,
  onRequestClose,
  ticketNumber,
}: IModal) {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={[styles.modalText, styles.modalHeader]}>Success!</Text>
          <Text style={styles.modalText}>
            Please show the code included in this message to the hospital staff
            to confirm your attendance.
          </Text>
          <Text style={[styles.modalText, styles.modalCodeText]}>
            Here's your code:{" "}
            <Text style={styles.modalCode}>{ticketNumber}</Text>
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={onRequestClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalSubtext: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalCodeText: {
    fontSize: 16,
    marginBottom: 10,
    color: "red",
  },
  modalCode: {
    fontWeight: "bold",
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
