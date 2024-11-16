import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../constants";
import {
  LineChartPropsType,
  LineChartBicolor,
  LineChart,
} from "react-native-gifted-charts";

export default function ReportLineChart({ data }: LineChartPropsType) {
  return (
    <View style={styles.chart}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Poppins_700Bold",
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

      <LineChart
        areaChart
        curved
        data={data1}
        data2={data2}
        hideDataPoints
        spacing={68}
        color1={COLORS.primary}
        color2={COLORS.accent1}
        startFillColor1={COLORS.primary}
        startFillColor2={COLORS.accent1}
        endFillColor1={COLORS.primary}
        endFillColor2={COLORS.accent1}
        startOpacity={0.7}
        endOpacity={0.2}
        initialSpacing={0}
        noOfSections={4}
        yAxisColor="white"
        yAxisThickness={0}
        rulesType="solid"
        rulesColor="gray"
        yAxisTextStyle={{ color: "gray" }}
        yAxisLabelSuffix="%"
        xAxisColor="lightgray"
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerStripColor: "lightgray",
          pointerStripWidth: 2,
          strokeDashArray: [2, 5],
          pointerColor: "lightgray",
          radius: 4,
          pointerLabelWidth: 100,
          pointerLabelHeight: 120,
          pointerLabelComponent: (items) => {
            return (
              <View
                style={{
                  height: 120,
                  width: 100,
                  backgroundColor: "#282C3E",
                  borderRadius: 4,
                  justifyContent: "center",
                  paddingLeft: 16,
                }}
              >
                <Text style={{ color: "lightgray", fontSize: 12 }}>
                  donations
                </Text>
                <Text style={{ color: "white", fontFamily: "Poppins_700Bold" }}>
                  {items[0].value}
                </Text>
                <Text
                  style={{ color: "lightgray", fontSize: 12, marginTop: 12 }}
                >
                  requests
                </Text>
                <Text style={{ color: "white", fontFamily: "Poppins_700Bold" }}>
                  {items[1].value}
                </Text>
              </View>
            );
          },
        }}
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
    backgroundColor: COLORS.background,
  },
});

const data1 = [
  { value: 70 },
  { value: 36 },
  { value: 50 },
  { value: 40 },
  { value: 18 },
  { value: 38 },
];
const data2 = [
  { value: 50 },
  { value: 10 },
  { value: 45 },
  { value: 30 },
  { value: 45 },
  { value: 18 },
];
