import { View, Text, StyleSheet, Modal as RNModal, Image } from "react-native";
import React, { ReactNode, useState } from "react";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../constants";
import CallToActionBtn from "../CallToActionBtn";

interface IModal {
  visible: boolean;
  onRequestClose: () => void;
  onPress?: () => void;
  children?: ReactNode;
  icon?: ReactNode;
  title: string;
  description: string | ReactNode;
  btnLabel: string;
  extraBtn?: ReactNode;
}

export default function SingleBtnModal({
  visible,
  onRequestClose,
  onPress,
  children,
  icon,
  title,
  description,
  btnLabel,
  extraBtn,
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
          {icon}
          <Text style={styles.header}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {children}
          <View
            style={{
              marginTop: 32,
              width: 300,
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            <CallToActionBtn label={btnLabel} onPress={onPress} />
            {extraBtn}
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
