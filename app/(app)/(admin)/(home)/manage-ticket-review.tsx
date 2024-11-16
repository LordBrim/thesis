import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Button,
  Alert,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../../constants/theme";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { router, useLocalSearchParams } from "expo-router";
import moment from "moment";
import IconBtn from "../../../../components/common/IconButton";
import {
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FIRESTORE_DB } from "firebase-config";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { incrementHospitalReports, incrementRequest } from "rtx/slices/reports";
import { RootState } from "app/store";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  color: string;
  isReject?: boolean;
  isMissing?: boolean;
  disabled?: boolean;
};

interface TicketState {
  id: string;
  name: string;
  status:
    | "pending"
    | "rejected"
    | "accepted"
    | "cancelled"
    | "completed"
    | "cancelled";
  userUID: string;
  userEmail: string;
  age?: number;
  avatarUrl?: string;
  city?: string;
  contactDetails?: string;
  displayName?: string;
  sex?: string;
  message?: string;
  selectedDate?: string;
  selectedHospital?: string;
  selectedTime?: string;
  ticketNumber?: string;
  type?: string;
  checklistData?: { [key: string]: string };
  isComplete: boolean; // Add checklistData as an optional property
  // Add other properties as needed
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  color,
  isReject,
  isMissing,
  disabled,
}) => (
  <Pressable
    onPress={disabled ? undefined : onPress}
    style={({ pressed }) => [
      {
        backgroundColor: disabled ? COLORS.grayMid : color,
        padding: 10,
        borderRadius: 5,
        opacity: pressed ? 0.8 : 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android shadow
      },
    ]}
  >
    <View style={styles.buttonContent}>
      {isReject && <FontAwesome6 name="xmark" size={24} color="white" />}
      {isMissing && (
        <FontAwesome6 name="person-circle-question" size={24} color="white" />
      )}
      {!isReject && !isMissing && (
        <FontAwesome6 name="check" size={24} color="white" />
      )}
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </Pressable>
);

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
      subject = "Appointment Accepted";
      text = "Congratulations! Your appointment has been accepted.";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333;">Lifeline Appointment Accepted</h2>
          <p style="color: #555;">Dear User,</p>
          <p style="color: #555;">We are pleased to inform you that your appointment has been accepted.</p>
          <p style="color: #555;">If you have any questions, please contact our support team.</p>
          <p style="color: #555;">Best regards,<br/>The Lifeline Team</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #aaa; font-size: 12px; text-align: center;">This is an automated message, please do not reply.</p>
        </div>
      `;
      break;
    case "rejected":
      subject = "Appointment Cancelled";
      text = "Unfortunately, your appointment has been rejected.";
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
      break;
    case "cancelled":
      subject = "Appointment Cancelled";
      text = "Unfortunately, your appointment has been cancelled.";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333;">Lifeline Appointment cancelled</h2>
          <p style="color: #555;">Dear User,</p>
          <p style="color: #555;">We regret to inform you that your appointment has been cancelled. Please contact our support team for further assistance.</p>
          <p style="color: #555;">Best regards,<br/>The Lifeline Team</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #aaa; font-size: 12px; text-align: center;">This is an automated message, please do not reply.</p>
        </div>
      `;
      break;
    case "completed":
      subject = "Appointment Completed";
      text = "Your appointment has been successfully completed.";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333;">Lifeline Appointment Completed</h2>
          <p style="color: #555;">Dear User,</p>
          <p style="color: #555;">We are pleased to inform you that your appointment has been successfully completed. Thank you for your participation.</p>
          <p style="color: #555;">Best regards,<br/>The Lifeline Team</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #aaa; font-size: 12px; text-align: center;">This is an automated message, please do not reply.</p>
        </div>
      `;
      break;
    // Add more cases as needed
  }

  return { subject, text, html };
};

const sendEmailNotification = async (email: string, status: string) => {
  const API_KEY = "d1440a571533e6c003ef72358ff55e5a-f6fe91d3-6d5fa136";
  const DOMAIN = "lifeline-ph.tech";

  const { subject, text, html } = getEmailContent(status);

  const data = new URLSearchParams({
    from: "Lifeline Support <support@lifeline.com>",
    to: email,
    subject: subject,
    text: text,
    html: html,
  });

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
          "Content-Type": "application/x-www-form-urlencoded",
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

export default function ManageTicketReview() {
  const { ticket } = useLocalSearchParams();
  const [ticketData, setTicketData] = useState<TicketState | null>(null);
  const [openChecklist, setOpenChecklist] = useState(false);
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const auth = getAuth();
  const db = getFirestore();
  const currentUser = auth.currentUser;
  const [userDetailsHeight, setUserDetailsHeight] = useState(0);
  const [checklistHeight, setChecklistHeight] = useState(0);
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
      setTicketData(JSON.parse(ticket as string)); // Deserialize the ticket data
    }
  }, [ticket]);

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

  const refreshTicketData = async () => {
    if (!ticketData) return;
    try {
      const ticketDocRef = doc(FIRESTORE_DB, "ticketDonate", ticketData.id);
      const ticketDoc = await getDoc(ticketDocRef);
      if (ticketDoc.exists()) {
        setTicketData(ticketDoc.data() as TicketState);
      }
    } catch (error) {
      console.error("Error refreshing ticket data:", error);
    }
  };

  const handleUpdateStatus = async (
    status:
      | "pending"
      | "rejected"
      | "accepted"
      | "cancelled"
      | "completed"
      | "cancelled"
  ) => {
    if (!ticketData) return;

    setLoading(true);

    const updatedTicketData = {
      ...ticketData,
      status: status,
      message: "deliberation",
    };

    try {
      const ticketDocRef = doc(FIRESTORE_DB, "ticketDonate", ticketData.id);
      await updateDoc(ticketDocRef, {
        status: updatedTicketData.status,
        message: updatedTicketData.message,
      });
      await refreshTicketData();
      await sendEmailNotification(ticketData.userEmail, status); // Send email notification
    } catch (error) {
      console.error("Error updating ticket:", error);
    } finally {
      setLoading(false);
      router.back();
    }
  };

  const handleCompleteTransaction = async () => {
    if (!ticketData) return;

    setLoading(true);

    const updatedTicketData = {
      ...ticketData,
      message: "incentives",
      isComplete: true,
    };

    try {
      const ticketDocRef = doc(FIRESTORE_DB, "ticketDonate", ticketData.id);
      await updateDoc(ticketDocRef, {
        isComplete: true,
      });

      const userDocRef = doc(FIRESTORE_DB, "User", ticketData.userUID);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const newIncentiveCount = (userData.incentive || 0) + 1;
        const nextDonationDate = moment().add(3, "months").format("YYYY-MM-DD");
        await updateDoc(userDocRef, {
          incentive: newIncentiveCount,
          nextDonationDate: nextDonationDate,
          status: "completed",
        });
      }

      await refreshTicketData();
      await sendEmailNotification(ticketData.userEmail, "completed"); // Send email notification

      incrementRequest();
      incrementHospitalReports(adminUser, false);

      Alert.alert(
        "Donation Completed",
        `The user will be eligible to donate again on ${moment()
          .add(3, "months")
          .format("MMMM D, YYYY")}.`
      );
      router.back();
    } catch (error) {
      console.error("Error completing transaction:", error);
    } finally {
      setLoading(false);
      router.back();
    }
  };

  const handleCancel = async () => {
    if (!ticketData) return;

    setLoading(true);

    try {
      const ticketDocRef = doc(FIRESTORE_DB, "ticketDonate", ticketData.id);
      await deleteDoc(ticketDocRef);
      setTicketData(null); // Optionally, you can navigate away or show a message
      router.back();
    } catch (error) {
      console.error("Error canceling ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderChecklistItem = ({
    item,
    index,
  }: {
    item: [string, string];
    index: number;
  }) => (
    <View key={item[0]} style={styles.checklistItem}>
      <Text style={styles.checklistKey}>
        {index + 1}. {item[0]}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 30,
        }}
      >
        <View style={styles.bullet} />
        <Text style={styles.checklistValue}>{item[1]}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Modal
        transparent={true}
        animationType="fade"
        visible={loading}
        onRequestClose={() => {}}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Updating ticket...</Text>
          </View>
        </View>
      </Modal>
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
          width: "90%",
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
          {ticketData.ticketNumber}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: 5,
          }}
        >
          <FontAwesome6 name="calendar-day" size={18} color="black" />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_700Bold",
              marginLeft: 7,
            }}
          >
            {ticketData.selectedDate
              ? formatDate(ticketData.selectedDate)
              : "N/A"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: 5,
          }}
        >
          <FontAwesome6 name="clock" size={18} color="black" />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 5,
              fontFamily: "Poppins_700Bold",
            }}
          >
            {ticketData.selectedTime}
          </Text>
        </View>
        <Text
          style={{ fontSize: 16, fontFamily: "Poppins_700Bold", margin: 5 }}
        >
          Status: {ticketData.status.toUpperCase()}
        </Text>
        {ticketData.status == "accepted" ? (
          <Text
            style={{ fontSize: 16, fontFamily: "Poppins_700Bold", margin: 5 }}
          >
            Appoinment Result:{" "}
            {!ticketData.isComplete ? "IN-REVIEW" : "COMPLETED"}
          </Text>
        ) : null}
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
      {openUserDetails ? (
        <View
          style={styles.checklistContainerUser}
          onLayout={(event) =>
            setUserDetailsHeight(event.nativeEvent.layout.height)
          }
        >
          <Text style={styles.textDetails}>
            Name: {ticketData.name || ticketData.displayName}
          </Text>
          <Text style={styles.textDetails}>City: {ticketData.city}</Text>
          <Text style={styles.textDetails}>
            Contact Details: {ticketData.contactDetails}
          </Text>
          <Text style={styles.textDetails}>Sex: {ticketData.sex}</Text>
          <Text style={styles.textDetails}>Age: {ticketData.age}</Text>
          <Text style={styles.textDetails}>
            User Email: {ticketData.userEmail}
          </Text>
        </View>
      ) : null}

      <Pressable
        style={card.qContainer}
        onPress={
          openChecklist
            ? () => setOpenChecklist(false)
            : () => setOpenChecklist(true)
        }
        android_ripple={{ radius: 250 }}
      >
        <Text style={styles.checklistTitle}>Preliminary Checklist</Text>
        {openChecklist ? (
          <IconBtn
            icon="minus"
            size={18}
            onPress={() => setOpenChecklist(false)}
          />
        ) : (
          <IconBtn
            icon="plus"
            size={18}
            onPress={() => setOpenChecklist(true)}
          />
        )}
      </Pressable>
      {openChecklist ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={Object.entries(ticketData.checklistData || {})}
            renderItem={renderChecklistItem}
            keyExtractor={(item) => item[0]}
            style={styles.checklistContainer}
            scrollEnabled={false}
          />
        </View>
      ) : null}

      <View style={styles.buttonContainer}>
        {(ticketData.status === "accepted" && !ticketData.isComplete) ||
        ticketData.status === "rejected" ? (
          <CustomButton
            title="Complete Transaction"
            onPress={handleCompleteTransaction}
            color="#10b500"
            isReject={false}
            disabled={
              (ticketData.status === "accepted" && ticketData.isComplete) ||
              ticketData.status === "rejected" ||
              ticketData.status === "cancelled"
            }
          />
        ) : (
          <CustomButton
            title="Accept"
            onPress={() => handleUpdateStatus("accepted")}
            color="#10b500"
            isReject={false}
            disabled={
              (ticketData.status === "accepted" && ticketData.isComplete) ||
              ticketData.status === "rejected" ||
              ticketData.status === "cancelled"
            }
          />
        )}
        {ticketData.status === "pending" ? (
          <CustomButton
            title="Reject"
            onPress={() => handleUpdateStatus("rejected")}
            color={COLORS.primary}
            isReject={true}
          />
        ) : (
          <CustomButton
            title="Cancel Appointment"
            onPress={() => handleUpdateStatus("cancelled")}
            color={COLORS.primary}
            isReject={true}
            disabled={
              (ticketData.status === "accepted" && ticketData.isComplete) ||
              ticketData.status === "rejected" ||
              ticketData.status === "cancelled"
            }
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",

    padding: 20,
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    width: "100%",
    backgroundColor: COLORS.background,
  },
  textDetails: {
    fontSize: 16,
    marginVertical: 3,
    fontFamily: "Poppins_700Bold",
  },
  checklistContainer: {
    width: "90%",
    height: "auto",
    margin: 10,
    borderWidth: 1,
    borderColor: COLORS.grayMid,
    borderRadius: 10,
    padding: 10,
  },
  checklistContainerUser: {
    width: "90%",
    justifyContent: "space-around",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: COLORS.grayMid,
  },
  checklistTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    marginVertical: 20,
  },
  checklistItem: {
    marginBottom: 10,
  },
  checklistKey: {
    fontFamily: "Poppins_700Bold",
  },
  checklistValue: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: COLORS.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    width: "100%",
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4, // Makes the view a circle
    backgroundColor: "black",
    marginRight: 10,
  },
  noChecklistData: {
    fontSize: 16,
    fontStyle: "italic",
    color: COLORS.grayMid,
    marginTop: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 5,
    color: "white",
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 200,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: COLORS.primary,
  },
});

const card = StyleSheet.create({
  qContainer: {
    width: "90%",
    minHeight: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
  question: {
    flex: 1,
    fontFamily: "Poppins_700Bold",
  },
  aContainer: {
    width: "100%",
    minHeight: 35,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingTop: 8,
    paddingBottom: 16,
  },
  answer: {
    flex: 1,
    flexDirection: "row",
  },
});
