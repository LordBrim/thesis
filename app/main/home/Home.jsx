import { Donations, Events, Welcome } from "../../../components";

import styles from "./home.style";

const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
        }}
      >
        <Welcome />
        <Donations />
        <Events />
      </View>
    </ScrollView>
  );
};

export default Home;
