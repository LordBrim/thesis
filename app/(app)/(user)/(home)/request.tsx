import {
  COLORS,
  HORIZONTAL_SCREEN_MARGIN,
  SIZES,
  SPACES,
} from "../../../../constants";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image, // Add this import
} from "react-native";
import Carousel from "pinar";
import CallToActionBtn from "components/common/CallToActionBtn";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import StepsIndicator from "components/common/StepsIndicator";
import RequestBloodunitScreen from "./request-bloodunit";
import { firestoreOperations } from "../../../../firestore-services";
import { getAuth } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { FIREBASE_STORAGE } from "../../../../firebase-config";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import RequestReviewScreen from "./request-review";

interface Errors {
  patientName?: string;
  selectedBloodType?: string;
  selectedRelationship?: string;
  contactNumber?: string;
  emergencyReason?: string;
}

export default function Request() {
  const stepCount = 3;
  let [screenIndex, setScreenIndex] = useState(0);

  const [patientName, setPatientName] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("A+");
  const [selectedRelationship, setSelectedRelationship] = useState("Myself");
  const [contactNumber, setContactNumber] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState("");

  const [packedRequest, setPackedRequest] = useState("Whole Blood");
  const [packedRequestInfo, setPackedRequestInfo] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

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
    router.navigate("(app)/(user)/(tabs)");
  };

  const validateField = (field: keyof Errors, value: string) => {
    let error = "";
    switch (field) {
      case "patientName":
        if (!value) error = "Patient's name is required.";
        break;
      case "selectedBloodType":
        if (!value) error = "Blood type is required.";
        break;
      case "selectedRelationship":
        if (!value) error = "Relationship to patient is required.";
        break;
      case "contactNumber":
        if (!value) error = "Contact number is required.";
        else if (!/^\d{3} \d{3} \d{4}$/.test(value))
          error = "Contact number is invalid.";
        break;
      case "emergencyReason":
        if (isEmergency && !value) error = "Emergency reason is required.";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const validateForm = () => {
    const fields = [
      { field: "patientName", value: patientName },
      { field: "selectedBloodType", value: selectedBloodType },
      { field: "selectedRelationship", value: selectedRelationship },
      { field: "contactNumber", value: contactNumber },
    ];

    if (isEmergency) {
      fields.push({ field: "emergencyReason", value: emergencyReason });
    }

    let allValid = true;
    const newErrors: Errors = {};

    fields.forEach(({ field, value }) => {
      if (!value) {
        newErrors[field as keyof Errors] = "This field is required.";
        allValid = false;
      }
    });

    setErrors(newErrors);

    if (!allValid) {
      setWarningMessage("Please fill in all required fields.");
      setWarningModalVisible(true);
    }

    return allValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

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
      // Exclude appointmentDate, appointmentTime, and selectedHospital
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

  const handleNext = () => {
    if (screenIndex === 1) {
      const fields = [
        { field: "patientName", value: patientName },
        { field: "selectedBloodType", value: selectedBloodType },
        { field: "selectedRelationship", value: selectedRelationship },
        { field: "contactNumber", value: contactNumber },
        { field: "imageUri", value: imageUri }, // Add imageUri to validation
      ];

      if (isEmergency) {
        fields.push({ field: "emergencyReason", value: emergencyReason });
      }

      let allValid = true;
      const newErrors: Errors = {};

      fields.forEach(({ field, value }) => {
        if (!value) {
          newErrors[field as keyof Errors] = "This field is required.";
          allValid = false;
        }
      });

      setErrors(newErrors);

      if (!allValid) {
        setValidationError("Please fill in all required fields.");
        setWarningModalVisible(true);
        return;
      }
    }
    next();
  };

  const Screens = ["Request\nGuidelines", "File A\nRequest", "Review\nRequest"];
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    });
  }, []);
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

          <ScrollView>
            <FlatList
              scrollEnabled={false}
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
          </ScrollView>
        </View>
        <RequestBloodunitScreen
          patientName={patientName}
          setPatientName={(value) => {
            setPatientName(value);
            validateField("patientName", value);
          }}
          selectedBloodType={selectedBloodType}
          setSelectedBloodType={(value) => {
            setSelectedBloodType(value);
            validateField("selectedBloodType", value);
          }}
          selectedRelationship={selectedRelationship}
          setSelectedRelationship={(value) => {
            setSelectedRelationship(value);
            validateField("selectedRelationship", value);
          }}
          contactNumber={contactNumber}
          setContactNumber={(value) => {
            setContactNumber(value);
            validateField("contactNumber", value);
          }}
          packedRequest={packedRequest}
          setPackedRequest={setPackedRequest}
          packedRequestInfo={packedRequestInfo}
          setPackedRequestInfo={setPackedRequestInfo}
          setImageUri={setImageUri}
          imageUri={imageUri}
          isEmergency={isEmergency}
          setIsEmergency={(value) => {
            setIsEmergency(value);
            validateField("emergencyReason", emergencyReason);
          }}
          emergencyReason={emergencyReason}
          setEmergencyReason={(value) => {
            setEmergencyReason(value);
            validateField("emergencyReason", value);
          }}
          errors={errors}
          setErrors={setErrors}
          setImageModalVisible={setImageModalVisible}
          next={next}
        />
        <RequestReviewScreen
          patientName={patientName}
          selectedBloodType={selectedBloodType}
          selectedRelationship={selectedRelationship}
          contactNumber={contactNumber}
          packedRequest={packedRequest}
          packedRequestInfo={packedRequestInfo}
          imageUri={imageUri}
          isEmergency={isEmergency}
          emergencyReason={emergencyReason}
          setImageModalVisible={setImageModalVisible}
        />
      </Carousel>

      <View style={styles.fixed}>
        {screenIndex > 0 && (
          <CallToActionBtn
            label="previous"
            onPress={() => prev()}
            style={{ flex: 1 }}
            secondary
          />
        )}
        <CallToActionBtn
          label={screenIndex === stepCount - 1 ? "submit" : "next"}
          onPress={screenIndex === stepCount - 1 ? handleSubmit : handleNext}
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

      <SingleBtnModal
        visible={warningModalVisible}
        icon={<Ionicons name="warning-outline" size={42} color="black" />}
        onRequestClose={() => setWarningModalVisible(false)}
        onPress={() => setWarningModalVisible(false)}
        animation={true}
        title="Validation Error"
        btnLabel="Okay"
        description={warningMessage}
        errorMessage={validationError}
      />

      <Modal visible={imageModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setImageModalVisible(false)}
          >
            <Ionicons name="close" size={36} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: imageUri }} style={styles.modalImage} />
        </View>
      </Modal>
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
    marginBottom: 70,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: "Poppins_700Bold",
  },
  header: {
    color: COLORS.primary,
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  description: {
    flex: 1,
    textAlign: "justify",
    fontFamily: "Poppins_400Regular",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalCloseButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  modalImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
});

const sampleGuidelines = [
  {
    id: 1,
    title: "Lifeline as a Platform",
    description:
      "Lifeline serves as a platform of convenience between you and our partnered hospitals. Our goal is to simplify the process of connecting with hospitals, providing you with more options without exerting much effort. However, please note that Lifeline does not have the ability to accept or expedite your requests, as there are multiple factors whether a partnered hospital will be able to accommodate your request. **By continuing, you acknowledge and understand this limitation.**",
  },
  {
    id: 2,
    title: "Complete the Request Form",
    description:
      "The information you provide will be forwarded to our partnered hospitals. As such, the request form must be complete and accurate in order to process the request. Incomplete submissions may lead to rejection.",
  },
  {
    id: 3,
    title: "Understand Possible Rejections",
    description:
      "Please be aware that requests can be rejected by our partnered hospitals for reasons such as incomplete documentation, insufficient stock of blood types, or other hospital-specific criteria. If your request is rejected, you may opt to resubmit or explore other options outside of Lifeline.",
  },
  {
    id: 4,
    title: "Check for Fees",
    description:
      "While requesting blood through Lifeline is free, please note that hospital fees may still apply, such as blood screening fees to ensure that each blood bag is safe from transmissible infections (i.e., HIV, Syphilis).",
  },
  {
    id: 5,
    title: "Requesting for Others",
    description:
      "If you are requesting blood for someone else, please make sure to fill out the form accurately and to indicate your relationship to the patient.",
  },
];
