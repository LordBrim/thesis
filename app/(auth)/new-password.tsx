import { useEffect, useState } from "react";
import Title from "components/common/texts/Title";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES, GS } from "../../constants";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import TextInputWrapper from "components/common/TextInputWrapper";
import CallToActionBtn from "components/common/CallToActionBtn";
import { Octicons, Ionicons } from "@expo/vector-icons";
import useTogglePasswordVisibility from "hooks/useTogglePasswordVisibility";
import { useRouter } from "expo-router";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function NewPassword() {
  const router = useRouter();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState("");
  const setNewPassword = () => {
    if (isValid) {
      setShowModal(true);
    } else {
      //Wrong password
    }
  };
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    router.back();
  };

  const [isValid, setIsValid] = useState(false);

  const [isValidLength, setIsValidLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasNoSpecialChars, setHasNoSpecialChars] = useState(false);
  const [hasNoSpaces, setHasNoSpaces] = useState(false);

  useEffect(() => {
    setIsValidLength(password.length >= 8 && password.length <= 20);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasNoSpecialChars(!/[:;,\"'\/]/.test(password));
    setHasNoSpaces(!/\s/.test(password));

    setIsValid(
      isValidLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasNoSpecialChars &&
        hasNoSpaces
    );
  }, [password, setPassword]);

  const conditions = [
    {
      isValid: isValidLength,
      condition: "8-20 characters",
    },
    {
      isValid: hasUppercase,
      condition: "At least one capital letter (A to Z)",
    },
    {
      isValid: hasLowercase,
      condition: "At least one lowercase letter (a to z)",
    },
    {
      isValid: hasNumber,
      condition: "At least one number (0 to 9)",
    },
    {
      isValid: hasNoSpecialChars,
      condition: "Don't use : ; , \" ' /",
    },
    {
      isValid: hasNoSpaces,
      condition: "No spaces",
    },
  ];

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
        <Text style={GS.h1}>Set A New Password</Text>

        <TextInputWrapper label="Password">
          <TextInput
            value={password}
            placeholder="Enter your new password..."
            onChangeText={setPassword}
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
          {conditions.map(({ isValid, condition }, id) => (
            <View key={id} style={{ flexDirection: "row", gap: 8 }}>
              {isValid ? (
                <Octicons
                  name="check-circle-fill"
                  size={20}
                  color={COLORS.success}
                />
              ) : (
                <Octicons
                  name="check-circle-fill"
                  size={20}
                  color={COLORS.slate300}
                />
              )}
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
