import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import IconBtn from "components/common/IconButton";

type IQuestionCard = {
  question: string;
  answer: string;
  isActive: number;
  onShow: () => void;
  onHide: () => void;
};

export default function QuestionCard({
  question,
  answer,
  isActive,
  onShow,
  onHide,
}: IQuestionCard) {
  return (
    <Pressable style={styles.container} onPress={isActive ? onHide : onShow}>
      <View style={styles.cQuestion}>
        <Text style={styles.question}>{question}</Text>
        {isActive ? (
          <IconBtn icon="minus" size={20} onPress={onHide} />
        ) : (
          <IconBtn icon="plus" size={20} onPress={onShow} />
        )}
      </View>
      {isActive ? <Text style={styles.answer}>{answer}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.gray2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingVertical: 4,
  },
  cQuestion: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    flex: 1,
    fontWeight: "bold",
  },
  answer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
  },
});
