import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { SPACES, SIZES, COLORS } from "../../constants";
import moment from "moment";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import Ionicons from "@expo/vector-icons/Ionicons";
type IActionBtn = {
  href: string;
  title: string;
  subtitle: string;
  cta?: boolean;
  currentUser?: any;
};

export default function ActionBtn({
  href,
  title,
  subtitle,
  cta,
  currentUser,
}: IActionBtn) {
  const [modalVisible, setModalVisible] = useState(false);
  const nextDonationDate = currentUser?.nextDonationDate;
  const canDonate =
    !nextDonationDate ||
    moment().isSameOrAfter(moment(nextDonationDate, "YYYY/MM/DD"));

  const handlePress = () => {
    if (!canDonate) {
      setModalVisible(true);
    }
  };

  return (
    <>
      {canDonate ? (
        <Link
          asChild
          href={href}
          style={[
            styles.container,
            cta ? styles.ctaContainer : styles.defaultContainer,
          ]}
        >
          <Pressable android_ripple={{ radius: 200 }}>
            <Text
              style={[
                styles.title,
                cta ? styles.ctaTitle : styles.defaultTitle,
              ]}
            >
              {title}
            </Text>
            <Text
              style={[
                styles.subtitle,
                cta ? styles.ctaSubtitle : styles.defaultSubtitle,
              ]}
            >
              {subtitle}
            </Text>
          </Pressable>
        </Link>
      ) : (
        <Pressable
          style={[
            styles.container,
            cta ? styles.ctaContainer : styles.defaultContainer,
            styles.disabledContainer,
          ]}
          onPress={handlePress}
        >
          <Text
            style={[styles.title, cta ? styles.ctaTitle : styles.defaultTitle]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.subtitle,
              cta ? styles.ctaSubtitle : styles.defaultSubtitle,
            ]}
          >
            {subtitle}
          </Text>
        </Pressable>
      )}
      <SingleBtnModal
        animation={true}
        description="You can't donate blood yet because you have donated recently. Please wait for the next donation date."
        onPress={() => setModalVisible(false)}
        icon={
          <Ionicons name="information-circle-outline" size={42} color="black" />
        }
        onRequestClose={() => setModalVisible(false)}
        title="You Can't Donate Yet"
        btnLabel="I Understand"
        visible={modalVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "50%",
    aspectRatio: 16 / 9,
    borderRadius: SIZES.small,
    padding: SPACES.md,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  defaultContainer: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  ctaContainer: {
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  defaultTitle: {},
  ctaTitle: {
    color: COLORS.background,
  },
  subtitle: {
    fontSize: SIZES.small,
  },
  defaultSubtitle: {
    color: COLORS.grayDark,
  },
  ctaSubtitle: {
    color: COLORS.background,
  },
  disabledContainer: {
    backgroundColor: COLORS.grayLight,
  },
});
