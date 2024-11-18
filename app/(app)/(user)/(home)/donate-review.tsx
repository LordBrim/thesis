import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import moment from "moment";
import { checklistQuestions } from "../../../../constants/database"; // Adjust the path to your database.js file
import IconBtn from "../../../../components/common/IconButton"; // Adjust the path to your IconBtn component

interface Answers {
  appointmentDate: string;
  appointmentTime: string;
  selectedHospital: string;
  [key: string]: any;
}

interface DonateReviewProps {
  answers: Answers;
}

interface IQuestionCard {
  question: string;
  answer: string;
}

const QuestionCard: React.FC<IQuestionCard> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable
        style={styles.qContainer}
        onPress={() => setOpen(!open)}
        android_ripple={{ radius: 250 }}
      >
        <Text style={styles.question}>{question}</Text>
        <IconBtn
          icon={open ? "minus" : "plus"}
          size={18}
          onPress={() => setOpen(!open)}
        />
      </Pressable>
      {open && (
        <View style={styles.aContainer}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      )}
    </>
  );
};

const DonateReview: React.FC<DonateReviewProps> = ({ answers }) => {
  console.log(answers); // Add this line to log the answers object
  const formatDate = (date: Date | string) => {
    return moment(date).format("MMMM D, YYYY");
  };

  const formatTime = (time: Date | string) => {
    return moment(time, ["hh:mm A", moment.ISO_8601]).format("hh:mm A");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Review Your Answers</Text>
      <View
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 20,
          justifyContent: "flex-start",
          width: "90%",
          marginBottom: 10,
        }}
      >
        <Text style={styles.label}>
          Appointment Date: {formatDate(answers.appointmentDate)}
        </Text>
        <Text style={styles.label}>
          Appointment Time: {formatTime(answers.appointmentTime)}
        </Text>
        <Text style={styles.label}>
          Selected Hospital: {answers.selectedHospital}
        </Text>
      </View>
      {/* Display preliminary checklist questions and answers */}
      {Object.keys(answers).map((key) => {
        if (
          key === "appointmentDate" ||
          key === "appointmentTime" ||
          key === "selectedHospital"
        ) {
          return null;
        }
        return (
          <QuestionCard
            key={key}
            question={key}
            answer={
              answers[key] instanceof Date
                ? formatDate(answers[key])
                : answers[key]
            }
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Poppins_700Bold",
  },
  qContainer: {
    width: "90%",
    minHeight: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
  },
  aContainer: {
    padding: 10,
  },
  answer: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
});

export default DonateReview;
