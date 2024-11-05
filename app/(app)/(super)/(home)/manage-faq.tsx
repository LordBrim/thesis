import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SectionList,
} from "react-native";
import React, { useEffect } from "react";
import { COLORS, GS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import {
  deleteQuestion,
  deleteQuestionInFirebase,
  getFAQs,
} from "../../../../rtx/slices/faq";
import IconBtn from "../../../../components/common/IconButton";
import { router, useNavigation } from "expo-router";

export default function ManageFAQ() {
  const { faqs } = useSelector((state: RootState) => state.faqs);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getFAQs());
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Frequently Asked Questions",
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontSize: 16,
      },
      headerTitleAlign: "center",
    });
  }, []);
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
        <SectionList
          sections={faqs}
          keyExtractor={(item, index) => item.toString() + index}
          renderItem={({ item, section: { title } }) => (
            <QuestionCard
              title={title}
              question={item.question}
              answer={item.answer}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={[GS.h3, styles.title]}>{title}</Text>
          )}
          overScrollMode="never"
          scrollEnabled={true}
          persistentScrollbar={true}
        />
      </View>
    </View>
  );
}

type IQuestionCard = {
  title: string;
  question: string;
  answer: string;
};

export function QuestionCard({ title, question, answer }: IQuestionCard) {
  const handleUpdate = (title, question, answer) => {
    router.push({
      pathname: "(app)/(admin)/(home)/manage-faq-update",
      params: {
        title: title.toString(),
        question: question.toString(),
        answer: answer.toString(),
      },
    });
  };

  const dispatch = useDispatch();

  const handleDelete = (title, deletedQuestion) => {
    dispatch(
      deleteQuestion({
        title: title,
        deletedQuestion: deletedQuestion,
      })
    );
    deleteQuestionInFirebase(title, deletedQuestion);
  };

  return (
    <>
      <Pressable style={card.qContainer} android_ripple={{ radius: 250 }}>
        <Text style={card.question}>{question}</Text>
        <IconBtn
          icon="pencil"
          size={18}
          onPress={() => handleUpdate(title, question, answer)}
        />
        <IconBtn
          icon="trash"
          size={18}
          onPress={() => handleDelete(title, { question, answer })}
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
  title: {
    flex: 1,
    minWidth: "100%",
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
