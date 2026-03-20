import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "../components/Footer";
interface userDataProps {
  userName: string;
  role: string;
  tokens: number;
  subscrType: string;
  subscrdateEnd: string;
}
export default function ProfileScreen() {
  const router = useRouter();
  // UseStates
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<userDataProps>({
    role: "",
    userName: "",
    tokens: 0,
    subscrType: "",
    subscrdateEnd: "",
  });
  // LoadUserData
  useEffect(() => {
    let isMounted = true;
    async function loadUserData() {
      try {
        setLoading(true);
        const data = await AsyncStorage.getItem("userData");
        if (data && isMounted) {
          const parsedData: userDataProps = JSON.parse(data);
          setUserData(parsedData);
        } else {
          console.log("Данные не найдены");
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadUserData();
    return () => {
      isMounted = false;
    };
  }, []);
  if (loading) {
    return <Text>Загрузка...</Text>;
  }
  // CopyUserName
  async function copyUserName() {
    try {
      const userNameWithAt = `@${userData.userName}`;
      await Clipboard.setStringAsync(userNameWithAt);
      Alert.alert("Успех", `Скопировано ${userNameWithAt}`);
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось скопировать");
    }
  }
  // Page changer
  function pageOpener(pageName: string) {
    switch (pageName) {
      case "subscrtiption":
        router.replace("/shop");
        break;
      case "profile":
        router.replace("/inDev");
        break;
      case "language":
        router.replace("/languageSet");
        break;
      case "about":
        router.replace("/about");
        break;
      case "become":
        router.replace("/become");
        break;
      case "creator":
        router.replace("/creator");
        break;
      default:
        break;
    }
  }
  // Date formater
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toLocaleString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
  // Component render
  return (
    <View style={styles.background}>
      <View style={styles.topPart}>
        <View style={styles.profileIconWrapper}>
          <Image
            style={styles.profileIcon}
            source={require("../../assets/images/avatars/avatar1.png")}
          />
        </View>
      </View>
      <View style={styles.centralPart} pointerEvents="box-none">
        <View style={styles.userNameWrapper} pointerEvents="box-none">
          <Image
            style={styles.userNameWrapperBackground}
            source={require("../../assets/images/iconBackgrounds/userNameBackground.png")}
          />
          {/* ProfileInfo */}
          <View style={styles.profileInfoWrapper} pointerEvents="auto">
            <View style={styles.valueWrapper}>
              <Text style={styles.miniTitle}>ник</Text>
              <View style={styles.userNameValueWrapper}>
                <Text style={styles.valueText}>@{userData.userName}</Text>
                <TouchableOpacity onPress={copyUserName}>
                  <Image
                    style={styles.copyIcon}
                    source={require("../../assets/images/icons/copy.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.valueWrapper}>
              <Text style={styles.miniTitle}>баланс</Text>
              <Text style={styles.valueText}>{userData.tokens}</Text>
            </View>
          </View>
        </View>
        <View style={styles.profileButtons}>
          {/* Subscription */}
          <View
            style={
              userData.subscrType === "base"
                ? styles.shopButtonWrapperBase
                : styles.shopButtonWrapperPro
            }
          >
            <View>
              {userData.subscrType === "base" ? (
                <View style={styles.subscrInfoWrapper}>
                  <View style={styles.countInMonthWrapper}>
                    <Text style={styles.countBase}>299&#8381;</Text>
                    <Text style={styles.inMonth}>в месяц</Text>
                  </View>
                  <View style={styles.dateWrapper}>
                    <Image
                      style={styles.dateBackground}
                      source={require("../../assets/images/iconBackgrounds/dateBackground.png")}
                    />
                    <Text style={styles.subscrEndDate}>
                      до {formatDate(userData.subscrdateEnd)}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.subscrInfoWrapper}>
                  <View style={styles.countInMonthWrapper}>
                    <Text style={styles.countPro}>499&#8381;</Text>
                    <Text style={styles.inMonth}>в месяц</Text>
                  </View>
                  <View style={styles.dateWrapper}>
                    <Image
                      style={styles.dateBackground}
                      source={require("../../assets/images/iconBackgrounds/dateBackground.png")}
                    />
                    <Text style={styles.subscrEndDate}>
                      до {formatDate(userData.subscrdateEnd)}
                    </Text>
                  </View>
                </View>
              )}
              <View style={styles.buttonWrapperBottomPart} pointerEvents="auto">
                <TouchableOpacity
                  style={styles.shopButton}
                  onPress={() => pageOpener("subscrtiption")}
                >
                  <Text style={styles.buttonText}>в магазин</Text>
                  <Text style={styles.buttonArrow}>&gt;</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Profile settings */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => pageOpener("profile")}
          >
            <Text style={styles.buttonText}>Редактировать профиль</Text>
            <Text style={styles.buttonArrow}>&gt;</Text>
          </TouchableOpacity>
          {/* Language settings */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => pageOpener("language")}
          >
            <Text style={styles.buttonText}>Изменить язык</Text>
            <Text style={styles.buttonArrow}>&gt;</Text>
          </TouchableOpacity>
          {/* About application */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => pageOpener("about")}
          >
            <Text style={styles.buttonText}>О приложении</Text>
            <Text style={styles.buttonArrow}>&gt;</Text>
          </TouchableOpacity>
          {/* Become a creator / Creator profile */}
          {userData.role === "creator" ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => pageOpener("creator")}
            >
              <Text style={styles.buttonText}>Профиль креатора</Text>
              <Text style={styles.buttonArrow}>&gt;</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => pageOpener("become")}
            >
              <Text style={styles.buttonText}>Стать креатором</Text>
              <Text style={styles.buttonArrow}>&gt;</Text>
            </TouchableOpacity>
          )}
          {/* End buttons */}
        </View>
      </View>
      <Footer />
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e6e6e3",
    padding: 10,
    paddingTop: 50,
    display: "flex",
    alignItems: "center",
    gap: 50,
  },
  topPart: {
    backgroundColor: "#d9d9d9",
    width: "100%",
    height: 150,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  centralPart: {
    flexBasis: "auto",
    flexShrink: 1,
    flexGrow: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    gap: 30,
  },
  profileIconWrapper: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 75,
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 999,
  },
  userNameWrapper: {
    width: "100%",
    height: 150,
    borderRadius: 22,
    boxShadow: "0 0 15px rgba(0,0,0, 0.2)",
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userNameWrapperBackground: {
    position: "absolute",
    left: -75,
    zIndex: 1,
    width: 200,
    height: 200,
  },
  copyIcon: {
    width: 20,
    height: 20,
  },
  valueWrapper: {},
  profileInfoWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "100%",
    marginHorizontal: "auto",
    position: "relative",
    zIndex: 2,
    justifyContent: "space-around",
  },
  miniTitle: {
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily: "InstSansMed",
    color: "#727070",
  },
  valueText: {
    fontSize: 20,
    textTransform: "uppercase",
    fontFamily: "InstSansMed",
    color: "#212121",
  },
  userNameValueWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
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
    zIndex: 99,
    elevation: 99,
  },
  profileButtons: {
    display: "flex",
    gap: 20,
  },
  shopButtonWrapperBase: {
    width: "100%",
    height: 75,
    borderColor: "#f57356",
    borderWidth: 3,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  shopButtonWrapperPro: {
    width: "100%",
    height: 75,
    borderColor: "#ff2b4e",
    borderWidth: 3,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  shopButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  subscrEndDate: {
    textTransform: "uppercase",
    color: "#e6e6e3",
    fontSize: 12,
    position: "relative",
    zIndex: 2,
    fontFamily: "InstSansMed",
  },
  dateBackground: {
    width: 110,
    height: 25,
    position: "absolute",
    zIndex: 1,
    borderRadius: 20,
  },
  dateWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  subscrInfoWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  countInMonthWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  countBase: {
    width: 75,
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    textAlign: "center",
    fontSize: 24,
    margin: 5,
    borderRadius: 12,
    fontFamily: "InstSansMed",
    color: "#e73f19",
  },
  countPro: {
    width: 75,
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    textAlign: "center",
    fontSize: 24,
    margin: 5,
    borderRadius: 12,
    fontFamily: "InstSansMed",
    color: "#ff2b4e",
  },
  inMonth: {
    fontFamily: "InstSansMed",
    color: "#727070",
  },
  buttonWrapperBottomPart: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    elevation: 99,
    zIndex: 99,
  },
});
