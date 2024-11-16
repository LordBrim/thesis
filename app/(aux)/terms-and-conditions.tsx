import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { COLORS, SIZES } from "constants/theme";
export default function TermsAndConditionsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.paragraph}>
          Welcome to Lifeline! By accessing or using the application, you agree
          to be bound by the following terms and conditions. Please read them
          carefully before proceeding. If you do not agree with these terms and
          conditions, please refrain from using the application.
        </Text>
        <Text style={styles.heading}>1. Intended Purpose</Text>
        <Text style={styles.paragraph}>
          Lifeline is intended solely for educational purposes as part of the
          thesis requirements for the Bachelor of Science in Computer Science
          degree. Any use beyond this context is not permitted.
        </Text>
        <Text style={styles.heading}>2. User Registration</Text>
        <Text style={styles.paragraph}>
          Access to the application is reserved for registered users only. You
          must not share your login credentials with others or access any
          accounts other than your own. Unauthorized activity may result in the
          termination of your account.
        </Text>
        <Text style={styles.heading}>3. User Responsibility</Text>
        <Text style={styles.paragraph}>
          You agree to use Lifeline responsibly and not engage in activities
          that may damage, disable, or impair its functionality or security.
        </Text>
        <Text style={styles.heading}>4. Third-Party Access</Text>
        <Text style={styles.paragraph}>
          Lifeline may be integrated with, or may otherwise interact with,
          third-party websites and services, including but not limited to Google
          and Facebook. By using these services, you consent to the additional
          terms and conditions set by the applicable third parties and
          acknowledge that Lifeline does not maintain or control these services
          and is not responsible for their content or practices.
        </Text>
        <Text style={styles.heading}>5. Security Measures</Text>
        <Text style={styles.paragraph}>
          While we implement security measures to protect your data and
          information, we cannot guarantee absolute security. By using Lifeline,
          you acknowledge the inherent risks associated with transferring
          information over the internet and agree to do so at your own risk.
        </Text>
        <Text style={styles.heading}>6. Termination of Access</Text>
        <Text style={styles.paragraph}>
          Lifeline reserves the right to terminate, suspend, or restrict your
          access at any time and for any reason without prior notice. We may
          also update, modify, or discontinue any aspect of the application
          without liability.
        </Text>
        <Text style={styles.heading}>7. Changes to Terms and Conditions</Text>
        <Text style={styles.paragraph}>
          We may update the terms and conditions from time to time. Any changes
          will be effective immediately upon notification to all users. By
          continuing to use Lifeline after modifications, you agree to the
          revised terms.
        </Text>
        <Text style={styles.heading}>8. Governing Law</Text>
        <Text style={styles.paragraph}>
          These terms shall be governed by and construed in accordance with the
          laws of the Philippines.
        </Text>
        <Text style={styles.paragraph}>
          If you have any questions or concerns regarding these terms, please
          contact us at sanchez.210927@stamesa.sti.edu.ph or
          cruz.191253@stamesa.sti.edu.ph.
        </Text>
        <Text style={styles.paragraph}>Thank you for using Lifeline!</Text>
        <Text style={[styles.paragraph, { fontStyle: "italic" }]}>
          Reference: ACEMC Mandaluyong Terms And Conditions. (n.d.). Terms and
          Conditions. Retrieved from{" "}
          <Text
            style={{ color: COLORS.primary, textDecorationLine: "underline" }}
          >
            https://www.acemandaluyong.com.ph/ace-termsAndConditions
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "justify",
  },
});
