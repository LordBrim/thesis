import { Text, StyleSheet, View, Pressable } from "react-native";
import { Href, Link } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS, HORIZONTAL_SCREEN_MARGIN, SIZES } from "../../constants";

export type IAccountCard = {
  href: Href<string>;
  icon: string;
  label: string;
  iconColor?: string;
  labelColor?: string;
};

export default function AccountCard({
  href,
  icon,
  label,
  iconColor,
  labelColor,
}: IAccountCard) {
  return (
    <Link asChild replace href={href}>
      <Pressable style={styles.container} android_ripple={{ radius: 200 }}>
        <View style={styles.icon}>
          <FontAwesome6
            name={icon}
            size={28}
            color={iconColor || COLORS.primary}
          />
        </View>

        <Text style={[styles.label, { color: iconColor }]}>{label}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingVertical: 12,
    alignItems: "center",
  },
  icon: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
