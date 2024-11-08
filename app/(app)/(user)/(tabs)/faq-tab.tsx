import {
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  Text,
  SectionList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  FAQuestions,
  GS,
  HORIZONTAL_SCREEN_MARGIN,
} from "../../../../constants";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/theme";
import Description from "../../../../components/common/texts/Description";
import TextInputWrapper from "../../../../components/common/TextInputWrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getFAQs } from "rtx/slices/faq";
import IconBtn from "components/common/IconButton";

export default function FAQTab() {
  const { faqs } = useSelector((state: RootState) => state.faqs);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getFAQs());
  }, []);

  const [searchText, setSearchText] = useState("");

  // TODO: Nasira ko ulit lol paayos na lng mamaya @angelomunar
  const [filteredData, setFilteredData] = useState([]);
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = FAQuestions.filter(
      (item) =>
        item.question.toLowerCase().includes(text.toLowerCase()) ||
        item.answer.toLowerCase().includes(text.toLowerCase())
    ).map((item) => ({ id: item.id, title: item.question }));
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView overScrollMode="never">
        <View style={styles.cTop}>
          <Text style={GS.h1}>How can we help you?</Text>
          <TextInputWrapper>
            <TextInput
              placeholder="Find a question..."
              onChangeText={handleSearch}
              value={searchText}
              style={{
                flex: 1,
                padding: 12,
              }}
            />
            <TouchableOpacity
              style={{ paddingRight: 12 }}
              onPress={handleSearch}
            >
              <FontAwesome6 name="magnifying-glass" size={24} color={"black"} />
            </TouchableOpacity>
          </TextInputWrapper>
        </View>

        <View style={styles.panels}>
          <FlatList
            data={faqs}
            renderItem={({ item }) => (
              <QuestionPanel questions={item.questions} />
            )}
            keyExtractor={(item) => item.title}
            overScrollMode="never"
            scrollEnabled={false}
            contentContainerStyle={{ gap: 16 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type IQuestionPanel = {
  questions: Array<{ question: string; answer: string }>;
};

export function QuestionPanel({ questions }: IQuestionPanel) {
  return (
    <View style={panel.container}>
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    paddingTop: HORIZONTAL_SCREEN_MARGIN,
  },
  cTop: {
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
    fontWeight: "bold",
    gap: 16,
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
