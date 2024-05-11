import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

type IChecklistItem = {
  question: string;
};

export default function ChecklistItem() {
  const [answer, setAnswer] = useState(null);

  return (
    <View style={styles.container}>
      <Text>Checklist Item</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
