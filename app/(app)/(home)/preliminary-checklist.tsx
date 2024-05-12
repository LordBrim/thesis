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
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../constants";

export default function PreliminaryChecklistScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Preliminary Checklist</Text>
        <Text style={styles.subtitle}>
          Please answer the questions as truthfully as possible.
        </Text>
        <View style={styles.bar}>
          <Text>Questions</Text>
          <Text>Yes / No</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.flatlist}
          data={checklistQuestions}
          renderItem={({ item }) => <ChecklistItem question={item.question} />}
          keyExtractor={(item) => item.id}
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
  },
  flatlist: {
    rowGap: 8,
  },
  title: {},
  subtitle: {},
  bar: {},
});

const checklistQuestions = [
  {
    id: 1,
    question: "What is this?",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut purus risus. Duis vel lobortis libero. Aenean a sollicitudin lorem, sed dapibus felis.",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut purus risus. Duis vel lobortis libero. Aenean a sollicitudin lorem, sed dapibus felis. Donec eros libero, convallis et arcu ut, vehicula egestas tortor. Donec dictum lorem in eleifend aliquam.",
  },
];
