import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import StepsIndicator from "components/common/StepsIndicator";
import Title from "components/common/texts/Title";
import Description from "components/common/texts/Description";
import ChecklistItem from "./ChecklistItem";
import CallToActionBtn from "components/common/CallToActionBtn";
import { router } from "expo-router";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES } from "../../constants";
import { DonationScreens, checklistQuestions } from "constants/database";

export default function PreliminaryChecklist() {
  const cancel = () => {
    router.replace("(app)/(tabs)/index");
  };

  return (
    <SafeAreaView style={styles.container}>
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
    position: "relative",
    bottom: 0,
    flexDirection: "row",
    gap: 8,
  },
});
