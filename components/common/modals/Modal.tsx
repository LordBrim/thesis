import {
  View,
  Text,
  StyleSheet,
  Modal as RNModal,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../../../constants";
import CallToActionBtn from "../CallToActionBtn";

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
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.header}>Success!</Text>
          <Text style={styles.description}>
            Please show the code included in this message to the hospital staff
            to confirm your attendance.
          </Text>

          <View>
            <Text style={styles.description}>Here's your code:</Text>
            <Text style={styles.ticket}>{ticketNumber}</Text>
          </View>

          <View style={{ width: "65%", marginTop: 24 }}>
            <CallToActionBtn label="Ok" onPress={onRequestClose} secondary />
          </View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    height: "50%",
    gap: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  ticket: {
    fontWeight: "bold",
    fontSize: 28,
    color: COLORS.primary,
  },
  btn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
