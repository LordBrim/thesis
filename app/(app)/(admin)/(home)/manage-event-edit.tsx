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
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../../../constants/theme";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import AddressSearchComponent from "components/common/AddressSearch";
import { FIREBASE_STORAGE, FIREBASE_AUTH, FIRESTORE_DB } from "firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestoreOperations } from "firestore-services";
import TextInputWrapper from "components/common/TextInputWrapper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { router } from "expo-router";
import CustomButtonWithIcon from "components/common/CustomButtonWithIcons";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";

const API_KEY = "d1440a571533e6c003ef72358ff55e5a-f6fe91d3-6d5fa136";
const DOMAIN = "lifeline-ph.tech";

const getEmailContent = (city) => {
  const subject = "New Blood Drive Event in Your City";
  const text = `A new blood drive event has been created in ${city}. We invite you to participate and help save lives.`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333;">New Blood Drive Event in ${city}</h2>
      <p style="color: #555;">Dear User,</p>
      <p style="color: #555;">A new blood drive event has been created in <strong>${city}</strong>. You can check all of the event details on our Lifeline App! We hope to see you there.</p>
      <p style="color: #555;">If you have any questions, please contact our support team.</p>
      <p style="color: #555;">Best regards,<br/>The Lifeline Team</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #aaa; font-size: 12px; text-align: center;">This is an automated message, please do not reply.</p>
    </div>
  `;
  return { subject, text, html };
};

const sendEmailNotification = async (email, city) => {
  const { subject, text, html } = getEmailContent(city);

  const data = new FormData();
  data.append("from", "Lifeline Support <support@lifeline.com>");
  data.append("to", email);
  data.append("subject", subject);
  data.append("text", text);
  data.append("html", html);

  try {
    const response = await axios.post(
      `https://api.mailgun.net/v3/${DOMAIN}/messages`,
      data,
      {
        auth: {
          username: "api",
          password: API_KEY,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      console.log("Event notification email sent successfully");
    } else {
      console.error("Failed to send email:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending event notification email:", error);
  }
};

export default function CreateEvent({ navigation }) {
  const {
    title: initialTitle,
    description: initialDescription,
    date: initialDate,
    address: initialAddress,
    time: initialTime,
    documentId,
    latitude: initialLatitude,
    longitude: initialLongitude,
    imageUri: initialImageUri,
  } = useLocalSearchParams();

  const [title, setTitle] = useState(initialTitle || "");
  const [startDate, setStartDate] = useState(
    initialDate ? new Date(initialDate) : new Date()
  );
  const [startTime, setStartTime] = useState(
    initialTime ? new Date(`1970-01-01T${initialTime}:00`) : new Date()
  );
  const [endDate, setEndDate] = useState(
    initialDate ? new Date(initialDate) : new Date()
  );
  const [endTime, setEndTime] = useState(
    initialTime ? new Date(`1970-01-01T${initialTime}:00`) : new Date()
  );
  const [address, setAddress] = useState(initialAddress || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [imageUri, setImageUri] = useState(initialImageUri || null);
  const [latitude, setLatitude] = useState(initialLatitude || null);
  const [longitude, setLongitude] = useState(initialLongitude || null);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [inputHeight, setInputHeight] = useState(50);

  // New state variables to track if date and time have been selected
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [isStartTimeSelected, setIsStartTimeSelected] = useState(false);
  const [isEndDateSelected, setIsEndDateSelected] = useState(false);
  const [isEndTimeSelected, setIsEndTimeSelected] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [city, setCity] = useState("");
  const metroManilaCities = [
    "Caloocan",
    "Las Piñas",
    "Makati",
    "Malabon",
    "Mandaluyong",
    "Manila",
    "Marikina",
    "Muntinlupa",
    "Navotas",
    "Parañaque",
    "Pasay",
    "Pasig",
    "Pateros",
    "Quezon City",
    "San Juan",
    "Taguig",
    "Valenzuela",
  ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchEventData = async () => {
      if (initialTitle) {
        const eventsQuery = query(
          collection(FIRESTORE_DB, "events"),
          where("title", "==", initialTitle)
        );
        const querySnapshot = await getDocs(eventsQuery);
        if (!querySnapshot.empty) {
          const eventData = querySnapshot.docs[0].data();
          setTitle(eventData.title);
          setStartDate(moment(eventData.startDate, "MM/DD/YYYY").toDate());
          setStartTime(moment(eventData.startTime, "h:mm A").toDate());
          setEndDate(moment(eventData.endDate, "MM/DD/YYYY").toDate());
          setEndTime(moment(eventData.endTime, "h:mm A").toDate());
          setAddress(eventData.address);
          setDescription(eventData.description);
          setImageUri(eventData.imageUrl);
          setLatitude(eventData.latitude);
          setLongitude(eventData.longitude);
          setCity(eventData.city);
          setIsStartDateSelected(true);
          setIsStartTimeSelected(true);
          setIsEndDateSelected(true);
          setIsEndTimeSelected(true);
        }
      }
      setIsLoading(false); // Set loading to false after data is fetched
    };

    fetchEventData();
  }, [initialTitle]);

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

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      let uri = result.assets[0].uri;

      // Get the size of the image
      Image.getSize(
        uri,
        async (width, height) => {
          console.log(`Image width: ${width}, height: ${height}`);

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
      !userDetails ||
      !city // Ensure city is selected
    ) {
      Alert.alert(
        "Error",
        "Please fill in all fields, select an image, and choose a city."
      );
      return;
    }

    try {
      const startDateTime = moment(startDate)
        .set({
          hour: startTime.getHours(),
          minute: startTime.getMinutes(),
        })
        .toDate();

      const endDateTime = moment(endDate)
        .set({
          hour: endTime.getHours(),
          minute: endTime.getMinutes(),
        })
        .toDate();

      // Format dates and times
      const formattedStartDate = moment(startDate).format("MM/DD/YYYY");
      const formattedEndDate = moment(endDate).format("MM/DD/YYYY");
      const formattedStartTime = moment(startTime).format("h:mm A");
      const formattedEndTime = moment(endTime).format("h:mm A");

      // Update event details in Firestore
      await firestoreOperations.updateDocument("events", documentId, {
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
        city, // Add city to the document
      });

      // Upload image to Firebase Storage
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(FIREBASE_STORAGE, `events/${documentId}`);
      await uploadBytes(storageRef, blob);

      // Get the download URL and update the Firestore document
      const downloadURL = await getDownloadURL(storageRef);
      await firestoreOperations.updateDocument("events", documentId, {
        imageUrl: downloadURL,
      });

      setModalVisible(true); // Show modal on success
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
      setIsStartDateSelected(false);
      setIsStartTimeSelected(false);
      setIsEndDateSelected(false);
      setIsEndTimeSelected(false);
      setCity("");
      router.replace("/(app)/(home)/manage-events");
    } catch (error) {
      console.error("Error updating event: ", error);
      Alert.alert("Error", "Failed to update event. Please try again.");
    }
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      setIsStartDateSelected(true);
      if (selectedDate > endDate) {
        setEndDate(selectedDate);
        setIsEndDateSelected(true);
      }
    }
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
      setIsStartTimeSelected(true);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      if (selectedDate < startDate) {
        Alert.alert("Invalid Date", "End date cannot be before start date.");
      } else {
        setEndDate(selectedDate);
        setIsEndDateSelected(true);
      }
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
      setIsEndTimeSelected(true);
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
      <Text style={styles.header}>Edit Event</Text>
      <View style={styles.imageContainer}>
        <CustomButtonWithIcon
          title="Select Image"
          icon="file-image-o"
          onPress={handleImagePicker}
          iconSize={24}
          iconColor={COLORS.background}
          textStyle={{ color: "white" }}
          buttonStyle={{
            backgroundColor: COLORS.primary,
            marginVertical: 0,
            marginTop: 10,
          }}
        />
        {imageUri && (
          <View
            style={{
              borderWidth: 1,
              padding: 10,
              marginVertical: 10,
            }}
          >
            <Image
              source={{ uri: imageUri }}
              style={[styles.image, { aspectRatio: imageAspectRatio }]}
              resizeMode="contain"
            />
          </View>
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
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={{ flex: 1, width: "100%" }}
          >
            <TextInput
              style={styles.input}
              placeholder=""
              value={isStartDateSelected ? startDate.toLocaleDateString() : ""}
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
            minimumDate={tomorrow}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInputWrapper label="Start Time">
          <TouchableOpacity
            onPress={() => setShowStartTimePicker(true)}
            style={{ flex: 1, width: "100%" }}
          >
            <TextInput
              style={styles.input}
              placeholder=""
              value={
                isStartTimeSelected
                  ? startTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""
              }
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
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            style={{ flex: 1, width: "100%" }}
          >
            <TextInput
              style={styles.input}
              placeholder=""
              value={isEndDateSelected ? endDate.toLocaleDateString() : ""}
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
          <TouchableOpacity
            onPress={() => setShowEndTimePicker(true)}
            style={{ flex: 1, width: "100%" }}
          >
            <TextInput
              style={styles.input}
              placeholder=""
              value={
                isEndTimeSelected
                  ? endTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""
              }
              editable={false}
            />
          </TouchableOpacity>
        </TextInputWrapper>
        {showEndTimePicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            display="default"
            onChange={handleEndTimeChange}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <AddressSearchComponent
          onAddressSelect={handleAddressSelect}
          initialAddress={address} // Pass the initial address as a prop
        />
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
      <View style={styles.inputContainer}>
        <TextInputWrapper label="City">
          <Picker
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a city" value="" />
            {metroManilaCities.map((cityName) => (
              <Picker.Item key={cityName} label={cityName} value={cityName} />
            ))}
          </Picker>
        </TextInputWrapper>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <CustomButtonWithIcon
        title="Edit Event"
        icon="calendar-check-o"
        onPress={handleSubmit}
        iconSize={24}
        iconColor={COLORS.background}
        textStyle={{ color: "white" }}
        buttonStyle={{
          backgroundColor: COLORS.primary,
          marginVertical: 0,
          marginTop: 10,
        }}
      />
    </View>
  );

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text>Fetching data...</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={[{ key: "form" }]}
            renderItem={renderForm}
            ListFooterComponent={renderFooter}
            style={styles.container}
            keyExtractor={(item) => item.key}
          />
          <SingleBtnModal
            visible={modalVisible}
            onClose={() => {
              setModalVisible(false);
              router.back(); // Navigate back when modal is closed
            }}
            title="Event Updated"
            message="Your event has been updated successfully."
            btnLabel="OK"
          />
        </>
      )}
    </>
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
    fontFamily: "Poppins_700Bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    flex: 1,
    marginLeft: 10,
    color: COLORS.grayDark,
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
  picker: {
    height: 40,
    flex: 1,
    marginLeft: 10,
    color: COLORS.grayDark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
