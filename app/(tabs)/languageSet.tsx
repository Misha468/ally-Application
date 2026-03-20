import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";

export default function LanguageSetScreen() {
  const [language, setLanguage] = useState("russian");
  function languageChanger(language: string) {
    switch (language) {
      case "russian":
        // В разработке
        // Добавить смену языка глобально через AsyncStorage
        setLanguage("russian");
        break;
      case "english":
        // В разработке
        // Добавить смену языка глобально через AsyncStorage
        setLanguage("english");
        break;
      case "chinese":
        // В разработке
        // Добавить смену языка глобально через AsyncStorage
        setLanguage("chinese");
        break;
      case "korean":
        // В разработке
        // Добавить смену языка глобально через AsyncStorage
        setLanguage("korean");
        break;
      case "japanese":
        // В разработке
        // Добавить смену языка глобально через AsyncStorage
        setLanguage("japanese");
        break;
      default:
        break;
    }
  }
  return (
    <View style={styles.background}>
      <Header />
      <View style={styles.mainComponent}>
        <Text style={styles.mainTitle}>
          {language === "russian"
            ? "Изменить язык"
            : language === "english"
              ? "Change language"
              : language === "chinese"
                ? "更改语言"
                : language === "korean"
                  ? "언어 변경"
                  : "言語を変更する"}
        </Text>
        <View style={styles.languagesButtons}>
          {/* Russian button */}
          <TouchableOpacity
            style={
              language === "russian"
                ? styles.choosedLanguageButton
                : styles.languageButton
            }
            onPress={() => languageChanger("russian")}
          >
            <Image
              style={styles.languagesButtonBackground}
              source={require("../../assets/images/iconBackgrounds/languageBackground.png")}
            />
            <Text style={styles.buttonText}>
              {language === "russian"
                ? "Русский"
                : language === "english"
                  ? "Russian"
                  : language === "chinese"
                    ? "俄语"
                    : language === "korean"
                      ? "러시아어"
                      : "ロシア語"}
            </Text>
            {language === "russian" && (
              <Image
                style={styles.choosedIcon}
                source={require("../../assets/images/icons/check.png")}
              />
            )}
          </TouchableOpacity>
          {/* English button */}
          <TouchableOpacity
            style={
              language === "english"
                ? styles.choosedLanguageButton
                : styles.languageButton
            }
            onPress={() => languageChanger("english")}
          >
            <Image
              style={styles.languagesButtonBackground}
              source={require("../../assets/images/iconBackgrounds/languageBackground.png")}
            />
            <Text style={styles.buttonText}>
              {language === "russian"
                ? "Английский"
                : language === "english"
                  ? "English"
                  : language === "chinese"
                    ? "英语"
                    : language === "korean"
                      ? "영어"
                      : "英語"}
            </Text>
            {language === "english" && (
              <Image
                style={styles.choosedIcon}
                source={require("../../assets/images/icons/check.png")}
              />
            )}
          </TouchableOpacity>
          {/* Chinese button */}
          <TouchableOpacity
            style={
              language === "chinese"
                ? styles.choosedLanguageButton
                : styles.languageButton
            }
            onPress={() => languageChanger("chinese")}
          >
            <Image
              style={styles.languagesButtonBackground}
              source={require("../../assets/images/iconBackgrounds/languageBackground.png")}
            />
            <Text style={styles.buttonText}>
              {language === "russian"
                ? "Китайский"
                : language === "english"
                  ? "Chinese"
                  : language === "chinese"
                    ? "中文"
                    : language === "korean"
                      ? "중국어"
                      : "中国語"}
            </Text>
            {language === "chinese" && (
              <Image
                style={styles.choosedIcon}
                source={require("../../assets/images/icons/check.png")}
              />
            )}
          </TouchableOpacity>
          {/* Korean button */}
          <TouchableOpacity
            style={
              language === "korean"
                ? styles.choosedLanguageButton
                : styles.languageButton
            }
            onPress={() => languageChanger("korean")}
          >
            <Image
              style={styles.languagesButtonBackground}
              source={require("../../assets/images/iconBackgrounds/languageBackground.png")}
            />
            <Text style={styles.buttonText}>
              {language === "russian"
                ? "Корейский"
                : language === "english"
                  ? "Korean"
                  : language === "chinese"
                    ? "韩国人"
                    : language === "korean"
                      ? "한국어"
                      : "韓国語"}
            </Text>
            {language === "korean" && (
              <Image
                style={styles.choosedIcon}
                source={require("../../assets/images/icons/check.png")}
              />
            )}
          </TouchableOpacity>
          {/* Japanese button */}
          <TouchableOpacity
            style={
              language === "japanese"
                ? styles.choosedLanguageButton
                : styles.languageButton
            }
            onPress={() => languageChanger("japanese")}
          >
            <Image
              style={styles.languagesButtonBackground}
              source={require("../../assets/images/iconBackgrounds/languageBackground.png")}
            />
            <Text style={styles.buttonText}>
              {language === "russian"
                ? "Японский"
                : language === "english"
                  ? "Japanese"
                  : language === "chinese"
                    ? "日本语"
                    : language === "korean"
                      ? "일본어"
                      : "日本語"}
            </Text>
            {language === "japanese" && (
              <Image
                style={styles.choosedIcon}
                source={require("../../assets/images/icons/check.png")}
              />
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
  choosedIcon: {
    width: 25,
    height: 25,
  },
  languagesButtons: {
    display: "flex",
    gap: 10,
  },
  languagesButtonBackground: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: 50,
    borderRadius: 22,
  },
  languageButton: {
    paddingHorizontal: 15,
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  choosedLanguageButton: {
    paddingHorizontal: 15,
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 3,
    borderColor: "#f57356",
    borderRadius: 22,
  },
  buttonText: {
    fontSize: 16,
    color: "#00000",
    fontFamily: "InstSansMed",
    textTransform: "uppercase",
    zIndex: 2,
  },
});
