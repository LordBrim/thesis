import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { COLORS } from "../../../../constants";

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/images/op_logo_text.png")} // Update the path to your logo image
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>ABOUT US</Text>
        <Text style={styles.text}>
          Lifeline is an Android-based blood donation and request platform with
          GPS route optimization. Developed by fourth-year Computer Science
          students at STI College Sta. Mesa, Lifeline aims to optimize
          interactions between donors, patients, and hospitals.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Developers</Text>
        <Text style={styles.text}>MUNAR, MANOLITO ANGELO S.</Text>
        <Text style={styles.text}>SAGER, ANDREI JOHN S.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>UI DESIGN & DOCUMENTATION</Text>
        <Text style={styles.text}>CRUZ, JAM CHARMAINE A.</Text>
        <Text style={styles.text}>SANCHEZ, NICOLE M.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>LIFELINE’S BENEFITS</Text>
        <Text style={styles.text}>
          • Save lives by facilitating timely blood donations.
        </Text>
        <Text style={styles.text}>
          • Improve patient outcomes through efficient blood request feature.
        </Text>
        <Text style={styles.text}>
          • Enhance the overall blood donation experience for donors and
          recipients.
        </Text>
        <Text style={styles.text}>
          • Support hospitals and medical institutions in managing blood
          supplies.
        </Text>
        <Text style={styles.text}>• Promote community engagement.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>PARTNERED HOSPITALS</Text>
        <Text style={styles.text}>
          We would like to express our heartfelt gratitude to the following
          hospitals for their partnerships:
        </Text>
        <Text style={styles.text}>
          • University of the East Ramon Magsaysay Memorial Center Quezon City
        </Text>
        <Text style={styles.text}>• Ace Medical Center Mandaluyong</Text>
        <Text style={styles.text}>• Quirino Medical Center</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>FEEDBACK</Text>
        <Text style={styles.text}>
          For further inquiries or any constructive feedback regarding our
          application, please do not hesitate to contact us via email at
        </Text>
        <Text
          style={{
            textDecorationLine: "underline",
            textDecorationColor: COLORS.primary,
            color: COLORS.primary,
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          lifelineisthebest4@gmail.com.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.primary,
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 100,
  },
});
