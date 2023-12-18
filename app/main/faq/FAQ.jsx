import {
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./faq.style";

import QuestionPanel from "../../../components/faq/QuestionPanel";
import Divider from "../../../components/Divider";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import db from "../../../db";
import BackButton from "../../../components/backButton";

const FAQ = () => {
  const [isActiveIndex, setActiveIndex] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const navigation = useNavigation();

  const redirectToHome = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    async function getFaqs() {
      const faqCollection = collection(db, "faqs");
      const faqSnapshot = await getDocs(faqCollection);

      if (faqSnapshot.docs) {
        const faqs = faqSnapshot.docs.map((faqDoc) => {
          const faqData = faqDoc.data();
          return {
            id: faqDoc.id,
            title: faqData.title,
            answer: faqData.answer,
          };
        });
        setFaqs(faqs);
        console.log(faqs);
      }
    }
    getFaqs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "90%" }}>
        <BackButton navigation={redirectToHome} />
        <Text style={styles.header}>
          Frequently Asked <Text style={{ color: "red" }}>Questions</Text>
        </Text>
      </View>
      <Divider marginTop={30} marginBottom={30} />
      <FlatList
        data={faqs}
        renderItem={({ item }) => (
          <QuestionPanel
            key={item.id}
            question={item.title}
            answer={item.answer}
            isActive={isActiveIndex === item.id}
            onShow={() => {
              setActiveIndex(item.id);
            }}
            onHide={() => {
              setActiveIndex(null);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default FAQ;
