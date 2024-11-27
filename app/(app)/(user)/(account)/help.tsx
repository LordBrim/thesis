import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import { saveToLibraryAsync } from "expo-media-library";

const CustomModal = ({
  visible,
  onRequestClose,
  title,
  description,
  btnLabel1,
  btnLabel2,
  onPressBtn1,
  onPressBtn2,
}) => (
  <Modal
    transparent={true}
    animationType="slide"
    visible={visible}
    onRequestClose={onRequestClose}
  >
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalDescription}>{description}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={onPressBtn1}>
              <Text style={styles.modalButtonText}>{btnLabel1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={onPressBtn2}>
              <Text style={styles.modalButtonText}>{btnLabel2}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

export default function Help() {
  const [modalVisible, setModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const handleContactSupport = () => {
    setModalVisible(true);
  };

  const handleEmailUs = () => {
    setEmailModalVisible(true);
  };

  const handleEmailOption = (service) => {
    const email = "lifelineisthebest4@gmail.com";
    const subject = "Support Request";
    const url = `mailto:${email}?subject=${subject}`;
    Linking.openURL(url);
    setEmailModalVisible(false);
  };
  // const downloadPDF = async () => {
  //   try {
  //     const url = await storage()
  //       .ref("manuals/LIFELINE_USER_MANUAL.pdf")
  //       .getDownloadURL();
  //     const localFilePath = `${FileSystem.documentDirectory}LIFELINE_USER_MANUAL.pdf`;
  //     const download = await FileSystem.downloadAsync(url, localFilePath);
  //     return download.uri;
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // };
  // Expo File System from Indian
  // const [mediaData, setMediaData] = useState([]);
  // useEffect(() => {
  //   async function getMediaData() {
  //     const mediaRefs = [storage().ref("manuals/LIFELINE_USER_MANUAL.pdf")];
  //     const mediaInfo = await Promise.all(
  //       mediaRefs.map(async (ref) => {
  //         const url = await ref.getDownloadURL();
  //         const metadata = await ref.getMetadata();
  //         return { url, metadata };
  //       })
  //     );
  //     setMediaData(mediaInfo);
  //   }
  //   getMediaData();
  // }, []);
  // async function downloadFile(url: string, filename: string) {
  //   try {
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status !== "granted") {
  //       Alert.alert(
  //         "Permission Needed",
  //         "This app needs access to your Media library"
  //       );
  //       return;
  //     }
  //     const fileUri = FileSystem.cacheDirectory + filename;
  //     console.log("Starting download!");
  //     const downloadResumable = FileSystem.createDownloadResumable(
  //       url,
  //       fileUri,
  //       {},
  //       undefined
  //     );
  //     const { uri } = await downloadResumable.downloadAsync(null, {
  //       shouldCache: false,
  //     });
  //     console.log("Download completed: ", uri);

  //     const asset = await MediaLibrary.createAssetAsync(uri);
  //     console.log("Asset created: ", asset);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  const downloadFromUrl = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, "manuals/LIFELINE_USER_MANUAL.pdf");

    try {
      const url = await getDownloadURL(storageRef); // Retrieve HTTPS URL from Firebase
      const filename = "LIFELINE_USER_MANUAL.pdf";
      const result = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + filename
      );

      console.log("Download result:", result);
      save(
        result.uri,
        filename,
        result.headers["Content-Type"] || "application/pdf"
      );
    } catch (error) {
      console.error("Error downloading file from Firebase:", error);
    }
  };
  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        try {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const fileUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              filename,
              mimetype
            );

          await FileSystem.writeAsStringAsync(fileUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });

          console.log("File saved to:", fileUri);
        } catch (error) {
          console.error("Error saving file on Android:", error);
        }
      } else {
        console.log("Permissions denied. Sharing file...");
        shareAsync(uri);
      }
    } else {
      console.log("Sharing file on iOS...");
      shareAsync(uri);
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <MaterialIcons name="support-agent" size={48} color="#FF4444" />
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.subtitle}>How can we help you today?</Text>
      </View>
      {/* Support Options */}
      <View style={styles.supportOptions}>
        <TouchableOpacity
          style={styles.supportButton}
          onPress={downloadFromUrl}
        >
          <Ionicons name="book" size={30} color="#FFFFFF" />
          <Text style={styles.buttonText}>Download User Manual</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emailButton} onPress={handleEmailUs}>
          <Ionicons name="mail" size={30} color="#FF4444" />
          <Text style={styles.emailButtonText}>Email Us</Text>
        </TouchableOpacity>
      </View>
      {/* Modals */}
      <SingleBtnModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        title="Under Development"
        description="This feature is currently under development. Please check back later."
        btnLabel="Close"
        onPress={() => setModalVisible(false)}
      />
      <CustomModal
        visible={emailModalVisible}
        onRequestClose={() => setEmailModalVisible(false)}
        title="Choose Email Service"
        description="Which email service would you like to use?"
        btnLabel1="Gmail"
        btnLabel2="Outlook"
        onPressBtn1={() => handleEmailOption("Gmail")}
        onPressBtn2={() => handleEmailOption("Outlook")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#FFF5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginTop: 8,
  },
  supportOptions: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginBottom: 10, // Adjust margin to prevent overlap
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginTop: 10, // Adjust margin to prevent overlap
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF4444",
  },
  emailButtonText: {
    color: "#FF4444",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
    marginTop: 32,
    paddingHorizontal: 20,
  },
  // Remove FAQ styles
  // faqSection: {
  //   marginBottom: 40,
  // },
  // faqItem: {
  //   backgroundColor: "#FFFFFF",
  //   paddingHorizontal: 20,
  //   paddingVertical: 16,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#EEEEEE",
  // },
  // faqQuestion: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 8,
  // },
  // faqQuestionText: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: "#333333",
  //   marginLeft: 12,
  //   flex: 1,
  // },
  // faqAnswerText: {
  //   fontSize: 14,
  //   color: "#666666",
  //   marginLeft: 36,
  // },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#FF4444",
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
