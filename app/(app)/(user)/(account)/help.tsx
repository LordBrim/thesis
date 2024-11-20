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
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import SingleBtnModal from "components/common/modals/SingleBtnModal";

const FAQItem = ({ question, answer }) => (
  <View style={styles.faqItem}>
    <View style={styles.faqQuestion}>
      <MaterialIcons name="help-outline" size={24} color="#FF4444" />
      <Text style={styles.faqQuestionText}>{question}</Text>
    </View>
    <Text style={styles.faqAnswerText}>{answer}</Text>
  </View>
);

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

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "Go to the login screen and tap 'Forgot Password'. Follow the instructions sent to your email.",
    },
    {
      question: "How do I update my profile?",
      answer:
        "Navigate to Settings > Profile and tap the edit button to make changes to your information.",
    },
  ];

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
          onPress={handleContactSupport}
        >
          <Ionicons name="chatbubble-ellipses" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Contact Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emailButton} onPress={handleEmailUs}>
          <Ionicons name="mail" size={24} color="#FF4444" />
          <Text style={styles.emailButtonText}>Email Us</Text>
        </TouchableOpacity>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqSection}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </View>

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
    flexDirection: "row",
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
    marginRight: 10,
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
    marginLeft: 10,
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
  faqSection: {
    marginBottom: 40,
  },
  faqItem: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  faqQuestion: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginLeft: 12,
    flex: 1,
  },
  faqAnswerText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 36,
  },
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
