import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../../constants/theme";
import TextInputWrapper from "components/common/TextInputWrapper";
import { FontAwesome6 } from "@expo/vector-icons";
import { HORIZONTAL_SCREEN_MARGIN } from "constants";
import Description from "components/common/texts/Description";
import { GS } from "constants";
import { useRouter } from "expo-router";
import { FIRESTORE_DB } from "../../../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Correct import

function Maps({ setMapBackground, setMapHeader }) {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [HospitalsData, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [isMarkerSelected, setIsMarkerSelected] = useState(false);
  const skeletonAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const querySnapshot = await getDocs(
          collection(FIRESTORE_DB, "hospitalData")
        );
        const hospitalsData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const storage = getStorage(); // Initialize storage
            const logoRef = ref(storage, `hospitalDataLogo/${doc.id}.png`);
            const logoUrl = await getDownloadURL(logoRef);
            return {
              id: doc.id,
              ...data,
              logoUrl,
            };
          })
        );
        setHospitals(hospitalsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    setIsMarkerSelected(selectedHospital !== null);
    navigation.setOptions({ isMarkerSelected });
  }, [selectedHospital, navigation]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(skeletonAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(skeletonAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [skeletonAnimation]);

  const router = useRouter();
  const focusMap = (hospital) => {
    router.push({
      pathname: "/hospitalMapView",
      params: {
        hospital: JSON.stringify(hospital),
        styles: JSON.stringify(styles),
        hospitals: JSON.stringify(HospitalsData), // Ensure this is passed
      },
    });
  };

  const animatedStyle = {
    opacity: skeletonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: Add search function for multiple hospitals */}
      <View style={styles.cTop}>
        <View style={{ gap: 8 }}>
          <Text style={GS.h1}>Find a medical institution</Text>
          <Description description="At Lifeline, we partner with medical institutions to help patients easily find blood banks based on location, specialty, and services." />
        </View>

        <TextInputWrapper>
          <TextInput
            placeholder="Find a medical institution..."
            style={{ flex: 1 }}
          />
          <FontAwesome6 name="magnifying-glass" size={24} color={"black"} />
        </TextInputWrapper>
      </View>
      {loading ? (
        <View style={styles.skeletonContainer}>
          {[...Array(4)].map((_, index) => (
            <Animated.View
              key={index}
              style={[styles.skeletonItem, animatedStyle]}
            >
              <LinearGradient
                colors={["#e0e0e0", "#c0c0c0", "#e0e0e0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </Animated.View>
          ))}
        </View>
      ) : (
        !selectedHospital &&
        HospitalsData.map((hospital) => (
          <Pressable
            style={styles.hContainer}
            key={hospital.id}
            android_ripple={{ radius: 200 }}
            onPress={() => focusMap(hospital)}
          >
            <Text style={styles.hName}>{hospital.name}</Text>
            <View style={styles.icon}>
              <FontAwesome6
                name="chevron-right"
                size={18}
                color={COLORS.slate400}
              />
            </View>
          </Pressable>
        ))
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  cTop: {
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
    fontWeight: "bold",
    gap: 16,
  },
  hContainer: {
    flex: 1,
    width: "100%",
    borderColor: COLORS.slate100,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 50,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingVertical: 12,
  },
  hName: {
    flex: 1,
    fontWeight: "600",
  },
  icon: {
    width: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  skeletonContainer: {
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
  skeletonItem: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.slate100,
    borderRadius: 8,
    marginVertical: 8,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
  },
});

export default Maps;
