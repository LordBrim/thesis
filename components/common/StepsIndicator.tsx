import { View, Text } from "react-native";
import React from "react";
import StepIndicator from "react-native-step-indicator";
import { COLORS } from "../../constants";

interface IStepsIndicator {
  labels: Array<string>;
  step: number;
  /**
   * Count of steps
   */
  steps: number;
}

export default function StepsIndicator({
  labels,
  step,
  steps,
}: IStepsIndicator) {
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,

    stepStrokeCurrentColor: COLORS.primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: COLORS.primary,
    stepStrokeUnFinishedColor: "#aaaaaa",

    separatorFinishedColor: COLORS.primary,
    separatorUnFinishedColor: "#aaaaaa",

    stepIndicatorFinishedColor: COLORS.primary,
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,

    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: COLORS.primary,
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",

    labelColor: "#aaaaaa",
    labelSize: 13,
    labelFontFamily: "Poppins_400Regular",
    currentStepLabelColor: COLORS.primary,
  };

  return (
    <StepIndicator
      customStyles={customStyles}
      labels={labels}
      stepCount={steps}
      currentPosition={step}
    />
  );
}
