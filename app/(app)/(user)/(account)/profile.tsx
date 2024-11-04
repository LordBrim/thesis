import React, { useState, useEffect } from "react";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { COLORS, SIZES } from "../../../../constants/theme";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Avatar from "components/common/Avatar";
import TextInputWrapper from "components/common/TextInputWrapper";
import RadioButton from "components/common/RadioButton";
import CustomButtonWithIcon from "../../../../components/common/CustomButtonWithIcons";
import IconModal from "../../(common)/custom-album-modal";
import {
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
  FIRESTORE_DB,
} from "../../../../firebase-config";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const metroCities = [
  "Manila",
  "Quezon City",
  "Caloocan",
  "Las Piñas",
  "Makati",
  "Malabon",
  "Mandaluyong",
  "Marikina",
  "Muntinlupa",
  "Navotas",
  "Parañaque",
  "Pasay",
  "Pasig",
  "San Juan",
  "Taguig",
  "Valenzuela",
  "Pateros",
];

const ProfileEditScreen = () => {
  const [fullName, setFullName] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading

      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        // Fetch the user document from Firestore
        const userDocRef = doc(FIRESTORE_DB, "User", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFullName(userData.displayName || "");
          setSex(userData.sex || "");
          setAge(userData.age ? userData.age.toString() : "");
          setContactDetails(userData.contactDetails || "");
          setCity(userData.city || "");
        }
        // Fetch the avatar from Firebase Storage
        const fileRef = ref(FIREBASE_STORAGE, `avatars/${user.uid}.jpg`);
        getDownloadURL(fileRef)
          .then((url) => {
            console.log("Avatar URL:", url);
            setAvatar(url); // Set avatar URL if found
          })
          .catch((error) => {
            // Handle the case where the avatar doesn't exist
            if (error.code === "storage/object-not-found") {
              console.warn("Avatar not found, using default avatar.");
              setAvatar(null); // Use null to indicate that default avatar should be used
            } else {
              console.error("Error getting avatar URL:", error);
            }
          })
          .finally(() => {
            setLoading(false); // Stop loading after avatar fetch
          });
      } else {
        console.log("No user is logged in.");
        setLoading(false); // Stop loading if no user
      }
    };

    fetchUserData();
  }, []);

  const handleImagePicker = async (source) => {
    let result;
    if (source === "camera") {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera is required!");
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const source = { uri: result.assets[0].uri };
      console.log(source);
      setImage(source.uri); // Set the selected image URI in the state
    }
    setModalVisible(false);
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const user = FIREBASE_AUTH.currentUser;
    const storageRef = ref(FIREBASE_STORAGE, `avatars/${user.uid}.jpg`);

    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSave = async () => {
    if (!fullName || !sex || !age || !contactDetails || !city) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = avatar;
      if (image && !image.startsWith("http")) {
        imageUrl = await uploadImage(image);
      }

      await updateDoc(doc(db, "User", auth.currentUser.uid), {
        displayName: fullName,
        sex,
        age: parseInt(age),
        contactDetails,
        city,
        avatarUrl: imageUrl,
      });

      setAvatar(imageUrl); // Update the avatar state with the new URL
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleHeader}>Edit Profile</Text>
      <View style={styles.profile}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <Avatar
            avatarUrl={
              image
                ? { uri: image } // Show selected image if available
                : avatar
                ? { uri: avatar } // Firebase URL case
                : require("../../../../assets/images/defaultAvatar.png") // Local image case
            }
            onEdit={() => setModalVisible(true)} // Show modal when avatar is pressed
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInputWrapper label="Full Name (cannot be changed)">
          <TextInput
            style={styles.input}
            value={fullName}
            placeholder={fullName}
            editable={false}
          />
        </TextInputWrapper>
      </View>

      <View style={styles.inputContainer}>
        <TextInputWrapper label="Sex">
          <View style={styles.radioContainer}>
            <RadioButton
              label="Male"
              value="male"
              selected={sex === "male"}
              onPress={() => setSex("male")}
            />
            <RadioButton
              label="Female"
              value="female"
              selected={sex === "female"}
              onPress={() => setSex("female")}
            />
          </View>
        </TextInputWrapper>
      </View>

      <View style={styles.inputContainer}>
        <TextInputWrapper label="Age">
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </TextInputWrapper>
      </View>

      <View style={styles.inputContainer}>
        <TextInputWrapper label="Contact Details (Phone Number)">
          <TextInput
            style={styles.input}
            value={contactDetails}
            onChangeText={setContactDetails}
            keyboardType="phone-pad"
            placeholder="+63"
          />
        </TextInputWrapper>
      </View>

      <View style={styles.inputContainer}>
        <TextInputWrapper label="City">
          <Picker
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select city" value="" />
            {metroCities.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </TextInputWrapper>
      </View>
      <CustomButtonWithIcon
        onPress={handleSave}
        icon="edit"
        iconSize={24}
        iconColor="white"
        title={loading ? "Saving..." : "Save Changes"}
        buttonStyle={[
          { backgroundColor: COLORS.primary },
          styles.saveButton,
          loading && styles.disabledButton,
        ]}
        textStyle={{ color: "white" }}
        disabled={loading}
      />
      <IconModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleImagePicker={handleImagePicker}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  titleHeader: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#e1e1e1",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    height: 40,
    color: COLORS.text,
    marginLeft: 20,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  saveButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  profile: {
    flexDirection: "row",
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: 16,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProfileEditScreen;
