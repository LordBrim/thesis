import {
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "constants/theme";
import TextInputWrapper from "components/common/TextInputWrapper";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import { updateFAQInFirebase, updateQuestion } from "rtx/slices/faq";

export default function ManageFaqUpdate() {
  const { title, question, answer } = useLocalSearchParams();
  const [oldTitle, setOldTitle] = useState(title);
  const [oldQuestion, setOldQuestion] = useState(question);
  const [oldAnswer, setOldAnswer] = useState(answer);
  const [updatedQuestion, setUpdatedQuestion] = useState(question);
  const [updatedAnswer, setUpdatedAnswer] = useState(answer);
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
          onPress={handleUpdate}
        >
          <Text style={{ fontFamily: "Poppins_700Bold" }}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, updatedQuestion, updatedAnswer]);

  const handleUpdate = () => {
    dispatch(
      updateQuestion({
        title: oldTitle,
        oldQuestion: {
          question: oldQuestion,
          answer: oldAnswer,
        },
        updatedQuestion: {
          question: updatedQuestion,
          answer: updatedAnswer,
        },
      })
    );
    updateFAQInFirebase(
      oldTitle,
      {
        question: oldQuestion,
        answer: oldAnswer,
      },
      { question: updatedQuestion, answer: updatedAnswer }
    );
    router.back();
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
            value={updatedQuestion}
            placeholder="Enter a question..."
            onChangeText={(question) => setUpdatedQuestion(question)}
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            multiline={true}
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingTop: 16,
              paddingBottom: 8,
              fontFamily: "Poppins_400Regular",
            }}
          />
        </TextInputWrapper>
        <TextInputWrapper label="Answer">
          <TextInput
            value={updatedAnswer}
            placeholder="Enter an answer..."
            onChangeText={(answer) => setUpdatedAnswer(answer)}
            autoCapitalize="none"
            autoCorrect={true}
            enablesReturnKeyAutomatically
            multiline={true}
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingTop: 16,
              paddingBottom: 8,
              fontFamily: "Poppins_400Regular",
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
