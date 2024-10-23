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
    <>
      <Pressable
        style={styles.qContainer}
        onPress={open ? () => setOpen(false) : () => setOpen(true)}
        android_ripple={{ radius: 250 }}
      >
        <Text style={styles.question}>{question}</Text>
        {open ? (
          <IconBtn icon="minus" size={18} onPress={() => setOpen(false)} />
        ) : (
          <IconBtn icon="plus" size={18} onPress={() => setOpen(true)} />
        )}
      </Pressable>
      {open ? (
        <View style={styles.aContainer}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  qContainer: {
    width: "100%",
    minHeight: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
  question: {
    flex: 1,
    fontWeight: "bold",
  },
  aContainer: {
    width: "100%",
    minHeight: 45,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingVertical: 8,
  },
  answer: {
    flex: 1,
    flexDirection: "row",
  },
});
