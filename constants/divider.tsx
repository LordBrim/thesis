import React from "react";
import { View, StyleSheet } from "react-native";

interface DividerProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: any;
  margin?: number | string; // Add this line
}

const Divider: React.FC<DividerProps> = ({
  width = "100%",
  height = 1,
  color = "gray",
  style,
  margin = 0, // And this line
}) => {
  return (
    <View
      style={[
        styles.divider,
        { width, height, backgroundColor: color, margin }, // And use it here
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    borderRadius: 1,
  },
});

export default Divider;
