import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Button,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "constants/theme";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import IconBtn from "components/common/IconButton";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { FIRESTORE_DB, FIREBASE_STORAGE } from "firebase-config";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { incrementHospitalReports, incrementRequest } from "rtx/slices/reports";

interface TicketState {
  id: string;
  patientName: string;
  status: "pending" | "rejected" | "accepted" | "cancelled";
  userId: string;
  userEmail: string;
  contactNumber?: string;
  emergencyReason?: string;
  imageUrl?: string;
  isEmergency?: boolean;
  message?: string;
  packedRequest?: string;
  packedRequestInfo?: string;
  selectedBloodType?: string;
  selectedRelationship?: string;
  type: string;
}

interface UserState {
  displayName: string;
  email: string;
  phoneNumber: string;
  city: string;
  contactDetails: string;
  sex: string;
  // Add other user properties as needed
}

export default function ManageTicketReview() {
  const { ticket } = useLocalSearchParams();
  const [ticketData, setTicketData] = useState<TicketState | null>(null);
  const [userData, setUserData] = useState<UserState | null>(null);
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (ticket) {
      const parsedTicket = JSON.parse(ticket as string);
      console.log("Parsed ticket data:", parsedTicket); // Debugging
      setTicketData(parsedTicket);
      fetchUserData(parsedTicket.userId);
      fetchImageUrl(parsedTicket.imageUrl);
    }
  }, [ticket]);

  const fetchUserData = async (userId: string) => {
    try {
      console.log("Fetching user data for userId:", userId); // Debugging
      const userDocRef = doc(FIRESTORE_DB, "User", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        console.log("User data:", userDoc.data()); // Debugging
        setUserData(userDoc.data() as UserState);
      } else {
        console.log("No such user document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchImageUrl = async (filePath: string) => {
    try {
      const storageRef = ref(FIREBASE_STORAGE, filePath);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };

  const handleDownloadImage = async (imageUrl: string) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }

      const fileUri = FileSystem.documentDirectory + "image.jpg";
      await FileSystem.downloadAsync(imageUrl, fileUri);
      await MediaLibrary.createAssetAsync(fileUri);
      alert("Image downloaded successfully!");
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image.");
    }
  };

  if (!ticketData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    return moment(dateString, "YYYY-MM-DD").format("MMMM D, YYYY");
  };

  const handleUpdateStatus = async (
    status: "accepted" | "cancelled" | "rejected"
  ) => {
    if (!ticketData) return;

    const updatedTicketData = {
      ...ticketData,
      status: status,
      message: "deliberation",
    };
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    try {
      const ticketDocRef = doc(FIRESTORE_DB, "ticketRequest", ticketData.id);
      await updateDoc(ticketDocRef, {
        status: updatedTicketData.status,
        message: updatedTicketData.message,
      });
      dispatch(incrementRequest());
      incrementHospitalReports(user.hospitalName, false);
      setTicketData(updatedTicketData);
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text
          style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 24 }}
        >
          Ticket Details
        </Text>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            borderWidth: 1,
            borderColor: COLORS.grayMid,
            borderRadius: 10,
            padding: 10,
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Ticket Number:
          </Text>
          <Text
            style={{ fontSize: 20, color: COLORS.primary, fontWeight: "bold" }}
          >
            {ticketData.id}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
            Patient Name: {ticketData.patientName}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
            Blood Type: {ticketData.selectedBloodType}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
            Relationship: {ticketData.selectedRelationship}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
            Contact Number: {ticketData.contactNumber}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
            Emergency Reason: {ticketData.emergencyReason || "N/A"}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
            Packed Request: {ticketData.packedRequest}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
            Packed Request Info: {ticketData.packedRequestInfo || "N/A"}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
            Status: {ticketData.status}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
            Message: {ticketData.message}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {imageUrl && (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={{ uri: imageUrl }}
                  resizeMode="contain"
                  style={{
                    width: 200,
                    height: 200,
                    marginVertical: 10,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          {imageUrl && (
            <Modal
              visible={modalVisible}
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <Image
                  source={{ uri: imageUrl }}
                  resizeMode="contain"
                  style={styles.fullImage}
                />
                <Button
                  title="Download Image"
                  onPress={() => handleDownloadImage(imageUrl)}
                />
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </Modal>
          )}
        </View>

        <Pressable
          style={card.qContainer}
          onPress={
            openUserDetails
              ? () => setOpenUserDetails(false)
              : () => setOpenUserDetails(true)
          }
          android_ripple={{ radius: 250 }}
        >
          <Text style={styles.checklistTitle}>User Details</Text>
          {openUserDetails ? (
            <IconBtn
              icon="minus"
              size={18}
              onPress={() => setOpenUserDetails(false)}
            />
          ) : (
            <IconBtn
              icon="plus"
              size={18}
              onPress={() => setOpenUserDetails(true)}
            />
          )}
        </Pressable>
        {openUserDetails && userData ? (
          <View style={styles.checklistContainer}>
            <Text style={styles.textDetails}>Name: {userData.displayName}</Text>
            <Text style={styles.textDetails}>Email: {userData.email}</Text>
            <Text style={styles.textDetails}>
              Phone: {userData.contactDetails}
            </Text>
            <Text style={styles.textDetails}>City: {userData.city}</Text>
            <Text style={styles.textDetails}>Sex: {userData.sex}</Text>
          </View>
        ) : (
          openUserDetails && (
            <Text style={styles.noChecklistData}>No user data available</Text>
          )
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="Accept"
            onPress={() => handleUpdateStatus("accepted")}
            color="green"
          />
          <Button
            title="Reject"
            onPress={() => handleUpdateStatus("rejected")}
            color={COLORS.primary}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    padding: 20,
  },
  textDetails: {
    fontSize: 16,
    marginVertical: 3,
  },
  checklistContainer: {
    width: "100%",
    marginLeft: 15,
  },
  checklistTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    width: "100%",
  },
  noChecklistData: {
    fontSize: 16,
    fontStyle: "italic",
    color: COLORS.grayMid,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  fullImage: {
    width: "100%",
    height: "80%",
  },
});

const card = StyleSheet.create({
  qContainer: {
    width: "100%",
    minHeight: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
});
