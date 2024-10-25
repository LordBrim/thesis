import { StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { COLORS } from "constants/theme";
import TextInputWrapper from "components/common/TextInputWrapper";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import { useLocalSearchParams } from "expo-router";

export const saveChanges = () => {};

export default function ManageFaqUpdate() {
  const { question, answer } = useLocalSearchParams();
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
