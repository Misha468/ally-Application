import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
export default function TabLayout() {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/images/background.png")}
    >
      <View style={styles.header}>
        <Text style={styles.companyName}>ALLY</Text>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.textTitle}>Что будем творить?</Text>
      </View>
      <View style={styles.authentification}>
        <View style={styles.authTopPart}>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/signInIcons/yandex.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              style={styles.bigIcon}
              source={require("../../assets/images/signInIcons/google.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/signInIcons/gmail.png")}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.gappedText}>ИЛИ</Text>
        <View>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
  },
  bigIcon: {
    width: 45,
    height: 45,
  },
  background: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  header: {
    width: "100%",
    height: 150,
    display: "flex",
    alignItems: "flex-end",
    paddingRight: 25,
    justifyContent: "center",
  },
  companyName: {
    fontSize: 34,
    color: "#e73f19",
    fontFamily: "InstSansBold",
  },
  titleWrapper: {
    width: "100%",
    flexBasis: "auto",
    flexGrow: 1,
    flexShrink: 1,
  },
  textTitle: {
    fontSize: 26,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textAlign: "center",
    color: "#212121",
    fontFamily: "InstSansSemiBold",
  },
  authentification: {
    width: "90%",
    height: 200,
    marginHorizontal: "auto",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    boxShadow: "0px 0px 30px rgba(0,0,0,0.2)",
    backgroundColor: "#e6e6e3",
    display: "flex",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "InstSansMed",
  },
  signInButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    width: 150,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    width: 310,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gappedText: {
    fontSize: 20,
    fontFamily: "InstSansMed",
  },
  authTopPart: {
    width: 310,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  signInIcons: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  iconWrapper: {
    width: 45,
    height: 45,
    borderRadius: "100%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
