import Title from "components/common/texts/Title";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES } from "../../constants";
import { View, Text, Image, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import TextInputWrapper from "components/common/TextInputWrapper";
import CallToActionBtn from "components/common/CallToActionBtn";
import { useState } from "react";
import { Octicons, Ionicons } from "@expo/vector-icons";
import useTogglePasswordVisibility from "hooks/useTogglePasswordVisibility";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const setNewPassword = () => {
    setShowModal(true);
    //TODO: Send confimation pin to email
  };
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/new-password.png")}
        style={{
          width: "80%",
          height: 210,
        }}
      />

      <View style={{ gap: 20, width: "100%" }}>
        <Title title="Set A New Password" />

        <TextInputWrapper label="Password">
          <TextInput
            value={password}
            placeholder="Enter your new password..."
            onChangeText={(newPassword) => setPassword(newPassword)}
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            secureTextEntry={passwordVisibility}
          />
          <Pressable onPress={handlePasswordVisibility}>
            <Ionicons
              name={rightIcon}
              size={SIZES.xLarge}
              color={COLORS.gray}
            />
          </Pressable>
        </TextInputWrapper>

        <View style={{ gap: 4 }}>
          {conditions.map(({ condition }, id) => (
            <View key={id} style={{ flexDirection: "row", gap: 8 }}>
              <Octicons
                name="check-circle-fill"
                size={20}
                color={COLORS.slate300}
              />
              <Text>{condition}</Text>
            </View>
          ))}
        </View>
      </View>
      <CallToActionBtn label="Confirm" onPress={() => setNewPassword()} />

      <SingleBtnModal
        visible={showModal}
        onRequestClose={handleCloseModal}
        onPress={handleCloseModal}
        icon={
          <MaterialCommunityIcons name="shield-check" size={40} color="green" />
        }
        title="Password Changed"
        description="You can now login with your new password."
        btnLabel="Back To Login"
      />
    </View>
  );
}

function Condition() {
  const [check, setCheck] = useState(false);

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Octicons name="check-circle-fill" size={20} color="black" />
      {/* <Text key={condition.id}>{condition.condition}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    gap: 40,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
});

const conditions = [
  {
    condition: "8-20 characters",
  },
  {
    condition: "At least one capital letter (A to Z)",
  },
  {
    condition: "At least one lowercase letter (a to z)",
  },
  {
    condition: "At least one number (0 to 9)",
  },
  {
    condition: "Don't use : ; , \" ' /",
  },
  {
    condition: "No spaces",
  },
];
