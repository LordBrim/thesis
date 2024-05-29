import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES } from "../../../constants";
import DropDownPicker from "react-native-dropdown-picker";

export default function RequestBloodunitScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>File A Request</Text>

      <Text style={styles.header}>I Am Requesting For...</Text>

      <Text style={styles.header}>Blood Type</Text>
      <DropDownPicker
        open={open}
        value={selectedHospital}
        items={hospitals}
        setOpen={setOpen}
        setValue={setSelectedHospital}
        placeholder="Select a hospital"
        style={styles.inputContainer}
        labelStyle={styles.inputLabel}
      />

      <Text style={styles.header}>Patient's Name</Text>
      <DropDownPicker
        open={open}
        value={selectedHospital}
        items={hospitals}
        setOpen={setOpen}
        setValue={setSelectedHospital}
        placeholder="Select a hospital"
        style={styles.inputContainer}
        labelStyle={styles.inputLabel}
      />

      <Text style={styles.header}>Relationship To Patient</Text>
      <DropDownPicker
        open={open}
        value={selectedHospital}
        items={hospitals}
        setOpen={setOpen}
        setValue={setSelectedHospital}
        placeholder="Select a hospital"
        style={styles.inputContainer}
        labelStyle={styles.inputLabel}
      />

      <Text style={styles.header}>Contact Information</Text>
      <DropDownPicker
        open={open}
        value={selectedHospital}
        items={hospitals}
        setOpen={setOpen}
        setValue={setSelectedHospital}
        placeholder="Select a hospital"
        style={styles.inputContainer}
        labelStyle={styles.inputLabel}
      />

      <Text style={styles.header}>Upload Blood Request Form</Text>
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
});
