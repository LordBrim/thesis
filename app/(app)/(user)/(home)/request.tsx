import {
  COLORS,
  HORIZONTAL_SCREEN_MARGIN,
  SIZES,
  SPACES,
} from "../../../../constants";
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import Carousel from "pinar";
import CallToActionBtn from "components/common/CallToActionBtn";
import { router } from "expo-router";
import { useState } from "react";
import StepsIndicator from "components/common/StepsIndicator";
import RequestBloodunitScreen from "./request-bloodunit";
import { firestoreOperations } from "../../../../firestore-services";
import { getAuth } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { FIREBASE_STORAGE } from "../../../../firebase-config";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Request() {
  const stepCount = 2;
  let [screenIndex, setScreenIndex] = useState(0);

  const [patientName, setPatientName] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedRelationship, setSelectedRelationship] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState("");

  const [packedRequest, setPackedRequest] = useState(false);
  const [packedRequestInfo, setPackedRequestInfo] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const prev = () => {
    if (screenIndex > 0) {
      this.carousel.scrollToPrev();
      setScreenIndex(--screenIndex);
    }
  };

  const next = () => {
    if (screenIndex < stepCount - 1) {
      this.carousel.scrollToNext();
      setScreenIndex(++screenIndex);
    }
  };
  const onModalClose = () => {
    setModalVisible(false);
    router.navigate("(app)/(tabs)");
  };

  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const formData = {
      patientName,
      selectedBloodType,
      selectedRelationship,
      contactNumber: "+63" + contactNumber.replace(/\s/g, ""),
      isEmergency,
      emergencyReason,
      packedRequest,
      packedRequestInfo,
    };

    console.log("Form Data:", formData);

    try {
      const documentData = {
        ...formData,
        userId: user?.uid,
        message: "sent",
        status: "pending",
        type: "request",
      };

      console.log("Document Data:", documentData);

      const documentId = await firestoreOperations.addDocument(
        "ticketRequest",
        documentData
      );
      console.log(`Added new document with ID: ${documentId}`);

      if (imageUri) {
        console.log("Image URI:", imageUri);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const storageRef = ref(FIREBASE_STORAGE, `bloodRequest/${documentId}`);
        await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(storageRef);
        console.log("Download URL:", downloadUrl);
        await firestoreOperations.updateDocument("ticketRequest", documentId, {
          imageUrl: downloadUrl,
        });
      }

      setModalVisible(true); // Show modal on successful submission
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert(
        "Request Failed",
        "Invalid request form data, request failed."
      );
    }
  };

  const Screens = ["Request\nGuidelines", "File A\nRequest"];

  return (
    <View style={styles.container}>
      <StepsIndicator labels={Screens} step={screenIndex} steps={stepCount} />

      <Carousel
        ref={(carousel) => {
          this.carousel = carousel;
        }}
        showsControls={false}
        showsDots={false}
        scrollEnabled={false}
      >
        <View
          style={{
            gap: 16,
            paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
          }}
        >
          <Text style={styles.title}>Guidelines For Requesting Blood</Text>

          <FlatList
            scrollEnabled={true}
            data={sampleGuidelines}
            renderItem={({ item }) => (
              <View style={{ gap: 4 }}>
                <Text style={styles.header}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatlist}
          />
        </View>
        <RequestBloodunitScreen
          patientName={patientName}
          setPatientName={setPatientName}
          selectedBloodType={selectedBloodType}
          setSelectedBloodType={setSelectedBloodType}
          selectedRelationship={selectedRelationship}
          setSelectedRelationship={setSelectedRelationship}
          contactNumber={contactNumber}
          setContactNumber={setContactNumber}
          packedRequest={packedRequest}
          setPackedRequest={setPackedRequest}
          packedRequestInfo={packedRequestInfo}
          setPackedRequestInfo={setPackedRequestInfo}
          setImageUri={setImageUri}
          imageUri={imageUri}
          isEmergency={isEmergency}
          setIsEmergency={setIsEmergency}
          emergencyReason={emergencyReason}
          setEmergencyReason={setEmergencyReason}
        />
      </Carousel>

      <View style={styles.fixed}>
        <CallToActionBtn
          label="previous"
          onPress={() => prev()}
          style={{ flex: 1 }}
          secondary
        />
        <CallToActionBtn
          label={screenIndex === stepCount - 1 ? "submit" : "next"}
          onPress={screenIndex === stepCount - 1 ? handleSubmit : next}
          style={{ flex: 1 }}
        />
      </View>

      <SingleBtnModal
        visible={modalVisible}
        icon={
          <Ionicons name="information-circle-outline" size={42} color="black" />
        }
        onRequestClose={onModalClose}
        onPress={onModalClose}
        animation={true}
        title="Your Ticket Request Has Been Submitted"
        btnLabel="Okay"
        description="Your ticket request has been successfully submitted. You will be notified once a donor has been found."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
    gap: 12,
  },
  flatlist: {
    rowGap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  header: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    height: 90,
    gap: SPACES.sm,
  },
  fixed: {
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    flexDirection: "row",
    gap: 8,
  },
});

const sampleGuidelines = [
  {
    id: 1,
    title: "Hello",
    description: "some descriptions",
  },
  {
    id: 2,
    title: "Guideline #2",
    description: "you need to go to this ",
  },
];
