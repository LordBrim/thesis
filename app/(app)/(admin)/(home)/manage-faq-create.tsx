import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { COLORS } from "constants/theme";
import TextInputWrapper from "components/common/TextInputWrapper";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import { useDispatch } from "react-redux";
import { createQuestion } from "rtx/slices/faq";

export const saveChanges = () => {};

export default function ManageFaqCreate() {
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");

  const dispatch = useDispatch();
  // dispatch(
  //   createQuestion({
  //     title: editedQuestion,
  //     question: { editedQuestion, editedAnswer },
  //   })
  // );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Hello</Text>
      <TextInputWrapper label="Question">
        <TextInput
          value={editedQuestion}
          placeholder="Enter a question..."
          onChangeText={(question) => setEditedQuestion(question)}
          autoCapitalize="none"
          autoCorrect={true}
          enablesReturnKeyAutomatically
          multiline={true}
          style={{
            flex: 1,
            padding: 12,
          }}
        />
      </TextInputWrapper>
      <TextInputWrapper label="Answer">
        <TextInput
          value={editedAnswer}
          placeholder="Enter an answer..."
          onChangeText={(answer) => setEditedAnswer(answer)}
          autoCapitalize="none"
          autoCorrect={true}
          enablesReturnKeyAutomatically
          multiline={true}
          style={{
            flex: 1,
            padding: 12,
          }}
        />
      </TextInputWrapper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: 16,
  },
});
