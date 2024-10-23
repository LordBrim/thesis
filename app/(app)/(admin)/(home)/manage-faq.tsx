import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getFAQs } from "rtx/slices/faq";

export default function ManageFAQ() {
  const { faqs } = useSelector((state: RootState) => state.faqs);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFAQs());
  }, []);

  return (
    <View style={styles.container}>
      {faqs.map((faqs) => (
        <View key={faqs.id}>
          <Text>{faqs.question}</Text>
          <Text>{faqs.answer}</Text>
        </View>
      ))}
      <Text>Manage FAQ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
