import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";

export default function AboutScreen() {
  const router = useRouter();
  function pageOpener(pageName: string) {
    switch (pageName) {
      case "ally":
        // В разработке
        // router.replace("/ally");
        router.replace("/inDev");
        break;
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
      case "privacy":
        // В разработке
        // router.replace("/privacy-police");
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
        <Text style={styles.mainTitle}>О приложении</Text>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pageOpener("ally")}
          >
            <Text style={styles.buttonText}>Ally</Text>
            <Text style={styles.buttonArrow}>&gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pageOpener("faq")}
          >
            <Text style={styles.buttonText}>FAQ</Text>
            <Text style={styles.buttonArrow}>&gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pageOpener("rules")}
          >
            <Text style={styles.buttonText}>Правила сообщества</Text>
            <Text style={styles.buttonArrow}>&gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pageOpener("privacy")}
          >
            <Text style={styles.buttonText}>Политика конфиденциальности</Text>
            <Text style={styles.buttonArrow}>&gt;</Text>
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
  buttonsWrapper: {
    display: "flex",
    gap: 15,
    marginTop: 25,
  },
});
