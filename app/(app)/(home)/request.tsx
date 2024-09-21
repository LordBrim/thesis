import {
  COLORS,
  HORIZONTAL_SCREEN_MARGIN,
  SIZES,
  SPACES,
} from "../../../constants";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Carousel from "pinar";
import CallToActionBtn from "components/common/CallToActionBtn";
import { router } from "expo-router";
import { useState } from "react";
import StepsIndicator from "components/common/StepsIndicator";
import RequestBloodunitScreen from "./request-bloodunit";

export default function Request() {
  const stepCount = 2;
  let [screenIndex, setScreenIndex] = useState(0);

  const prev = () => {
    if (screenIndex > 0) {
      this.carousel.scrollToPrev();
      setScreenIndex(--screenIndex);
    }
  };

  const next = () => {
    if (screenIndex < stepCount - 1) {
      this.carousel.scrollToNext();
      setScreenIndex(++screenIndex);
    }
  };

  const submit = () => {
    //TODO: Place reference like donate screen
  };

  const Screens = ["Request\nGuidelines", "Schedule\nAppointment"];

  return (
    <View style={{ flex: 1 }}>
      <StepsIndicator labels={Screens} step={screenIndex} steps={stepCount} />

      <Carousel
        ref={(carousel) => {
          this.carousel = carousel;
        }}
        showsControls={false}
        showsDots={false}
        scrollEnabled={false}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ gap: 16 }}
        >
          <Text style={styles.title}>Guidelines For Requesting Blood</Text>

          <FlatList
            data={sampleGuidelines}
            renderItem={({ item }) => (
              <View style={{ gap: 4 }}>
                <Text style={styles.header}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatlist}
          />
        </ScrollView>
        <RequestBloodunitScreen />
      </Carousel>

      <View style={styles.fixed}>
        <CallToActionBtn
          label="previous"
          onPress={() => prev()}
          style={{ flex: 1 }}
          secondary
        />
        <CallToActionBtn
          label={screenIndex === stepCount - 1 ? "submit" : "next"}
          onPress={
            screenIndex === stepCount - 1 ? () => submit() : () => next()
          }
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
    gap: 12,
  },
  flatlist: {
    rowGap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  header: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    height: 90,
    gap: SPACES.sm,
  },
  fixed: {
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    flexDirection: "row",
    gap: 8,
  },
});

const sampleGuidelines = [
  {
    id: 1,
    title: "Guideline #1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae,  finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae, finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. ",
  },
  {
    id: 2,
    title: "Guideline #2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae,  finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae, finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. ",
  },
  {
    id: 3,
    title: "Guideline #3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae,  finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae, finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. ",
  },
  {
    id: 4,
    title: "Guideline #4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae,  finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum justo, consectetur in vehicula vitae, finibus posuere ex. Sed eu tempus ligula. Aenean et tincidunt nunc. ",
  },
];
