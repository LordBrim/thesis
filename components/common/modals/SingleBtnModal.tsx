import {
  View,
  Text,
  StyleSheet,
  Modal as RNModal,
  Animated,
} from "react-native";
import React, { ReactNode, useRef, useEffect } from "react";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../constants";
import CallToActionBtn from "../CallToActionBtn";
import Markdown from "react-native-markdown-display"; // Ensure this import is correct

interface IModal {
  visible: boolean;
  onRequestClose: () => void;
  onPress?: () => void;
  children?: ReactNode;
  icon?: ReactNode;
  title: string;
  description: string | ReactNode;
  btnLabel: string;
  extraBtn?: ReactNode;
  animation?: boolean; // Add the animation prop
  renderMarkdown?: boolean; // Add the renderMarkdown prop
  errorMessage?: string; // Add the errorMessage prop
}

export default function SingleBtnModal({
  visible,
  onRequestClose,
  onPress,
  children,
  icon,
  title,
  description,
  btnLabel,
  extraBtn,
  animation = false, // Default to false if not provided
  renderMarkdown = false, // Default to false if not provided
  errorMessage,
}: IModal) {
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      if (animation) {
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 500, // Duration of the fade-in animation
          useNativeDriver: true,
        }).start();
      } else {
        opacityValue.setValue(1);
      }
    } else {
      if (animation) {
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 500, // Duration of the fade-out animation
          useNativeDriver: true,
        }).start();
      } else {
        opacityValue.setValue(0);
      }
    }
  }, [visible, animation]);

  return (
    <RNModal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <Animated.View style={[styles.modal, { opacity: opacityValue }]}>
        <View style={styles.container}>
          {icon}
          <Text style={styles.header}>{title}</Text>
          {renderMarkdown ? (
            <Markdown style={styles.description}>{description}</Markdown>
          ) : (
            <Text style={styles.description}>{description}</Text>
          )}
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          {children}
          <View style={styles.buttonContainer}>
            <CallToActionBtn label={btnLabel} onPress={onPress} />
            {extraBtn}
          </View>
        </View>
      </Animated.View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  container: {
    backgroundColor: COLORS.background,
    padding: 28,
    margin: HORIZONTAL_SCREEN_MARGIN,
    borderRadius: 15,
    alignItems: "center",
    gap: 20,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
  },
  description: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  buttonContainer: {
    marginTop: 32,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});
