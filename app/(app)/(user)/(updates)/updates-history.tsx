import { View, StyleSheet, Text, Image } from "react-native";
import React from "react";
import {
  SIZES,
  COLORS,
  HORIZONTAL_SCREEN_MARGIN,
  SPACES,
} from "../../../../constants";
import { FlatList } from "react-native";
// import AppointmentCard from "components/home/AppointmentCard";

export default function UpdatesHistory() {
  return (
    <View style={styles.container}>
      <View style={{ gap: 8, flex: 1, width: "100%" }}>
        {/* <AppointmentCard
          location="Request Accepted"
          date="Sept 18, 2024"
          time="1:01pm"
        />
        <AppointmentCard
          location="Request Accepted"
          date="Sept 18, 2024"
          time="1:01pm"
        /> */}
        <FlatList
          data={sampleData}
          renderItem={({ item }) => (
            <View style={styles.cContainer}>
              <Image
                source={require("../../../../assets/images/bloodbag.png")}
                style={styles.image}
              />
              <View style={styles.text}>
                <Text style={styles.location}>
                  {item.location || "Medical Institution"}
                </Text>
                <Text style={styles.date}>
                  {item.date || "February 14, 2024"}
                </Text>
              </View>
              <View style={styles.line} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: SIZES.medium,
    alignItems: "center",
    backgroundColor: COLORS.background,
    gap: HORIZONTAL_SCREEN_MARGIN,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: "Poppins_700Bold",
  },
  flatlist: {
    flex: 1,
    width: "100%",
    gap: SPACES.sm,
    padding: 2,
  },
  cContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 32,
    paddingVertical: SPACES.md,
    borderRadius: SIZES.small,
    elevation: 3,
    shadowColor: "#52006A",
    gap: SPACES.md,
    backgroundColor: COLORS.background,
    maxHeight: 70,
    minHeight: 70,
  },
  image: { height: 45, width: 25 },
  text: {
    flex: 1,
    justifyContent: "center",
  },
  location: {
    fontSize: SIZES.medium,
    fontFamily: "Poppins_700Bold",
  },
  date: {
    fontSize: SIZES.small,
  },
  line: {
    width: 2,
    height: "100%",
    position: "absolute",
    backgroundColor: COLORS.line,
    left: 43.3,
    bottom: 0,
  },
});

const sampleData = [
  {
    id: 1,
    location: "Location 1",
    date: "February 15, 2024",
  },
  {
    id: 2,
    location: "Location 2",
    date: "February 16, 2024",
  },
  {
    id: 3,
    location: "Location 3",
    date: "February 17, 2024",
  },
  {
    id: 4,
    location: "Location 4",
    date: "February 15, 2024",
  },
  {
    id: 5,
    location: "",
    date: "",
  },
];
