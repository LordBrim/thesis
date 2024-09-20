import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import {
  LineChartPropsType,
  LineChartBicolor,
} from "react-native-gifted-charts";

export default function ReportLineChart({ data }: LineChartPropsType) {
  return (
    <View style={styles.chart}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Monthly Donations and Requests
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 24,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: COLORS.primary,
              marginRight: 8,
            }}
          />
          <Text
            style={{
              width: 70,
              height: 16,
            }}
          >
            Donations
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: COLORS.accent1,
              marginRight: 8,
            }}
          />
          <Text
            style={{
              width: 70,
              height: 16,
            }}
          >
            Requests
          </Text>
        </View>
      </View>

      <LineChartBicolor
        isAnimated
        thickness={3}
        color="#07BAD1"
        maxValue={600}
        noOfSections={3}
        animationDuration={1000}
        onDataChangeAnimationDuration={300}
        areaChart
        yAxisTextStyle={{ color: "lightgray" }}
        data={data}
        hideDataPoints
        startFillColor={"rgb(84,219,234)"}
        endFillColor={"rgb(84,219,234)"}
        startOpacity={0.4}
        endOpacity={0.1}
        spacing={22}
        backgroundColor="#414141"
        rulesColor="gray"
        initialSpacing={10}
        yAxisColor="lightgray"
        xAxisColor="lightgray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    width: "100%",
    paddingVertical: HORIZONTAL_SCREEN_MARGIN,
    paddingHorizontal: 12,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#52006A",
    backgroundColor: COLORS.white,
  },
});
