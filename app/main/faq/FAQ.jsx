import { View, Text, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import styles from "./faq.style";
import { COLORS, FAQuestions } from "../../../constants";

import QuestionPanel from "../../../components/faq/QuestionPanel";
import Divider from "../../../components/Divider";
import {Icon} from 'react-native-paper'
const FAQ = () => {
  const [isActiveIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  const redirectToHome = () => {
    navigation.navigate('Home'); 
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={{ alignSelf: 'flex-start' }}>
      <TouchableOpacity
        onPress={redirectToHome}
        style={styles.button}
      >
      <Icon name="arrow-left" size={30} color="black" source="chevron-left" />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontFamily: 'Grotesk',
            }}
          >
            BACK
          </Text>
      </TouchableOpacity>
      <Text style={styles.header}>
        Frequently Asked <Text style={{ color: "red" }}>Questions</Text>
      </Text>
     </View>
      <Divider marginTop={30} marginBottom={30} />
      <FlatList
        data={FAQuestions}
        renderItem={({ item }) => (
          <QuestionPanel
            question={item.question}
            answer={item.answer}
            isActive={isActiveIndex === item.id + 1}
            onShow={() => {
              setActiveIndex(item.id + 1);
            }}
            onHide={() => {
              setActiveIndex(0);
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default FAQ;