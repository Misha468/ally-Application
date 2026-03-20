import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";

export default function ShopScreen() {
  const router = useRouter();
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
        break;
      default:
        break;
    }
  }
  async function tokenBuyScreenOpener(boxType: string) {
    try {
      switch (boxType) {
        case "small":
          await AsyncStorage.setItem("tokenBoxValue", "small");
          router.replace("/(tabs)/buyTokens");
          break;
        case "big":
          await AsyncStorage.setItem("tokenBoxValue", "big");
          router.replace("/(tabs)/buyTokens");
          break;
        default:
          break;
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <View style={styles.background}>
      <Header />
      <View style={styles.mainComponent}>
        <Text style={styles.mainTitle}>Магазин</Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={() => buttonChanger(shopType)}>
            {isChoosed == true ? (
              <View style={styles.buttonWithBackgroundWrapper}>
                <Image
                  style={styles.buttonBackgroud}
                  source={require("../../assets/images/iconBackgrounds/dateBackground.png")}
                />
                <Text style={styles.buttonTextOnBackground}>Подписки</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Подписки</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => buttonChanger(shopType)}>
            {isChoosed == false ? (
              <View style={styles.buttonWithBackgroundWrapper}>
                <Image
                  style={styles.buttonBackgroud}
                  source={require("../../assets/images/iconBackgrounds/dateBackground.png")}
                />
                <Text style={styles.buttonTextOnBackground}>Токены</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Токены</Text>
            )}
          </TouchableOpacity>
        </View>
        {/* Discount */}
        {shopType === "subscription" ? (
          <View style={styles.subscriptionWrapper}>
            <View style={styles.discountWrapper}>
              <Image
                style={styles.discountFire}
                source={require("../../assets/images/icons/discount.png")}
              />
              <View style={styles.discountTextWrapper}>
                <Text style={styles.discountText}>Акция</Text>
                <Text style={styles.discountText}>-50%</Text>
              </View>
              <View style={styles.discountButtonWrapper}>
                <TouchableOpacity style={styles.discountButton}>
                  <Text style={styles.discountArrowText}>&gt;</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Subscriptions */}
            <View style={styles.subscriptionWrapper}>
              <TouchableOpacity>
                <Image
                  style={styles.subscriptionBlock}
                  source={require("../../assets/images/shop/baseSubscription.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.subscriptionBlock}
                  source={require("../../assets/images/shop/proSubscription.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Tokens
          <View style={styles.tokensShopWrapper}>
            <View style={styles.famousTokenBoxWrapper}>
              <TouchableOpacity style={styles.famousTokenBox}>
                <Image
                  style={styles.famousBoxImage}
                  source={require("../../assets/images/tokens/famousTokens.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.tokenBoxesWrapper}>
              {/* Small token box */}
              <TouchableOpacity
                style={styles.tokenBoxWrapper}
                onPress={() => tokenBuyScreenOpener("small")}
              >
                <Image
                  style={styles.tokenBoxImage}
                  source={require("../../assets/images/tokens/smallTokens.png")}
                />
              </TouchableOpacity>
              {/* Big token box */}
              <TouchableOpacity
                style={styles.tokenBoxWrapper}
                onPress={() => tokenBuyScreenOpener("big")}
              >
                <Image
                  resizeMode="stretch"
                  style={styles.tokenBoxImage}
                  source={require("../../assets/images/tokens/bigTokens.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  mainComponent: {
    width: "100%",
    height: "85%",
    marginTop: 25,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255, 0.6)",
    padding: 10,
  },
  mainTitle: {
    marginLeft: 20,
    fontSize: 24,
    color: "#212121",
    fontFamily: "InstSansMed",
    textTransform: "uppercase",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "auto",
    marginTop: 25,
    backgroundColor: "#d9d9d9",
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 22,
    zIndex: 5,
  },
  buttonWithBackgroundWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBackgroud: {
    position: "absolute",
    width: 125,
    height: 30,
    borderRadius: 22,
  },
  buttonText: {
    fontSize: 16,
    color: "#212121",
    fontFamily: "InstSansMed",
    textTransform: "uppercase",
  },
  buttonTextOnBackground: {
    fontSize: 16,
    color: "#ebebe9",
    fontFamily: "InstSansMed",
    textTransform: "uppercase",
  },
  shopButtonsWrapper: {
    backgroundColor: "#d9d9d9",
  },
  discountWrapper: {
    width: "100%",
    marginHorizontal: "auto",
    height: 75,
    marginTop: 25,
    backgroundColor: "#FBA85E80",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: "relative",
    zIndex: 1,
  },
  discountFire: {
    width: "100%",
    height: 200,
    marginHorizontal: "auto",
    position: "absolute",
    objectFit: "fill",
    top: -105,
    zIndex: 2,
  },
  discountText: {
    fontSize: 26,
    color: "#353535",
    fontFamily: "InstSansSemiBold",
    textTransform: "uppercase",
  },
  discountTextWrapper: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  discountButtonWrapper: {
    display: "flex",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    zIndex: 3,
  },
  discountButton: {
    width: 35,
    height: 35,
    backgroundColor: "#ebebe9",
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  discountArrowText: {
    fontSize: 30,
    color: "#353535",
    fontFamily: "InstSansSemiBold",
    textTransform: "uppercase",
  },
  subscriptionWrapper: {
    display: "flex",
    gap: 25,
  },
  subscriptionBlock: {
    width: "100%",
    objectFit: "fill",
    height: 150,
  },
  tokensShopWrapper: {
    display: "flex",
    gap: 25,
  },
  famousTokenBoxWrapper: {
    borderRadius: 22,
    width: "100%",
    height: 200,
  },
  famousTokenBox: {
    width: "100%",
    height: 200,
  },
  famousBoxImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  tokenBoxesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tokenBoxWrapper: {
    width: "47%",
    height: 125,
  },
  tokenBoxImage: {
    width: 200,
    height: 200,
    position: "relative",
    left: -35,
  },
});
