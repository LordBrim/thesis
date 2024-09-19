import { View, Text, StyleSheet, Modal as RNModal, Image } from "react-native";
import React, { ReactNode, useState } from "react";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../constants";
import CallToActionBtn from "../CallToActionBtn";

interface IModal {
  visible: boolean;
  icon?: ReactNode;
  onRequestClose: () => void;
  children?: ReactNode;
}

export default function SingleBtnModal({
  visible,
  icon,
  onRequestClose,
  children,
}: IModal) {
  const [open, setOpen] = useState(false);
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modal}>
        <View style={styles.container}>
          {icon}
          <Text style={styles.header}>Success!</Text>
          <Text style={styles.description}>
            Please show the code included in this message to the hospital staff
            to confirm your attendance.
          </Text>
          {children}
          <View
            style={{
              marginTop: 32,
              width: 300,
            }}
          >
            <CallToActionBtn
              label="I Understand"
              onPress={() => setOpen(true)}
            />
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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  container: {
    backgroundColor: COLORS.white,
    padding: 28,
    marginHorizontal: HORIZONTAL_SCREEN_MARGIN,
    borderRadius: 15,
    alignItems: "center",
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
  btn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
