import React, { useEffect, useState } from "react";
import Title from "../../../components/common/texts/Title";
import Description from "../../../components/common/texts/Description";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CallToActionBtn from "../../../components/common/CallToActionBtn";
import { useLocalSearchParams, router } from "expo-router";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES } from "../../../constants";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebase-config"; // Adjust the path as needed
import { Card, Button, Icon, ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function EventDetailsScreen() {
  const { title, description, date, address, time, documentId } =
    useLocalSearchParams();
  const [imageUri, setImageUri] = useState("");

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
    router.replace("/(app)/(tabs)/maps-tab");
  };

  console.log("imageURI", imageUri);

  const donorsCount = 120;
  const donorsGoal = 200;
  const progress = donorsCount / donorsGoal;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Cover source={{ uri: imageUri }} />
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

            <View style={styles.progressContainer}>
              <Text style={styles.progressTitle}>Donor Goal Progress</Text>
              <ProgressBar
                progress={progress}
                color="#e74c3c"
                style={styles.progressBar}
              />
              <Text style={styles.progressText}>
                {donorsCount} / {donorsGoal} Donors
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="water"
                  size={24}
                  color="#3498db"
                />
                <Text style={styles.infoText}>
                  Blood Types Needed: A+, O-, B+
                </Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="clock-time-four"
                  size={24}
                  color="#2ecc71"
                />
                <Text style={styles.infoText}>
                  Estimated Time: 30-45 minutes
                </Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="food-apple"
                  size={24}
                  color="#e67e22"
                />
                <Text style={styles.infoText}>Refreshments Provided</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={navigateToMaps} icon="map-marker">
          Navigate to Location
        </Button>
        <Button
          mode="outlined"
          onPress={() => {}}
          icon="calendar-check"
          style={styles.secondaryButton}
        >
          Register Now
        </Button>
      </View>
    </View>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: COLORS.white,
//   },
//   cTop: {
//     paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
//     paddingVertical: 24,
//     gap: 12,
//   },
//   cBottom: {
//     width: "100%",
//     paddingVertical: 8,
//     paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
//     borderWidth: 1,
//     borderColor: COLORS.gray2,
//     backgroundColor: "white",
//   },
//   banner: {
//     flex: 1,
//     minWidth: "100%",
//     aspectRatio: 16 / 7,
//     backgroundColor: COLORS.primary,
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//   },
//   address: {
//     fontSize: SIZES.medium,
//     fontWeight: "bold", // Make the address bold
//   },
//   date: {
//     fontSize: SIZES.medium,
//     fontWeight: "bold", // Make the date bold
//   },
//   time: {
//     fontSize: SIZES.medium,
//     fontWeight: "bold", // Make the time bold
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
    marginVertical: 10,
    lineHeight: 20,
  },
  progressContainer: {
    marginVertical: 15,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "bold",
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
  },
});
