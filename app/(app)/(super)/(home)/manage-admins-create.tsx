import {
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { COLORS, SIZES } from "constants/theme";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import TextInputWrapper from "components/common/TextInputWrapper";
import { useDispatch, useSelector } from "react-redux";
import { router, useNavigation } from "expo-router";
import { RootState } from "app/store";
import useTogglePasswordVisibility from "hooks/useTogglePasswordVisibility";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "firebase-config";
import { firestoreOperations } from "../../../../firestore-services";
import IconBtn from "components/common/IconButton";
import DropDownPicker from "react-native-dropdown-picker";
import { createAdmins } from "rtx/unused/admins";

export default function ManageAdminsCreate() {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const { hospitals } = useSelector((state: RootState) => state.hospitals);
  const hospitalNames = hospitals.map((hospital) => ({
    label: hospital.name,
    value: hospital.name,
  }));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            padding: 12,
            borderRadius: 10,
            width: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleCreate}
        >
          <Text style={{ fontFamily: "Poppins_700Bold" }}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, newUsername, newEmail, newPassword, selectedHospital]);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Admin",
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontSize: 16,
      },
      headerTitleAlign: "center",
    });
  }, []);
  const [passwordError, setPasswordError] = useState("");
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const handleCreate = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        newEmail,
        newPassword
      );
      const documentData = {
        disabled: false,
        email: newEmail,
        password: newPassword,
        displayName: newUsername,
        role: "admin",
        hospitalName: selectedHospital,
      };
      await firestoreOperations.addDocument(
        "User",
        documentData,
        response.user.uid
      );
      dispatch(
        createAdmins({
          newAdmins: {
            disabled: false,
            email: newEmail,
            password: newPassword,
            displayName: newUsername,
            role: "admin",
            hospitalName: selectedHospital,
          },
        })
      );
      router.back();
    } catch (error) {
      console.log(error);
      alert("Registration Failed:" + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollview}>
        <DropDownPicker
          open={open}
          value={selectedHospital}
          items={hospitalNames}
          setOpen={setOpen}
          setValue={setSelectedHospital}
          placeholder="Select a hospital..."
          style={{
            width: "100%",
            flexDirection: "row",
            backgroundColor: "transparent",
            justifyContent: "space-between",
          }}
          dropDownContainerStyle={{
            backgroundColor: COLORS.background,
          }}
          labelStyle={{
            textTransform: "capitalize",
            backgroundColor: COLORS.background,
            paddingHorizontal: 4,
            borderRadius: 50,
          }}
          placeholderStyle={{
            color: COLORS.slate400,
          }}
          scrollViewProps={{}}
        />
        <TextInputWrapper label="Username">
          <TextInput
            value={newUsername}
            onChangeText={(username) => setNewUsername(username)}
            placeholder="Enter admins username..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingTop: 16,
              paddingBottom: 8,
              fontFamily: "Poppins_400Regular",
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Email">
          <TextInput
            value={newEmail}
            onChangeText={(email) => setNewEmail(email)}
            placeholder="Enter admins email..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingTop: 16,
              paddingBottom: 8,
              fontFamily: "Poppins_400Regular",
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Password" error={!!passwordError}>
          <TextInput
            value={newPassword}
            placeholder="Enter admins password..."
            onChangeText={(password) => setNewPassword(password)}
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            secureTextEntry={passwordVisibility}
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingTop: 16,
              paddingBottom: 8,
              fontFamily: "Poppins_400Regular",
            }}
          />
          <Pressable
            onPress={handlePasswordVisibility}
            style={{ paddingRight: 12 }}
          >
            <Ionicons
              name={rightIcon}
              size={SIZES.xLarge}
              color={COLORS.grayDark}
            />
          </Pressable>
        </TextInputWrapper>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <IconBtn icon="circle-info" size={18} color="red" />
          <Text style={{ flexShrink: 1 }}>
            Accounts cannot be deleted, only disabled. Please make sure to input
            the proper account credentials.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: HORIZONTAL_SCREEN_MARGIN,
  },
  scrollview: {
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: 16,
  },
});
