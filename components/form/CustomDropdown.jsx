import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { COLORS, FONT } from "../../constants/theme";

const CustomDropdown = ({ label, items, value, onValueChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleItemPress = (item) => {
    onValueChange(item);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Text style={styles.dropdownText}>{value || "Select an option"}</Text>
        </TouchableOpacity>
        <Modal visible={isVisible} animationType="fade" transparent>
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={toggleDropdown}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={items}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => handleItemPress(item)}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "45%",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: "Raleway_500Medium",
    fontStyle: "italic",
    color: COLORS.redWhite,
  },
  dropdown: {
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 14,
    textAlign: "left",
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    maxHeight: "60%",
  },
  modalItem: {
    padding: 10,
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default CustomDropdown;
