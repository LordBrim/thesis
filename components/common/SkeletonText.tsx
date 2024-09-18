import React, { useState, useEffect } from "react";
import { Animated } from "react-native";

export default function SkeletonText({ width }: { width: number }) {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();

    // Cleanup animation on unmount
    return () => animation.stop();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e0e0e0", "#f0f0f0"],
  });

  return (
    <Animated.View
      style={{
        width: width,
        height: 20, // Simulate text height
        backgroundColor: backgroundColor,
        borderRadius: 4,
        marginVertical: 4,
      }}
    />
  );
}
