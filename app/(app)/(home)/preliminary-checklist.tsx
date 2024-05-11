import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import React from "react";
import ChecklistItem from "components/home/ChecklistItem";

export default function PreliminaryChecklistScreen() {
  return (
    <SafeAreaView>
      <Text>Preliminary Checklist</Text>
      <Text>Please answer the questions as truthfully as possible.</Text>

      <FlatList
        data={checklistQuestions}
        renderItem={({ item }) => <ChecklistItem />}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false} // Disable scrolling for FlatList
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

const checklistQuestions = [
  {
    id: 1,
    question: "What is this?",
  },
];
