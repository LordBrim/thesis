import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useEffect } from "react";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { createQuestion, getFAQs } from "rtx/slices/faq";
import IconBtn from "components/common/IconButton";
import { router, useNavigation } from "expo-router";

export default function ManageFAQ() {
  const { faqs } = useSelector((state: RootState) => state.faqs);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  // useEffect(() => {
  //   dispatch(getFAQs());
  // }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconBtn
          icon="plus"
          size={18}
          onPress={() => router.push("(app)/(admin)/(home)/manage-faq-create")}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.panels}>
        <FlatList
          data={faqs}
          renderItem={({ item }) => (
            <QuestionPanel title={item.title} questions={item.questions} />
          )}
          keyExtractor={(item) => item.title}
          overScrollMode="never"
          scrollEnabled={true}
          persistentScrollbar={true}
          contentContainerStyle={{ gap: 16 }}
        />
      </View>
    </View>
  );
}

type IQuestionPanel = {
  title: string;
  questions: Array<{ question: string; answer: string }>;
};

export function QuestionPanel({ title, questions }: IQuestionPanel) {
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

export const handleUpdate = (question, answer) => {
  router.push({
    pathname: "(app)/(admin)/(home)/manage-faq-update",
    params: {
      question: question,
      answer: answer,
    },
  });
};

export const handleDelete = () => {
  console.log("Delete A Question");
};

export function QuestionCard({ question, answer }: IQuestionCard) {
  return (
    <>
      <Pressable style={card.qContainer} android_ripple={{ radius: 250 }}>
        <Text style={card.question}>{question}</Text>
        <IconBtn
          icon="pencil"
          size={18}
          onPress={() => handleUpdate(question, answer)}
        />
        <IconBtn
          icon="trash"
          size={18}
          onPress={() => handleDelete()}
          color="red"
        />
      </Pressable>
      <View style={card.aContainer}>
        <Text style={card.answer}>{answer}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  panels: {
    gap: 20,
  },
});

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
    padding: 2,
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
