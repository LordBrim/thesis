import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "constants/theme";
import TextInputWrapper from "components/common/TextInputWrapper";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { createQuestion } from "rtx/slices/faq";
import IconBtn from "components/common/IconButton";
import { useNavigation } from "expo-router";

export default function ManageFaqCreate() {
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            padding: 12,
            borderRadius: 10,
            width: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleCreate = () => {
    dispatch(
      createQuestion({
        title: "Andrei Sager Gumagana",
        question: { question: editedQuestion, answer: editedAnswer },
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollview}
        overScrollMode="never"
        persistentScrollbar={true}
      >
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollview: {
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: 16,
  },
});
