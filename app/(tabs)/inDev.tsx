import { ImageBackground, StyleSheet, Text } from "react-native";
import Footer from "../components/Footer";

export default function inDevScreen() {
  return (
    <ImageBackground
      style={styles.wrapper}
      source={require("../../assets/images/background.png")}
    >
      <Text style={styles.text}>Экран в разработке</Text>
      <Footer />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: { fontSize: 24, fontFamily: "InstSansBold", marginTop: 100 },
});
