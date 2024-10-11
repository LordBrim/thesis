import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { MINOR_COMPONENT_HEIGHT } from "../../constants/measurements";

type TextInputWrapperProps = {
  label?: string;
  children: React.ReactNode;
  error?: boolean;
};

export default function TextInputWrapper({
  label,
  children,
  error,
}: TextInputWrapperProps) {
  return (
    <View style={[styles.container, error && styles.errorContainer]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: MINOR_COMPONENT_HEIGHT,
    padding: SIZES.xSmall,
    borderWidth: 1,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.gray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SIZES.xxxSmall,
  },
  errorContainer: {
    borderColor: "#FF5607",
  },
  label: {
    fontWeight: "bold",
    textTransform: "capitalize",
    position: "absolute",
    left: 6,
    top: -10.5,
    backgroundColor: COLORS.white,
    paddingHorizontal: 4,
    borderRadius: 50,
  },
});
