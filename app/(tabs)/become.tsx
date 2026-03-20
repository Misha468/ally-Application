import { useRouter } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function BecomeACreatorScreen() {
  const router = useRouter();
  function pageOpener(pageName: string) {
    switch (pageName) {
      case "faq":
        // В разработке
        // router.replace("/faq");
        router.replace("/inDev");
        break;
      case "rules":
        // В разработке
        // router.replace("/rules");
        router.replace("/inDev");
        break;
      default:
        break;
    }
  }
  return (
    <View style={styles.background}>
      <Header />
      <View style={styles.mainComponent}>
        <Text style={styles.mainTitle}>Стать креатором</Text>
        <ImageBackground
          style={styles.mascotImage}
          source={require("../../assets/images/mascots/mascot6.png")}
        >
          <TouchableOpacity style={styles.creatorButton}>
            <Text style={styles.creatorButtonText}>Хочу!</Text>
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pageOpener("rules")}
          >
            <Text style={styles.buttonText}>Правила</Text>
            <Text style={styles.buttonArrow}>&gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pageOpener("faq")}
          >
            <Text style={styles.buttonText}>FAQ</Text>
            <Text style={styles.buttonArrow}>&gt;</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#e6e6e3",
    padding: 25,
    paddingTop: 75,
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  mainComponent: {
    flexBasis: "auto",
    flexGrow: 1,
    flexShrink: 1,
    width: "100%",
    height: "85%",
    marginTop: 25,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255, 0.6)",
    padding: 10,
    display: "flex",
    gap: 25,
  },
  mainTitle: {
    marginLeft: 20,
    fontSize: 24,
    color: "#212121",
    fontFamily: "InstSansMed",
    textTransform: "uppercase",
  },
  mascotImage: {
    width: "100%",
    height: 300,
    borderRadius: 22,
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  creatorButtonText: {
    fontSize: 20,
    fontFamily: "InstSansMed",
    textTransform: "uppercase",
  },
  creatorButton: {
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#ebebe9",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 22,
  },
  buttonsWrapper: {
    display: "flex",
    gap: 15,
  },
  buttonText: {
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily: "InstSansMed",
    color: "#727070",
  },
  buttonArrow: {
    fontSize: 24,
    textTransform: "uppercase",
    fontFamily: "InstSansMed",
    color: "#727070",
  },
  button: {
    width: "100%",
    marginHorizontal: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    backgroundColor: "#d9d9d9",
    paddingHorizontal: 15,
    borderRadius: 15,
  },
});
