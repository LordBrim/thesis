import { View, ScrollView } from "react-native";

import { Donations, Events, Welcome } from "../../../components";

import styles from "./home.style";

const Home = () => {
  return (
    <View style={styles.container}>
      <Welcome />
      <Donations />
      <Events />
    </View>
  );
};

export default Home;
