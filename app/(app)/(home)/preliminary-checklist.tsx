import {
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import React from "react";
import ChecklistItem from "components/home/ChecklistItem";
import { COLORS, HORIZONTAL_SCREEN_MARGIN, SIZES } from "../../../constants";
import CallToActionBtn from "components/common/CallToActionBtn";
import { router } from "expo-router";
import Title from "components/common/texts/Title";
import Description from "components/common/texts/Description";
import StepsIndicator from "components/common/StepsIndicator";
import { DonationScreens } from "constants/database";

export default function PreliminaryChecklistScreen() {
  const cancel = () => {
    router.replace("(app)/(tabs)/index");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StepsIndicator labels={DonationScreens} step={0} />
      <View>
        <Title title="Preliminary Checklist" />
        <Description description="Please answer the questions truthfully as you can possibly can." />
      </View>
      <View style={styles.bar}>
        <Text style={styles.header}>Questions</Text>
        <Text style={[styles.header, { paddingHorizontal: 8 }]}>Yes / No</Text>
      </View>
      <ScrollView
        contentContainerStyle={{ gap: 8 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={checklistQuestions}
          renderItem={({ item }) => <ChecklistItem question={item.question} />}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </ScrollView>

      <View style={styles.fixed}>
        <CallToActionBtn
          label="cancel"
          onPress={() => cancel}
          style={{ flex: 1 }}
          secondary
        />
        <CallToActionBtn
          label="next"
          onPress={() => router.push("(app)/(home)/schedule-appointment")}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
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
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontWeight: "600",
  },
  fixed: {
    flexDirection: "row",
    gap: 8,
  },
});

const checklistQuestions = [
  {
    id: 1,
    question: "What is this?",
  },
  {
    id: 2,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut purus risus. Duis vel lobortis libero. Aenean a sollicitudin lorem, sed dapibus felis.",
  },
  {
    id: 3,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut purus risus. Duis vel lobortis libero. Aenean a sollicitudin lorem, sed dapibus felis. Donec eros libero, convallis et arcu ut, vehicula egestas tortor. Donec dictum lorem in eleifend aliquam.",
  },
  {
    id: 4,
    question: "What is this?",
  },
  {
    id: 5,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut purus risus. Duis vel lobortis libero. Aenean a sollicitudin lorem, sed dapibus felis.",
  },
  {
    id: 6,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut purus risus. Duis vel lobortis libero. Aenean a sollicitudin lorem, sed dapibus felis. Donec eros libero, convallis et arcu ut, vehicula egestas tortor. Donec dictum lorem in eleifend aliquam.",
  },
];
