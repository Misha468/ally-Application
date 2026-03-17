import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";

export default function ProfileSetScreen() {
  return (
    <View style={styles.background}>
      <Header />
      <Text>Редактирование профиля</Text>
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
});
