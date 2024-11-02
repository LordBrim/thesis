import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

export default function TermsAndConditionsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.paragraph}>
          Effective Date: [November 11, 2024]
        </Text>
        <Text style={styles.paragraph}>
          Welcome to Lifeline! By accessing or using our application, you agree
          to abide by the following Terms and Conditions. These terms govern
          your use of our application, including registration, scheduling
          appointments, and requesting blood units.
        </Text>
        <Text style={styles.paragraph}>
          1. <Text style={styles.bold}>User Registration</Text>
        </Text>
        <Text style={styles.paragraph}>
          1.1. <Text style={styles.bold}>Account Creation:</Text> Users must
          register an account to access our application. During registration,
          users must provide their full name, email, and password. Once
          registration is complete, users are redirected to their account
          settings to update their City, Age, Sex, and contact details.
        </Text>
        <Text style={styles.paragraph}>
          1.2. <Text style={styles.bold}>User Responsibility:</Text> Users agree
          to provide accurate and complete information during registration and
          account setup. Maintaining up-to-date information is the
          responsibility of the user.
        </Text>
        <Text style={styles.paragraph}>
          1.3. <Text style={styles.bold}>Privacy:</Text> We value user privacy
          and are committed to protecting personal data. For more information on
          how we collect and use personal information, please refer to our
          Privacy Policy.
        </Text>
        <Text style={styles.paragraph}>
          2.{" "}
          <Text style={styles.bold}>
            Scheduling Appointments for Blood Donation
          </Text>
        </Text>
        <Text style={styles.paragraph}>
          2.1. <Text style={styles.bold}>Eligibility Check:</Text> Users may
          schedule blood donation appointments through our application. To
          confirm eligibility, users must complete a preliminary health
          checklist. This checklist will be reviewed by an administrator of our
          affiliated hospital to ensure suitability for blood donation.
        </Text>
        <Text style={styles.paragraph}>
          2.2. <Text style={styles.bold}>Pending Status:</Text> Once users
          submit the appointment request, it will be marked as “Pending” until
          the affiliated hospital admin confirms the appointment date and time.
        </Text>
        <Text style={styles.paragraph}>
          2.3. <Text style={styles.bold}>Commitment to Appointment:</Text> By
          scheduling an appointment, users agree to attend as scheduled unless
          canceled with prior notice.
        </Text>
        <Text style={styles.paragraph}>
          3. <Text style={styles.bold}>Blood Unit Requests</Text>
        </Text>
        <Text style={styles.paragraph}>
          3.1. <Text style={styles.bold}>Request Form:</Text> Users can request
          blood units through the application for any affiliated hospital. The
          request form requires the following details:
        </Text>
        <Text style={styles.paragraph}>- Patient Name</Text>
        <Text style={styles.paragraph}>- Blood Type</Text>
        <Text style={styles.paragraph}>
          - Blood Unit Type (e.g., Whole Blood, Platelets, WBC)
        </Text>
        <Text style={styles.paragraph}>
          - Additional Information and Relationship to Patient
        </Text>
        <Text style={styles.paragraph}>
          - Emergency Status (Emergency or Non-Emergency)
        </Text>
        <Text style={styles.paragraph}>- Contact Details</Text>
        <Text style={styles.paragraph}>
          - Health Form: A photo of the hospital-issued health form signed by a
          doctor, verifying the necessity for blood.
        </Text>
        <Text style={styles.paragraph}>
          3.2. <Text style={styles.bold}>Guidelines Compliance:</Text> Users are
          required to read and comply with the general blood request guidelines
          posted by affiliated hospitals. Failure to comply with these
          guidelines may result in rejection of the blood request.
        </Text>
        <Text style={styles.paragraph}>
          3.3. <Text style={styles.bold}>Request Review:</Text> All blood
          requests will be reviewed by the affiliated hospital admin. Users will
          be informed of the status of their request once the review is
          complete.
        </Text>
        <Text style={styles.paragraph}>
          4. <Text style={styles.bold}>General User Conduct</Text>
        </Text>
        <Text style={styles.paragraph}>
          4.1. <Text style={styles.bold}>Accurate Information:</Text> Users are
          responsible for providing accurate information. False or misleading
          information may result in termination of the account.
        </Text>
        <Text style={styles.paragraph}>
          4.2. <Text style={styles.bold}>Respectful Usage:</Text> Users agree to
          interact with the application respectfully and ethically. Any misuse,
          including inappropriate language or unauthorized use of data, may lead
          to suspension or termination of access.
        </Text>
        <Text style={styles.paragraph}>
          5. <Text style={styles.bold}>Data Privacy and Security</Text>
        </Text>
        <Text style={styles.paragraph}>
          5.1. <Text style={styles.bold}>Data Usage:</Text> We take the security
          of user information seriously and use data only as necessary to
          provide and improve the application’s services.
        </Text>
        <Text style={styles.paragraph}>
          5.2. <Text style={styles.bold}>Third-Party Affiliates:</Text> By using
          our service, users consent to sharing relevant information with
          affiliated hospitals strictly for the purposes of managing blood
          donation and blood requests.
        </Text>
        <Text style={styles.paragraph}>
          6. <Text style={styles.bold}>Modification of Terms</Text>
        </Text>
        <Text style={styles.paragraph}>
          We may update or modify these Terms and Conditions at any time. Users
          will be notified of any significant changes, and continued use of the
          application constitutes acceptance of the new terms.
        </Text>
        <Text style={styles.paragraph}>
          7. <Text style={styles.bold}>Limitation of Liability</Text>
        </Text>
        <Text style={styles.paragraph}>
          The Blood Bank Management System and its affiliates are not
          responsible for any damages resulting from the use or inability to use
          the service, including but not limited to inaccuracies in the
          availability of blood units or scheduling errors.
        </Text>
        <Text style={styles.paragraph}>
          By registering an account and using this application, you acknowledge
          and agree to these Terms and Conditions. If you have any questions,
          please contact us at [lifelineisthebest4@gmail.com].
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  bold: {
    fontWeight: "bold",
  },
});
