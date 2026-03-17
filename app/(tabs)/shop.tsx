import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";

export default function ShopScreen() {
  const [shopType, setShopType] = useState("subscription");
  const [isChoosed, setIsChoosed] = useState(true);
  function buttonChanger(shopType: string) {
    switch (shopType) {
      case "subscription":
        setShopType("tokens");
        setIsChoosed(false);
        break;
      case "tokens":
        setShopType("subscription");
        setIsChoosed(true);
      default:
        break;
    }
  }
  return (
    <View style={styles.background}>
      <Header />
      <View style={styles.mainComponent}>
        <Text style={styles.mainTitle}>Магазин</Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => buttonChanger(shopType)}
            style={
              shopType === "subscription"
                ? styles.shopButtonWithBackground
                : styles.shopButtonWithoutBackground
            }
          >
            {isChoosed == true ? (
              <View style={styles.buttonWithBackgroundWrapper}>
                <Image
                  style={styles.buttonBackgroud}
                  source={require("../../assets/images/iconBackgrounds/dateBackground.png")}
                />
                <Text style={styles.buttonText}>Подписки</Text>
              </View>
            ) : (
              <View style={styles.buttonWithoutBackgroundWrapper}>
                <Text style={styles.buttonText}>Подписки</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => buttonChanger(shopType)}
            style={
              shopType === "tokens"
                ? styles.shopButtonWithBackground
                : styles.shopButtonWithoutBackground
            }
          >
            {isChoosed == false ? (
              <View style={styles.buttonWithBackgroundWrapper}>
                <Image
                  style={styles.buttonBackgroud}
                  source={require("../../assets/images/iconBackgrounds/dateBackground.png")}
                />
                <Text style={styles.buttonText}>Токены</Text>
              </View>
            ) : (
              <View style={styles.buttonWithoutBackgroundWrapper}>
                <Text style={styles.buttonText}>Токены</Text>
              </View>
            )}
          </TouchableOpacity>
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
  header: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  companyName: {
    fontSize: 34,
    color: "#e73f19",
    fontFamily: "InstSansBold",
  },
  mainComponent: {
    width: "100%",
    height: "85%",
    marginTop: 25,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255, 0.6)",
    padding: 10,
  },
  mainTitle: {
    fontSize: 24,
    color: "#212121",
    fontFamily: "InstSansMed",
    textTransform: "uppercase",
  },
});
