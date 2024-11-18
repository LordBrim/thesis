import React, { useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../../rtx/slices/user"; // Adjust the path to your user slice
import Description from "components/common/texts/Description";
import ChecklistItem from "./ChecklistItem";
import { HORIZONTAL_SCREEN_MARGIN, COLORS, SIZES, GS } from "../../constants";
import { checklistQuestions } from "../../constants/database"; // Adjust the path to your database.js file

const HeaderComponent = () => (
  <View style={{ backgroundColor: COLORS.background }}>
    <Text style={GS.h1}>Preliminary Checklist</Text>
  </View>
);

export default function PreliminaryChecklist({
  answers,
  handleAnswerChange,
  allQuestionsAnswered,
}) {
  const user = useSelector(selectUser);

  const filteredQuestions = checklistQuestions.filter(
    (question) => !question.applicableTo || question.applicableTo === user.sex
  );

  const handleAnswerChangeWrapper = (questionId, answer) => {
    const questionText = checklistQuestions.find(
      (q) => q.id === questionId
    ).question;
    handleAnswerChange(questionText, answer);
  };

  useEffect(() => {
    const allAnswered = filteredQuestions.every(
      (question) =>
        answers[question.question] !== undefined &&
        answers[question.question] !== ""
    );
    allQuestionsAnswered(allAnswered);
  }, [answers]);

  const renderItem = ({ item, index }) => (
    <ChecklistItem
      question={item}
      onAnswerChange={handleAnswerChangeWrapper}
      index={index}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[{ key: "description" }, ...filteredQuestions]}
        renderItem={({ item, index }) => {
          if (item.key === "description") {
            return (
              <Description description="Please answer all questions as truthfully as possible." />
            );
          }
          return renderItem({ item, index: index - 1 });
        }}
        keyExtractor={(item, index) => item.key || item.id.toString()}
        ListHeaderComponent={HeaderComponent}
        stickyHeaderIndices={[0]} // Add this line to make the header sticky
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
    gap: 5,
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
    fontFamily: "Poppins_600SemiBold",
  },
});
