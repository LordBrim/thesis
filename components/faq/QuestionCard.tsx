import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import IconBtn from "components/common/IconButton";

type IQuestionCard = {
  question: string;
  answer: string;
};

export default function QuestionCard({ question, answer }: IQuestionCard) {
  const [open, setOpen] = useState(false);
  return (
    <Pressable
      style={styles.container}
      onPress={open ? () => setOpen(false) : () => setOpen(true)}
      android_ripple={{ radius: 250 }}
    >
      <View style={styles.cQuestion}>
        <Text style={styles.question}>{question}</Text>
        {open ? (
          <IconBtn icon="minus" size={18} onPress={() => setOpen(false)} />
        ) : (
          <IconBtn icon="plus" size={18} onPress={() => setOpen(true)} />
        )}
      </View>
      {open ? <Text style={styles.answer}>{answer}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.grayLight,
    borderTopWidth: 1,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
  cQuestion: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    flex: 1,
    fontWeight: "400",
  },
  answer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
  },
});
