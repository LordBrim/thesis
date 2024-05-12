import {
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import ChecklistItem from "components/home/ChecklistItem";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../constants";

export default function PreliminaryChecklistScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Preliminary Checklist</Text>
        <Text>Please answer the questions as truthfully as possible.</Text>

        <FlatList
          data={checklistQuestions}
          renderItem={({ item }) => <ChecklistItem />}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false} // Disable scrolling for FlatList
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
  },
});

const checklistQuestions = [
  {
    id: 1,
    question: "What is this?",
  },
];
