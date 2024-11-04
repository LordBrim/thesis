import {
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  Text,
  SectionList,
  Pressable,
  TouchableOpacity,
  Modal,
  Image,
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

const FAQ_DATA = [
  {
    title: "GENERAL",
    data: [
      {
        question: "Who can donate blood?",
        answer:
          "Generally, individuals aged 16-65 can donate blood, provided they meet the eligibility criteria. Minors are required to provide written parental consent.",
      },
      {
        question:
          "I have health conditions that may affect my eligibility. Can I still donate blood?",
        answer:
          "You can still schedule a donation appointment at your preferred hospital. Authorized hospital staff will conduct a comprehensive screening to determine your eligibility to donate.",
      },
      {
        question: "How should I prepare for my blood donation appointment?",
        answer:
          "To prepare for your donation, make sure to stay hydrated, eat a healthy meal, and get plenty of sleep. Additionally, please avoid alcohol or caffeine the day before your appointment.",
      },
      {
        question: "What side effects after donating should I be aware of?",
        answer:
          "Common side effects can include lightheadedness, nausea, or bruising at the needle site. These typically last only for a few minutes. However, if you experience any lasting or severe symptoms, please inform the hospital staff immediately.",
      },
    ],
  },
  {
    title: "DONATION",
    data: [
      {
        question: "How do I schedule a donation appointment?",
        answer:
          "You can schedule a donation appointment by going to the main dashboard and clicking on ‘Donate’. This will direct you to the donation page, which consists of two (2) parts: the assessment section and the schedule section. Please read the eligibility notice thoroughly before proceeding. In the assessment section, please answer all questions truthfully, as this will serve as your initial assessment that will be forwarded to the hospital staff. Then, you can select your preferred hospital, date, and time for your appointment in the schedule section. A code will be provided at the end. Make sure to save it or take a screenshot, as this code will be required at your appointment to validate your incentive eligibility.",
      },
      {
        question: "Is it necessary to fill out the preliminary checklist?",
        answer:
          "Yes, it is necessary. To schedule a donation appointment using Lifeline, you would have to answer the preliminary checklist, as this serves as an initial evaluation of your potential eligibility to donate. Please keep in mind that while this checklist doesn’t guarantee final eligibility, it provides the hospital staff an overview of your health status prior to your appointment. You would still need to undergo a comprehensive screening with the hospital staff on the day of your appointment.",
      },
      {
        question: "How can I locate the nearest hospital for blood donation?",
        answer:
          "To locate the nearest hospital, go to the main dashboard and click on ‘Maps’ in the navigation bar.",
      },
      {
        question: "I have the appointment code. What are the next steps?",
        answer:
          "Please make sure to arrive on time for your appointment. Kindly show your appointment code to the hospital staff for validation. If your code is valid, the appointment should count towards your incentive progress.",
      },
      {
        question: "What incentives can I earn for donating blood?",
        answer:
          "Incentives may vary per partnered hospitals. For instance, Ace Medical Mandaluyong: After four (4) successful donations, you will be placed on a priority list should you ever need a blood bag. UERM Medical Center: After four (4) successful donations, a complimentary T-shirt will be given.",
      },
      {
        question: "What is the validity period of my earned incentives?",
        answer:
          "This may vary per partnered hospital. Please inquire with them directly for details on the validity period.",
      },
      {
        question: "Can I transfer my earned incentives to someone else?",
        answer: "No, earned incentives are non-transferable.",
      },
    ],
  },
  {
    title: "REQUEST",
    data: [
      {
        question: "How do I request blood?",
        answer:
          "You can submit a request by going to the main dashboard and clicking on ‘Request’. Please read the guidelines thoroughly before proceeding. In the request form, provide the following information: the patient’s name, specific blood type and transfusion needed, your relationship to the patient (whether it’s for yourself or someone else), required documents, and any additional information you wish to include. You will be notified in-app once there are updates to your request.",
      },
      {
        question: "What information will be needed to request blood?",
        answer: "Kindly refer to the question above.",
      },
      {
        question: "Is there a fee for requesting blood through Lifeline?",
        answer:
          "There is no fee for submitting a request through Lifeline. However, please note that hospital fees may still apply. For example, there is a blood screening fee to ensure that each blood bag is safe from transmissible infections, which may vary per hospital.",
      },
      {
        question: "How will I know if my request has been accepted?",
        answer:
          "You will be notified in-app once there are updates to your request. However, should your request be rejected, please keep in mind that Lifeline serves only as a platform for convenience between you and the hospital. We do not have the authority to accept or reject requests, as that decision lies solely with the issuing hospital. For assistance and/or clarifications regarding your request, please contact the issuing hospital directly.",
      },
      {
        question: "Why is my request rejected?",
        answer:
          "There may be several reasons why your request has been rejected, namely: Incomplete information: Your request may lack necessary information or documents. Insufficient stock: The requested blood type may not be available in all our partnered hospitals. Ineligibility: The request may not meet the hospital’s guidelines or eligibility criteria. If you have any questions or concerns regarding your specific case, please contact the issuing hospital directly for assistance and/or clarification.",
      },
      {
        question: "Can my request be expedited?",
        answer: "No, requests cannot be expedited.",
      },
      {
        question:
          "What happens if the blood type I requested is not available?",
        answer:
          "If the requested blood type is not available, you will be notified and may need to wait until it becomes available.",
      },
      {
        question:
          "I don’t have the required documents to request blood. Can I still submit a request?",
        answer:
          "Unfortunately, you will need to submit the required documents (i.e., blood request form provided by the hospital) to submit a request. Please gather the necessary documents before proceeding.",
      },
      {
        question: "Can I request blood for someone else?",
        answer:
          "Yes, you can request blood for someone else. In the ‘Request’ page, kindly fill out the form using the patient’s information, then indicate your relationship to the patient.",
      },
    ],
  },
];

export default function FAQTab() {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(FAQ_DATA);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = FAQ_DATA.map((section) => ({
      ...section,
      data: section.data.filter(
        (item) =>
          item.question.toLowerCase().includes(text.toLowerCase()) ||
          item.answer.toLowerCase().includes(text.toLowerCase())
      ),
    })).filter((section) => section.data.length > 0);
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView overScrollMode="never">
        <View style={styles.cTop}>
          <View style={{ gap: 8 }}>
            <Text style={GS.h1}>
              If you have any questions on Lifeline, We're here to answer them
              the best we can!
            </Text>

            <Description description="At Lifeline we like to help you to easily understand our app and how you can use it properly without any worries! Feel free to check answers for your questions." />
          </View>

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
          <SectionList
            sections={filteredData}
            renderItem={({ item }) => (
              <QuestionCard question={item.question} answer={item.answer} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={panel.title}>{title}</Text>
            )}
            keyExtractor={(item) => item.question}
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
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const panel = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: COLORS.slate100,
  },
  title: {
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
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
    textAlign: "justify",
    fontSize: 16,
  },
});
