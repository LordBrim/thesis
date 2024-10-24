import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { COLORS, SIZES, HORIZONTAL_SCREEN_MARGIN, GS } from "../../constants";
import { useState } from "react";
import IconBtn from "components/common/IconButton";

type IQuestionPanel = {
  title: string;
  questions: Array<{ question: string; answer: string }>;
};

export default function QuestionPanel({ title, questions }: IQuestionPanel) {
  return (
    <View style={panel.container}>
      <Text style={[GS.h3, panel.title]}>{title}</Text>
      <FlatList
        contentContainerStyle={(panel.container, { gap: 16 })}
        data={questions}
        renderItem={({ item }) => (
          <QuestionCard question={item.question} answer={item.answer} />
        )}
        keyExtractor={(item) => item.question}
      />
    </View>
  );
}

type IQuestionCard = {
  question: string;
  answer: string;
};

export function QuestionCard({ question, answer }: IQuestionCard) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable
        style={card.qContainer}
        onPress={open ? () => setOpen(false) : () => setOpen(true)}
        android_ripple={{ radius: 250 }}
      >
        <Text style={card.question}>{question}</Text>
        {open ? (
          <IconBtn icon="minus" size={18} onPress={() => setOpen(false)} />
        ) : (
          <IconBtn icon="plus" size={18} onPress={() => setOpen(true)} />
        )}
      </Pressable>
      {open ? (
        <View style={card.aContainer}>
          <Text style={card.answer}>{answer}</Text>
        </View>
      ) : null}
    </>
  );
}

const panel = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: COLORS.slate100,
  },
  title: {
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingVertical: 8,
  },
});

const card = StyleSheet.create({
  qContainer: {
    width: "100%",
    minHeight: 35,
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
    minHeight: 35,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingTop: 8,
    paddingBottom: 16,
  },
  answer: {
    flex: 1,
    flexDirection: "row",
  },
});
