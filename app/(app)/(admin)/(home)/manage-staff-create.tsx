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
import { addFAQToFirebase, createQuestion } from "rtx/slices/faq";
import { router, useNavigation } from "expo-router";
import { RootState } from "app/store";
import useTogglePasswordVisibility from "hooks/useTogglePasswordVisibility";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "firebase-config";
import { firestoreOperations } from "../../../../firestore-services";
import { createStaff, getHopitalStaff } from "rtx/slices/staff";
import IconBtn from "components/common/IconButton";

export default function ManageStaffCreate() {
  const { user } = useSelector((state: RootState) => state.user);
  const [newTitle, setNewTitle] = useState(user.hospitalName);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
          <Text style={{ fontWeight: "bold" }}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, newTitle, newUsername, newEmail, newPassword]);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Staff",
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
        role: "staff",
        hospitalName: newTitle,
      };
      await firestoreOperations.addDocument(
        "User",
        documentData,
        response.user.uid
      );
      dispatch(
        createStaff({
          newStaff: {
            disabled: false,
            email: newEmail,
            password: newPassword,
            displayName: newUsername,
            role: "staff",
            hospitalName: newTitle,
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
      <ScrollView
        contentContainerStyle={styles.scrollview}
        overScrollMode="never"
        persistentScrollbar={true}
      >
        <TextInputWrapper label="Username">
          <TextInput
            value={newUsername}
            onChangeText={(username) => setNewUsername(username)}
            placeholder="Enter staff username..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Email">
          <TextInput
            value={newEmail}
            onChangeText={(email) => setNewEmail(email)}
            placeholder="Enter staff email..."
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            style={{
              flex: 1,
              padding: 12,
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Password" error={!!passwordError}>
          <TextInput
            value={newPassword}
            placeholder="Enter staff password..."
            onChangeText={(password) => setNewPassword(password)}
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            secureTextEntry={passwordVisibility}
            style={{
              flex: 1,
              padding: 12,
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollview: {
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: 16,
  },
});
