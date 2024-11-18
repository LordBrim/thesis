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
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { FIRESTORE_DB, FIREBASE_STORAGE } from "firebase-config";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { incrementHospitalReports, incrementRequest } from "rtx/slices/reports";
import axios from "axios";
import { getAuth } from "firebase/auth";

interface TicketState {
  id: string;
  patientName: string;
  status: "pending" | "rejected" | "accepted" | "cancelled" | "in-progress";
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
interface adminUser {
  hospitalName: string;
}
export default function ManageTicketReview() {
  const { ticket } = useLocalSearchParams();
  const [ticketData, setTicketData] = useState<TicketState | null>(null);
  const [userData, setUserData] = useState<UserState | null>(null);
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<string | null>();

  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getFirestore();
  const currentUser = auth.currentUser;
  useEffect(() => {
    const fetchUserDoc = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "User", currentUser.uid));
        const userData = userDoc.data();
        setAdminUser(userData?.hospitalName);
      }
    };

    fetchUserDoc();
  }, []);
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

  const getEmailContent = (status: string) => {
    let subject = "Ticket Status Update";
    let text = `Your ticket status has been updated to: ${status}.`;
    let html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333;">Lifeline Ticket Status Update</h2>
        <p style="color: #555;">Dear User,</p>
        <p style="color: #555;">Your ticket status has been updated to: <strong>${status}</strong>.</p>
        <p style="color: #555;">If you have any questions, please contact our support team.</p>
        <p style="color: #555;">Best regards,<br/>The Lifeline Team</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #aaa; font-size: 12px; text-align: center;">This is an automated message, please do not reply.</p>
      </div>
    `;

    switch (status) {
      case "accepted":
        subject = "Request Accepted";
        text = `Congratulations! Your Request for a ${ticketData.packedRequest} has been accepted by ${adminUser}`;
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #333;">Congratulations! Your Request for a ${ticketData.packedRequest} has been accepted by ${adminUser}</h2>
            <p style="color: #555;">Dear User,</p>
            <p style="color: #555;">We are pleased to inform you that your request has been accepted. Please wait for further announcement for your schedule</p>
            <p style="color: #555;">If you have any questions, please contact our support team.</p>
            <p style="color: #555;">Best regards,<br/>The Lifeline Team</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #aaa; font-size: 12px; text-align: center;">This is an automated message, please do not reply.</p>
          </div>
        `;
        break;
      case "rejected":
        subject = "Request Rejected";
        text = `Unfortunately, Your Request for a ${ticketData.packedRequest} has been rejected.`;
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #333;">Lifeline Appointment Rejected</h2>
            <p style="color: #555;">Dear User,</p>
            <p style="color: #555;">We regret to inform you that your appointment has been rejected. Please contact our support team for further assistance.</p>
            <p style="color: #555;">Best regards,<br/>The Lifeline Team</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #aaa; font-size: 12px; text-align: center;">This is an automated message, please do not reply.</p>
          </div>
        `;
      case "in-progress":
        subject = "Request Progress Announcement";
        text = `Thank you for waiting, you request has been processed please read for further instruction.`;
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #333;">Lifeline Appointment Rejected</h2>
            <p style="color: #555;">Dear User,</p>
            <p style="color: #555;">Please proceed to the laboratory between 10:00 A.M. to 5:00 P.M. on weekdays. Kindly take note of the hospital's blood processing fee which may range from -- to --. Thank you for using Lifeline.</p>
            <p style="color: #555;">Best regards,<br/>The Lifeline Team</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #aaa; font-size: 12px; text-align: center;">This is an automated message, please do not reply.</p>
          </div>
        `;
        break;
    }

    return { subject, text, html };
  };

  const sendEmailNotification = async (email: string, status: string) => {
    const API_KEY = "d1440a571533e6c003ef72358ff55e5a-f6fe91d3-6d5fa136";
    const DOMAIN = "lifeline-ph.tech";

    const { subject, text, html } = getEmailContent(status);

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
        console.log("Status update email sent successfully");
      } else {
        console.error("Failed to send email:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending status update email:", error);
    }
  };

  const handleUpdateStatus = async (
    status: "accepted" | "cancelled" | "rejected" | "in-progress"
  ) => {
    if (!ticketData || !userData || !currentUser) return;

    const updatedTicketData = {
      ...ticketData,
      status: status,
      message: "deliberation",
    };
    try {
      const ticketDocRef = doc(FIRESTORE_DB, "ticketRequest", ticketData.id);
      await updateDoc(ticketDocRef, {
        status: updatedTicketData.status,
        message: updatedTicketData.message,
      });
      setTicketData(updatedTicketData);
      if (status === "accepted") {
        incrementRequest();
        incrementHospitalReports(adminUser, false);
        console.log("increment");
      }

      if (status === "accepted" || status === "rejected") {
        if (userData.email) {
          await sendEmailNotification(userData.email, status);
        } else {
          console.error("User email is not defined");
        }
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text
          style={{
            color: COLORS.primary,
            fontFamily: "Poppins_700Bold",
            fontSize: 24,
          }}
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
          <Text style={{ fontSize: 20, fontFamily: "Poppins_700Bold" }}>
            Ticket Number:
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: COLORS.primary,
              fontFamily: "Poppins_700Bold",
            }}
          >
            {ticketData.id}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: "Poppins_700Bold", margin: 5 }}
          >
            Patient Name: {ticketData.patientName}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: "Poppins_700Bold", margin: 5 }}
          >
            Blood Type: {ticketData.selectedBloodType}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: "Poppins_700Bold", margin: 5 }}
          >
            Relationship: {ticketData.selectedRelationship}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: "Poppins_700Bold", margin: 5 }}
          >
            Contact Number: {ticketData.contactNumber}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: "Poppins_700Bold", margin: 5 }}
          >
            Emergency Reason: {ticketData.emergencyReason || "N/A"}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: "Poppins_700Bold", margin: 5 }}
          >
            Packed Request: {ticketData.packedRequest}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: "Poppins_700Bold", margin: 5 }}
          >
            Packed Request Info: {ticketData.packedRequestInfo || "N/A"}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: "Poppins_700Bold", margin: 5 }}
          >
            Status: {ticketData.status}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: "Poppins_700Bold", margin: 5 }}
          >
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
          {ticketData.status === "pending" && (
            <>
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
            </>
          )}
          {ticketData.status === "accepted" && (
            <>
              <Button
                title="Processing Available"
                onPress={() => handleUpdateStatus("in-progress")}
                color="green"
              />
              <Button
                title="Cancel Request"
                onPress={() => handleUpdateStatus("rejected")}
                color={COLORS.primary}
              />
            </>
          )}
          {ticketData.status === "in-progress" && (
            <>
              <Button
                title="Processing Available"
                onPress={() => handleUpdateStatus("in-progress")}
                color="green"
                disabled
              />
              <Button
                title="Cancel Request"
                onPress={() => handleUpdateStatus("rejected")}
                color={COLORS.primary}
                disabled
              />
            </>
          )}
          {(ticketData.status === "rejected" ||
            ticketData.status === "cancelled") && (
            <>
              <Button
                title="Accept"
                onPress={() => handleUpdateStatus("accepted")}
                color="green"
                disabled
              />
              <Button
                title="Reject"
                onPress={() => handleUpdateStatus("rejected")}
                color={COLORS.primary}
                disabled
              />
            </>
          )}
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
    fontFamily: "Poppins_700Bold",
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
    gap: 10,
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
