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

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const setNewPassword = () => {
    //TODO: Send confimation pin to email
  };
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

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
          {conditions.map((condition) => (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Octicons
                name="check-circle-fill"
                size={20}
                color={COLORS.slate300}
              />
              <Text key={condition.id}>{condition.condition}</Text>
            </View>
          ))}
        </View>
      </View>
      <CallToActionBtn
        label="Confirm Password"
        onPress={() => setNewPassword()}
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
    id: 0,
    condition: "8-20 characters",
  },
  {
    id: 1,
    condition: "At least one capital letter (A to Z)",
  },
  {
    id: 2,
    condition: "At least one lowercase letter (a to z)",
  },
  {
    id: 3,
    condition: "At least one number (0 to 9)",
  },
  {
    id: 4,
    condition: "Don't use : ; , \" ' /",
  },
  {
    id: 5,
    condition: "No spaces",
  },
];
