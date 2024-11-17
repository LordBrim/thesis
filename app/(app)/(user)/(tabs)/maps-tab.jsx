import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  Animated,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { HORIZONTAL_SCREEN_MARGIN } from "constants";
import Description from "components/common/texts/Description";
import { GS } from "constants";
import { useRouter } from "expo-router";
import { FIRESTORE_DB } from "../../../../firebase-config";
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

  const fetchHospitals = async () => {
    try {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const querySnapshot = await getDocs(collection(FIRESTORE_DB, "hospital"));
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

  useFocusEffect(
    React.useCallback(() => {
      fetchHospitals();
    }, [])
  );

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
        hospitals: JSON.stringify(HospitalsData),
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
      <View style={styles.cTop}>
        <View style={{ gap: 8 }}>
          <Text style={GS.h1}>Locate a Hospital</Text>
          <Description description="Select a partnered hospital to locate" />
        </View>
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
        HospitalsData.map(
          (hospital, index) =>
            !hospital.disabled && (
              <Pressable
                style={styles.hContainer}
                key={hospital.id} // Changed from hospital.index to hospital.id
                android_ripple={{ radius: 250 }}
                onPress={() => focusMap(hospital)}
              >
                <Text style={styles.hName}>{hospital.name}</Text>
                <View style={styles.icon}>
                  <FontAwesome6
                    name="chevron-right"
                    size={18}
                    color={COLORS.text}
                  />
                </View>
              </Pressable>
            )
        )
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
    paddingVertical: HORIZONTAL_SCREEN_MARGIN,
  },
  cTop: {
    width: "100%",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
    fontFamily: "Poppins_700Bold",
    gap: 16,
  },
  hContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 50,
    paddingLeft: HORIZONTAL_SCREEN_MARGIN,
    paddingVertical: 12,
  },
  hName: {
    flex: 1,
    fontFamily: "Poppins_600SemiBold",
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
