import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BuyTokensScreen() {
  const router = useRouter();
  // Screens useStates
  const [status, setStatus] = useState<string>("payment");
  const [tokenAdd, setTokenAdd] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  //   Inputs useStates
  const [cardNumber, setCardNumber] = useState<string>();
  const [cardDate, setCardDate] = useState<string>();
  const [cvvCode, setCvvCode] = useState<string>();
  //   loadInfo
  useEffect(() => {
    setLoading(true);
    async function loadTokenBox() {
      try {
        const boxType = await AsyncStorage.getItem("tokenBoxValue");
        switch (boxType) {
          case "small":
            setTokenAdd(100);
            break;
          case "big":
            setTokenAdd(700);
            break;
          default:
            break;
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadTokenBox();
  });
  //   Loading
  if (loading) {
    return <Text>Загрузка...</Text>;
  }
  //   backFunction
  async function tokenAddSuccess() {
    try {
      setStatus("payment");
      router.replace("/home");
    } catch (error: any) {
      console.log(error.message);
    }
  }
  //   Component render
  return status === "payment" ? (
    <View style={styles.paymentWrapper}>
      <View style={styles.formWrapper}>
        <TextInput
          style={styles.inputs}
          value={cardNumber}
          onChangeText={setCardNumber}
          secureTextEntry={true}
          placeholder="0000 0000 0000 0000"
          placeholderTextColor={"#727070"}
        />
        <View>
          <TextInput
            style={styles.inputs}
            value={cardDate}
            onChangeText={setCardDate}
            secureTextEntry={true}
            placeholder="00/00"
            placeholderTextColor={"#727070"}
          />
          <TextInput
            style={styles.inputs}
            value={cvvCode}
            onChangeText={setCvvCode}
            secureTextEntry={true}
            placeholder="CVV2"
            placeholderTextColor={"#727070"}
          />
        </View>
        <TouchableOpacity onPress={() => setStatus("confirmed")}>
          <Text>Оплатить</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <ImageBackground
      style={styles.wrapper}
      source={require("../../assets/images/mascots/maskot7.png")}
    >
      <View>
        <TouchableOpacity style={styles.backToIndexButton}>
          <View style={styles.backToWrapper}>
            <Text
              style={styles.backToIndexButtonText}
              onPress={() => tokenAddSuccess()}
            >
              &lt;
            </Text>
          </View>
          <Text style={styles.backToIndexText}>Вернуться на главную</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Готово!</Text>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 25,
    gap: 250,
  },
  text: {
    fontSize: 30,
    fontFamily: "InstSansBold",
    textTransform: "uppercase",
  },
  backToIndexButton: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  backToWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#ddddda",
    borderRadius: 999,
  },
  backToIndexButtonText: {
    fontSize: 30,
    fontFamily: "InstSansMed",
  },
  backToIndexText: {
    fontSize: 18,
    fontFamily: "InstSansMed",
    textTransform: "uppercase",
  },
  paymentWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formWrapper: {
    flexDirection: "column",
    gap: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    height: 400,
    marginHorizontal: "auto",
    marginVertical: "auto",
    boxShadow: "0 0 25px rgba(0,0,0, 0.5)",
    borderRadius: 22,
    padding: 25,
  },
  inputs: {
    width: "90%",
    height: 50,
    borderRadius: 15,
    backgroundColor: "#d9d9d9",
    paddingHorizontal: 15,
    fontFamily: "InstSansMed",
    borderWidth: 0,
  },
});
