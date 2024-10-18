import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { COLORS } from "../../../constants/theme";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import AddressSearchComponent from "components/common/AddressSearch";
import { FIREBASE_STORAGE, FIREBASE_AUTH, FIRESTORE_DB } from "firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestoreOperations } from "firestore-services";
import TextInputWrapper from "components/common/TextInputWrapper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { router } from "expo-router";

export default function CreateEvent({ navigation }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [inputHeight, setInputHeight] = useState(50);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userDoc = await getDoc(doc(FIRESTORE_DB, "User", user.uid));
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        }
      } else {
        setCurrentUser(null);
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      let uri = result.assets[0].uri;

      // Get the size of the image
      Image.getSize(
        uri,
        async (width, height) => {
          console.log(`Image width: ${width}, height: ${height}`);
          Alert.alert("Image Size", `Width: ${width}, Height: ${height}`);

          // Determine the aspect ratio
          const aspectRatio = width / height;
          setImageAspectRatio(aspectRatio);

          // Resize the image to fit within the maximum dimensions
          let newWidth = width;
          let newHeight = height;

          if (width > 1200 || height > 630) {
            if (aspectRatio > 1) {
              // Landscape
              newWidth = 1200;
              newHeight = 1200 / aspectRatio;
            } else {
              // Portrait
              newHeight = 630;
              newWidth = 630 * aspectRatio;
            }
          }

          const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [
              {
                resize: {
                  width: newWidth,
                  height: newHeight,
                },
              },
            ],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
          );
          uri = manipResult.uri;

          setImageUri(uri);
        },
        (error) => {
          console.error(`Failed to get image size: ${error}`);
        }
      );
    }
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime ||
      !address ||
      !description ||
      !imageUri ||
      latitude === null ||
      longitude === null ||
      !currentUser ||
      !userDetails
    ) {
      Alert.alert("Error", "Please fill in all fields and select an image.");
      return;
    }

    try {
      const startDateTime = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      );

      const endDateTime = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes()
      );

      // Format dates and times
      const formattedStartDate = `${
        startDate.getMonth() + 1
      }/${startDate.getDate()}/${startDate.getFullYear()}`;
      const formattedEndDate = `${
        endDate.getMonth() + 1
      }/${endDate.getDate()}/${endDate.getFullYear()}`;
      const formattedStartTime = startTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedEndTime = endTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Add event details to Firestore
      const docId = await firestoreOperations.addDocument("events", {
        title,
        startDate: formattedStartDate,
        startTime: formattedStartTime,
        endDate: formattedEndDate,
        endTime: formattedEndTime,
        address,
        description,
        latitude,
        longitude,
        userUID: currentUser.uid,
        hospitalName: userDetails.hospitalName || userDetails.displayName,
        adminEventStatus: "pending",
        eventStatus: "upcoming",
      });

      // Upload image to Firebase Storage
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(FIREBASE_STORAGE, `events/${docId}`);
      await uploadBytes(storageRef, blob);

      // Get the download URL and update the Firestore document
      const downloadURL = await getDownloadURL(storageRef);
      await firestoreOperations.updateDocument("events", docId, {
        imageUrl: downloadURL,
      });

      Alert.alert("Success", "Event created successfully!");
      // Reset form fields
      setTitle("");
      setStartDate(new Date());
      setStartTime(new Date());
      setEndDate(new Date());
      setEndTime(new Date());
      setAddress("");
      setDescription("");
      setImageUri(null);
      setLatitude(null);
      setLongitude(null);
      router.replace("/(app)/(home)/manage-events");
    } catch (error) {
      console.error("Error creating event: ", error);
      Alert.alert("Error", "Failed to create event. Please try again.");
    }
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };

  const handleAddressSelect = (
    selectedAddress: string,
    lat: number,
    lon: number
  ) => {
    setAddress(selectedAddress);
    setLatitude(lat);
    setLongitude(lon);
  };

  const renderForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.header}>Create Event</Text>
      <View style={styles.imageContainer}>
        <Button title="Pick Image" onPress={handleImagePicker} />
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={[styles.image, { aspectRatio: imageAspectRatio }]}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInputWrapper label="Event Title">
          <TextInput
            style={styles.input}
            placeholder="Event Title"
            value={title}
            onChangeText={setTitle}
          />
        </TextInputWrapper>
      </View>
      <View style={styles.inputContainer}>
        <TextInputWrapper label="Start Date">
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="Start Date"
              value={startDate.toLocaleDateString()}
              editable={false}
            />
          </TouchableOpacity>
        </TextInputWrapper>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleStartDateChange}
            minimumDate={new Date()}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInputWrapper label="Start Time">
          <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="Start Time"
              value={startTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              editable={false}
            />
          </TouchableOpacity>
        </TextInputWrapper>
        {showStartTimePicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            display="default"
            onChange={handleStartTimeChange}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInputWrapper label="End Date">
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="End Date"
              value={endDate.toLocaleDateString()}
              editable={false}
            />
          </TouchableOpacity>
        </TextInputWrapper>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={handleEndDateChange}
            minimumDate={startDate}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInputWrapper label="End Time">
          <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="End Time"
              value={endTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              editable={false}
            />
          </TouchableOpacity>
        </TextInputWrapper>
        {showEndTimePicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            display="spinner"
            onChange={handleEndTimeChange}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <AddressSearchComponent onAddressSelect={handleAddressSelect} />
      </View>
      <View style={styles.inputContainer}>
        <TextInputWrapper
          label="Description"
          customStyle={{ height: inputHeight }}
        >
          <TextInput
            editable
            style={[styles.input, { height: inputHeight }, { padding: 5 }]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            onContentSizeChange={(event) => {
              setInputHeight(
                Math.max(50, event.nativeEvent.contentSize.height)
              );
            }}
          />
        </TextInputWrapper>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <Button title="Create Event" onPress={handleSubmit} />
    </View>
  );

  return (
    <FlatList
      data={[{ key: "form" }]}
      renderItem={renderForm}
      ListFooterComponent={renderFooter}
      style={styles.container}
      keyExtractor={(item) => item.key}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    flex: 1,

    color: COLORS.secondary,
  },
  image: {
    width: "100%",
    marginVertical: 10,
  },
  footerContainer: {
    marginBottom: 50,
  },
  imageContainer: {
    marginBottom: 20,
  },
});
