import React from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import Description from "components/common/texts/Description";
import ChecklistItem from "./ChecklistItem";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES, GS } from "../../constants";
import { checklistQuestions } from "../../constants/database"; // Adjust the path to your database.js file

const HeaderComponent = () => (
  <>
    <View>
      <Text style={GS.h1}>Preliminary Checklist</Text>
      <Description description="Please answer all questions as truthfully as possible." />
    </View>
    <View style={styles.bar}>
      <Text style={styles.header}>Questions</Text>
    </View>
  </>
);

export default function PreliminaryChecklist({ answers, handleAnswerChange }) {
  const renderItem = ({ item, index }) => (
    <ChecklistItem
      question={item}
      onAnswerChange={handleAnswerChange}
      index={index}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={checklistQuestions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={true}
        overScrollMode="never"
        removeClippedSubviews={false} // This can help with rendering issues
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.background,
  },
  flatListContent: {
    flexGrow: 1,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    gap: 12,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  header: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontWeight: "600",
  },
});
