import {
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  TextStyle,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { MINOR_COMPONENT_HEIGHT } from "../../constants/measurements";

type ICallToActionBtn = {
  /**
   * The label of the button
   */
  label: string;
  /**
   * The action when pressed
   */
  onPress: () => void;
  /**
   * The style of the container.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Whether to use the secondary design.
   */
  secondary?: boolean;
};

export default function CallToActionBtn({
  label,
  onPress,
  style,
  secondary,
}: ICallToActionBtn) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        style,
        secondary ? styles.secondaryContainer : styles.defaultContainer,
        secondary && pressed && styles.secondaryContainerPressed,
      ]}
      onPress={onPress}
      android_ripple={{ radius: 200 }}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.label,
            secondary ? styles.secondaryLabel : styles.defaultContainer,
            secondary && pressed && styles.secondaryLabelPressed,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: MINOR_COMPONENT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.medium,
    borderRadius: SIZES.xSmall,
  },
  defaultContainer: {
    color: COLORS.background,
    backgroundColor: COLORS.primary,
  },
  secondaryContainer: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  secondaryContainerPressed: {
    borderColor: COLORS.primary,
  },
  label: {
    fontSize: SIZES.medium,
    textTransform: "capitalize",
    fontFamily: "Poppins_700Bold",
  },
  defaultLabel: {
    color: COLORS.background,
  },
  secondaryLabel: {
    color: COLORS.gray,
  },
  secondaryLabelPressed: {
    color: COLORS.primary,
  },
});
