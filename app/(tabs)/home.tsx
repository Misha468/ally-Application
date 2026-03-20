import { database } from "@/firebase/firebase";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
interface recomendsDataProps {
  [key: string]: recomendsItemsProps;
}
interface recomendsItemsProps {
  id: string;
  url: string;
}
export default function HomeScreen() {
  // UseStates
  const [firstTypeFocus, setFirstTypeFocus] = useState<boolean>(false);
  const [secondTypeFocus, setSecondTypeFocus] = useState<boolean>(false);
  const [thirdTypeFocus, setThirdTypeFocus] = useState<boolean>(false);
  const [recomends, setRecomends] = useState<recomendsItemsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // Load data
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    async function loadRecomends() {
      try {
        const snapshot = await get(ref(database, `recomends`));
        if (isMounted && snapshot) {
          const recomendsData = snapshot.val();
          if (recomendsData && typeof recomendsData === "object") {
            const publicationsArray: recomendsItemsProps[] =
              Object.values(recomendsData);
            setRecomends(publicationsArray);
          } else {
            setRecomends([]);
          }
        } else {
          setRecomends([]);
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadRecomends();
    return () => {
      isMounted = false;
    };
  }, []);
  if (loading) {
    return <Text>Загрузка....</Text>;
  }
  //
  const renderRecomends = ({ item }: { item: recomendsItemsProps }) => {
    const getImageSource = (imageName: string) => {
      const images: { [key: string]: any } = {
        "recomend1.png": require("../../assets/images/recomends/recomend1.png"),
        "recomend2.png": require("../../assets/images/recomends/recomend2.png"),
        "recomend3.png": require("../../assets/images/recomends/recomend3.png"),
        "recomend4.png": require("../../assets/images/recomends/recomend4.png"),
      };
      return images[imageName] || require("../../assets/images/icon.png");
    };
    return (
      <Image style={styles.recomendImage} source={getImageSource(item.url)} />
    );
  };
  return (
    <View style={styles.background}>
      <Header />
      <View style={styles.mainComponent}>
        <View style={styles.forUserWrapper}>
          <Text style={styles.title}>Для вас</Text>
          <View style={styles.typesWrapper}>
            {firstTypeFocus ? (
              <TouchableOpacity onPress={() => setFirstTypeFocus(false)}>
                <Image
                  style={styles.type}
                  source={require("../../assets/images/altMascots/altMascot1.png")}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setFirstTypeFocus(true)}>
                <Image
                  style={styles.type}
                  source={require("../../assets/images/mascots/mascot1.png")}
                />
              </TouchableOpacity>
            )}
            {secondTypeFocus ? (
              <TouchableOpacity onPress={() => setSecondTypeFocus(false)}>
                <Image
                  style={styles.type}
                  source={require("../../assets/images/altMascots/altMascot2.png")}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setSecondTypeFocus(true)}>
                <Image
                  style={styles.type}
                  source={require("../../assets/images/mascots/mascot2.png")}
                />
              </TouchableOpacity>
            )}
            {thirdTypeFocus ? (
              <TouchableOpacity onPress={() => setThirdTypeFocus(false)}>
                <Image
                  style={styles.type}
                  source={require("../../assets/images/altMascots/altMascot3.png")}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setThirdTypeFocus(true)}>
                <Image
                  style={styles.type}
                  source={require("../../assets/images/mascots/mascot3.png")}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.recomendsWrapper}>
          <Text style={styles.title}>Рекомендации</Text>
          <FlatList
            numColumns={2}
            data={recomends}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={renderRecomends}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e6e6e3",
    padding: 25,
    paddingTop: 75,
  },
  title: {
    marginLeft: 20,
    fontSize: 24,
    color: "#212121",
    fontFamily: "InstSansMed",
    textTransform: "uppercase",
  },
  mainComponent: {
    gap: 50,
    marginTop: 50,
  },
  type: {
    width: 100,
    height: 100,
    borderRadius: 22,
  },
  typesWrapper: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 22,
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },
  forUserWrapper: {
    gap: 15,
  },
  recomendImage: {
    width: 150,
    height: 200,
    borderRadius: 22,
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },
  listContent: {
    gap: 25,
    overflow: "hidden",
    maxHeight: 350,
  },
  recomendsWrapper: {
    gap: 15,
  },
});
