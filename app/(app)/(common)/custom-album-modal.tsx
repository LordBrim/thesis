import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

const IconModal = ({ modalVisible, setModalVisible, handleImagePicker }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(!modalVisible)}
  >
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Choose Image Source</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleImagePicker("camera")}
              >
                <Ionicons name="camera" size={24} color="white" />
                <Text style={styles.textStyle}>Use Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleImagePicker("album")}
              >
                <AntDesign name="picture" size={24} color="white" />
                <Text style={styles.textStyle}>Choose from Album</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <MaterialIcons name="cancel" size={24} color="white" />
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    minWidth: 200,
  },
  buttonClose: {
    backgroundColor: "#FF6347",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
});

export default IconModal;
