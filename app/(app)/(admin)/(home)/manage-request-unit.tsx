import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

// ...existing code...

const ManageRequestUnit = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [unitsRequired, setUnitsRequired] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic
    console.log({ hospitalName, bloodType, unitsRequired });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Blood Unit</Text>
      <View style={styles.form}>
        <Text>Hospital Name</Text>
        <TextInput
          style={styles.input}
          value={hospitalName}
          onChangeText={setHospitalName}
          placeholder="Enter hospital name"
          required
        />
        <Text>Blood Type</Text>
        <Picker
          selectedValue={bloodType}
          style={styles.input}
          onValueChange={(itemValue) => setBloodType(itemValue)}
          required
        >
          <Picker.Item label="Select blood type" value="" />
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
        <Text>Units Required</Text>
        <TextInput
          style={styles.input}
          value={unitsRequired}
          onChangeText={setUnitsRequired}
          placeholder="Enter units required"
          keyboardType="numeric"
          required
        />
        <Button title="Submit Request" onPress={handleSubmit} color="#007BFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    maxWidth: 600,
    margin: "0 auto",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  input: {
    width: "100%",
    padding: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

// ...existing code...

export default ManageRequestUnit;
