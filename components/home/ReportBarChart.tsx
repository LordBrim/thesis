import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import { BarChart, BarChartPropsType } from "react-native-gifted-charts";

interface ReportBarChart extends BarChartPropsType {
  title: string;
}

export default function ReportBarChart({ title, data }: ReportBarChart) {
  return (
    <View style={styles.chart}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {title}
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

      <BarChart
        barWidth={15}
        noOfSections={5}
        barBorderRadius={4}
        frontColor="lightgray"
        data={data}
        initialSpacing={0}
        yAxisThickness={0}
        xAxisThickness={0}
        scrollToEnd={true}
        renderTooltip={(item, index) => {
          return (
            <View
              style={{
                marginBottom: 20,
                bottom: -75,
              }}
            >
              <Text>{item.value}</Text>
            </View>
          );
        }}
        leftShiftForTooltip={0}
        leftShiftForLastIndexTooltip={55}
        autoCenterTooltip={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    width: "100%",
    paddingVertical: HORIZONTAL_SCREEN_MARGIN,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
  },
});
