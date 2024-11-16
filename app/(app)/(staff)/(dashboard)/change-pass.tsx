import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { FIREBASE_AUTH } from "firebase-config"; // Import your Firebase configuration
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import TextInputWrapper from "components/common/TextInputWrapper";
import { COLORS } from "../../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import CallToActionBtn from "components/common/CallToActionBtn";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import { rotationHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/RotationGestureHandler";
import { useRouter } from "expo-router";

const StaffChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const router = useRouter();
  const handleCurrentPasswordVisibility = () => {
    setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
  };

  const handleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setModalTitle("Error");
      setModalMessage("All fields are required");
      setModalVisible(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalTitle("Error");
      setModalMessage("New passwords do not match");
      setModalVisible(true);
      return;
    }

    const user = FIREBASE_AUTH.currentUser;
    if (user && user.email) {
      try {
        // Step 1: Re-authenticate user
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);

        // Step 2: Update password after re-authentication
        await updatePassword(user, newPassword);
        setModalTitle("Success");
        setModalMessage("Password changed successfully");
        setIsPasswordChanged(true);
        setModalVisible(true);
      } catch (error) {
        console.error("Error changing password:", error);
        setModalTitle("Error");
        setModalMessage(
          "Failed to change password. Please check your current password."
        );
        setIsPasswordChanged(false);
        setModalVisible(true);
      }
    } else {
      setModalTitle("Error");
      setModalMessage("No user is currently logged in or email is missing");
      setModalVisible(true);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
      <View style={{ margin: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 24,
              fontFamily: "Poppins_700Bold",
            }}
          >
            Change password
          </Text>
          <Ionicons name="lock-closed" size={24} color={COLORS.primary} />
        </View>
        <Text style={{ fontSize: 16 }}>
          Staff can change their password here.
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ marginVertical: 15, width: "90%" }}>
          <TextInputWrapper label="Current Password">
            <TextInput
              secureTextEntry={!isCurrentPasswordVisible}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={{ width: "70%", marginLeft: 10 }}
            />
            <Pressable
              onPress={handleCurrentPasswordVisibility}
              style={{ paddingRight: 12 }}
            >
              <Ionicons
                name={isCurrentPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="black"
              />
            </Pressable>
          </TextInputWrapper>
        </View>
        <View style={{ marginVertical: 15, width: "90%" }}>
          <TextInputWrapper label="New Password">
            <TextInput
              secureTextEntry={!isNewPasswordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
              style={{ width: "70%", marginLeft: 10 }}
            />
            <Pressable
              onPress={handleNewPasswordVisibility}
              style={{ paddingRight: 12 }}
            >
              <Ionicons
                name={isNewPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="black"
              />
            </Pressable>
          </TextInputWrapper>
        </View>
        <View style={{ marginVertical: 15, width: "90%" }}>
          <TextInputWrapper label="Confirm Password">
            <TextInput
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={{ width: "70%", marginLeft: 10 }}
            />
            <Pressable
              onPress={handleConfirmPasswordVisibility}
              style={{ paddingRight: 12 }}
            >
              <Ionicons
                name={isConfirmPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="black"
              />
            </Pressable>
          </TextInputWrapper>
        </View>
        <View
          style={{
            marginVertical: 15,
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CallToActionBtn
            label="Change Password"
            onPress={handleChangePassword}
          />
        </View>
      </View>
      <SingleBtnModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        title={modalTitle}
        description={modalMessage}
        btnLabel="OK"
        onPress={() => {
          setModalVisible(false);
          if (isPasswordChanged) {
            router.back();
          }
        }}
      />
    </View>
  );
};

export default StaffChangePasswordScreen;
