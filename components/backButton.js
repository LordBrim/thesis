import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants";
import { Icon } from "react-native-paper";

const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={navigation} style={styles.buttonChoose}>
      <Icon source="chevron-left" size={30} color="black" />
      <Text style={styles.text}>BACK</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonChoose: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5,
    borderColor: COLORS.gray,
    borderWidth: 1,
    width: 100,
    shadowColor: "black",
    elevation: 5,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Grotesk",
  },
});

export default BackButton;
