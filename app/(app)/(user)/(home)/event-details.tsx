import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import {
  HORIZONTAL_SCREEN_MARGIN,
  COLORS,
  SIZES,
  GS,
} from "../../../../constants";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebase-config"; // Adjust the path as needed
import { Card, Button, Icon, ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SingleBtnModal from "../../../../components/common/modals/SingleBtnModal"; // Ensure this import is correct
import CallToActionBtn from "components/common/CallToActionBtn";
export default function EventDetailsScreen() {
  const {
    title,
    description,
    date,
    address = "No address provided", // Default value
    time,
    documentId,
    latitude = "0", // Default value
    longitude = "0", // Default value
    isAdmin,
  } = useLocalSearchParams();
  console.log("Received parameters:", {
    title,
    description,
    date,
    address,
    time,
    documentId,
    latitude,
    longitude,
    isAdmin,
  });
  const [imageUri, setImageUri] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  console.log(
    title,
    description,
    date,
    address,
    time,
    documentId,
    latitude,
    longitude,
    isAdmin
  );

  useEffect(() => {
    const fetchImageUri = async () => {
      if (documentId) {
        console.log("Fetching document with ID:", documentId); // Log documentId
        const docRef = doc(FIRESTORE_DB, `events/${documentId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const imageUrl = docSnap.data().imageUrl;
          console.log("Image URL from Firestore:", imageUrl); // Log imageUrl
          setImageUri(imageUrl);
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("No documentId provided");
      }
    };

    fetchImageUri();
  }, [documentId]);

  const navigateToMaps = () => {
    if (typeof latitude === "string" && typeof longitude === "string") {
      router.push({
        pathname: "/(app)/(maps)/hospitalMapView",
        params: {
          event: JSON.stringify({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            title: title,
            description: description,
            startDate: date,
            startTime: time,
            address: address,
            mapCSS: JSON.stringify(mapCSS),
          }),
        },
      });
    } else {
      console.log("Latitude or Longitude is missing or not a string");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const navigateToEditEvent = () => {
    router.push({
      pathname: "/(app)/(admin)/(home)/manage-event-edit",
      params: {
        title,
        description,
        date,
        address,
        time,
        documentId,
        latitude,
        longitude,
        imageUri,
      },
    });
  };

  const downloadImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }

      const fileUri = FileSystem.documentDirectory + "image.jpg";
      await FileSystem.downloadAsync(imageUri, fileUri);
      await MediaLibrary.createAssetAsync(fileUri);
      alert("Image downloaded successfully!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error downloading image:", error.message);
      } else {
        console.error("Unknown error downloading image");
      }
    }
  };

  const handleDeleteEvent = async () => {
    if (documentId) {
      try {
        await deleteDoc(doc(FIRESTORE_DB, `events/${documentId}`));
        router.back();
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error deleting event:", error.message);
        } else {
          console.error("Unknown error deleting event");
        }
      }
    }
  };

  const donorsCount = 120;
  const donorsGoal = 200;
  const progress = donorsCount / donorsGoal;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Card>
          {imageUri ? (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Card.Cover source={{ uri: imageUri }} resizeMode="contain" />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder}>
              <Text>Loading image...</Text>
            </View>
          )}
          <Card.Content>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.dateTimeContainer}>
              <View style={{ flexDirection: "row" }}>
                <Icon source="calendar" size={20} color="#666" />
                <Text style={styles.dateTime}>{date}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Icon source="clock-outline" size={20} color="#666" />
                <Text style={styles.dateTime}>{time}</Text>
              </View>
            </View>
            <View style={styles.addressContainer}>
              <Icon source="map-marker" size={20} color="#666" />
              <Text style={styles.address}>{address}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
          </Card.Content>
        </Card>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{ uri: imageUri }}
              style={styles.fullImage}
              resizeMode="contain"
            />
            <Button onPress={() => setModalVisible(false)}>Close</Button>
            <Button onPress={downloadImage}>Download Image</Button>
          </View>
        </View>
      </Modal>
      {!isAdmin ? (
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={navigateToMaps} icon="map-marker">
            Navigate to Location
          </Button>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={navigateToEditEvent}
            icon="pencil"
            style={{ backgroundColor: "orange" }}
          >
            Edit Event
          </Button>
          <Button
            mode="contained"
            onPress={() => setDeleteModalVisible(true)}
            icon="delete"
            style={styles.secondaryButton}
          >
            Delete Event
          </Button>
        </View>
      )}
      <SingleBtnModal
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        onPress={handleDeleteEvent}
        title="Confirm Delete"
        description="Are you sure you want to delete this event?"
        btnLabel="Delete"
        extraBtn={
          <CallToActionBtn
            secondary={true}
            label={"Close"}
            onPress={() => setDeleteModalVisible(false)}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginVertical: 10,
  },
  dateTimeContainer: {
    flexDirection: "column", // Change to row to align items horizontally
    alignItems: "baseline", // Center items vertically
    justifyContent: "center",
    marginBottom: 5,
  },
  dateTime: {
    marginLeft: 5,
    marginRight: 15,
    color: "#666",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  address: {
    marginLeft: 5,
    color: "#666",
    flex: 1,
  },
  description: {
    textAlign: "justify",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    marginVertical: 10,
    lineHeight: 20,
  },
  progressContainer: {
    marginVertical: 15,
  },
  progressTitle: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  progressText: {
    textAlign: "center",
    marginTop: 5,
    color: "#666",
  },
  infoContainer: {
    marginTop: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
  },
  buttonContainer: {
    padding: 15,
    backgroundColor: "white",
  },
  secondaryButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
  },
  placeholder: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  debugContainer: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    marginTop: 20,
  },
  debugText: {
    fontSize: 14,
    color: "#333",
  },
});

const mapCSS = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  cTop: {
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
    fontFamily: "Poppins_700Bold",
    gap: 16,
  },
  buttonHospital: {
    width: "80%",
    padding: SIZES.medium,
    marginVertical: SIZES.small,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    elevation: 5,
    borderColor: COLORS.grayDark,
  },
  buttonHospitalPressed: {
    width: "85%",
    padding: SIZES.medium,
    marginVertical: SIZES.medium,
    backgroundColor: "white",
    borderWidth: 2,
    elevation: 5,
    borderRadius: 10,
    borderColor: COLORS.grayDark,
  },
  textHospital: {
    fontSize: SIZES.large,
    textAlign: "left",
    color: COLORS.grayDark,
  },
  textHospitalPressed: {
    fontSize: SIZES.large,
    textAlign: "left",
    color: "white",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "10%",
    alignSelf: "center",
    backgroundColor: COLORS.primary,
  },
  markerContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    padding: 5,
    borderRadius: 20,
    elevation: 5,
  },
  markerText: {
    color: COLORS.primary,
    fontFamily: "Poppins_700Bold",
    textAlignVertical: "center",
  },
  markerImage: {
    width: 25,
    height: 25,
  },
  fab: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: COLORS.grayDark,
    borderWidth: 1,
    width: 100,
    shadowColor: "black",
    elevation: 5,
    flexDirection: "row",
    margin: 16,
    left: 0,
    top: 0,
    zIndex: 6,
  },
  header: {
    fontSize: SIZES.xLarge,
    marginBottom: SIZES.medium,
    marginTop: 30,
  },
  subHeader: {
    fontSize: SIZES.medium,
  },
  infoBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  infoTop: {
    position: "absolute",
    zIndex: 5,
    height: 120,
    left: 0,
    right: 0,
    top: 0,
    paddingTop: 20,
    backgroundColor: COLORS.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  infoTopTitle: {
    fontSize: SIZES.xLarge,
    fontFamily: "Poppins_700Bold",
    color: COLORS.background,
  },
  infoTopDistance: {
    fontSize: SIZES.medium,
    color: COLORS.background,
  },
  hContainer: {
    flex: 1,
    width: "100%",
    borderColor: COLORS.slate100,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 50,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingVertical: 12,
  },
  hName: {
    flex: 1,
    fontFamily: "Poppins_700Bold",
  },
  icon: {
    width: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
