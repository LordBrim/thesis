import {
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import { COLORS } from "constants/theme";
import { HORIZONTAL_SCREEN_MARGIN } from "constants/measurements";
import TextInputWrapper from "components/common/TextInputWrapper";
import { useDispatch } from "react-redux";
import { createQuestion } from "rtx/slices/faq";
import { router, useNavigation } from "expo-router";

export default function ManageFaqCreate() {
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newAnswer, setNewAnswer] = useState<string>("");
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
          onPress={handleCreate}
        >
          <Text style={{ fontWeight: "bold" }}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, newQuestion, newAnswer]);

  const handleCreate = () => {
    console.log(newQuestion);
    console.log(newAnswer);
    dispatch(
      createQuestion({
        title: "Andrei Sager Gumagana",
        newQuestion: { question: newQuestion, answer: newAnswer },
      })
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
            value={newQuestion}
            onChangeText={(text) => setNewQuestion(text)}
            placeholder="Enter a question..."
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
            value={newAnswer}
            onChangeText={(text) => setNewAnswer(text)}
            placeholder="Enter an answer..."
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
