import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import {
  HORIZONTAL_SCREEN_MARGIN,
  COLORS,
  SIZES,
  GS,
} from "../../../../constants";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebase-config"; // Adjust the path as needed
import { Card, Button, Icon, ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function EventDetailsScreen() {
  const {
    title,
    description,
    date,
    address,
    time,
    documentId,
    latitude,
    longitude,
  } = useLocalSearchParams();
  const [imageUri, setImageUri] = useState("");
  console.log(
    title,
    description,
    date,
    address,
    time,
    documentId,
    latitude,
    longitude
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
    router.push({
      pathname: "/(app)/(maps)/hospitalMapView",
      params: {
        event: JSON.stringify({
          latitude: latitude,
          longitude: longitude,
          title: title,
          description: description,
          startDate: date,
          startTime: time,
          address: address,
          mapCSS: JSON.stringify(mapCSS),
        }),
      },
    });
  };

  const donorsCount = 120;
  const donorsGoal = 200;
  const progress = donorsCount / donorsGoal;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card>
          {imageUri ? (
            <Card.Cover source={{ uri: imageUri }} />
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
  placeholder: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
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
    fontWeight: "bold",
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
    borderColor: COLORS.gray2,
  },
  buttonHospitalPressed: {
    width: "85%",
    padding: SIZES.medium,
    marginVertical: SIZES.medium,
    backgroundColor: "white",
    borderWidth: 2,
    elevation: 5,
    borderRadius: 10,
    borderColor: COLORS.gray,
  },
  textHospital: {
    fontSize: SIZES.large,
    textAlign: "left",
    color: COLORS.black,
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
    backgroundColor: COLORS.red,
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
    fontWeight: "bold",
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
    borderColor: COLORS.gray,
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
    fontWeight: "bold",
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
    fontWeight: "600",
  },
  icon: {
    width: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
