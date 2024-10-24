import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import IconBtn from "components/common/IconButton";

type IQuestionCard = {
  question: string;
  answer: string;
};
