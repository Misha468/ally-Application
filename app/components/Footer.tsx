import { Image, StyleSheet, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.bottomPart}>
      <Image
        style={styles.iconWrapperBackground}
        source={require("../../assets/images/iconBackgrounds/iconBackgroundLeft.png")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  iconWrapperBackground: {
    position: "absolute",
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 999,
    marginBottom: 45,
  },
  bottomPart: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});
