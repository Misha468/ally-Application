import { database } from "@/firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "../components/Footer";
interface userDataProps {
  uId: string;
  userName: string;
  role: string;
  tokens: number;
  subscrType: string;
  subscrdateEnd: string;
}
interface creatorDataProps {
  uId?: string;
  publications?: {
    [key: string]: publicationItemsProps;
  };
  subscribers?: {
    [key: string]: string;
  };
}
interface publicationItemsProps {
  id: string;
  title: string;
  type: string;
  url: string;
}
export default function CreatorProfileScreen() {
  // UseStates
  const [loading, setLoading] = useState(true);
  const [subscribersCount, setSubscribersCount] = useState<number>(0);
  const [publications, setPublications] = useState<publicationItemsProps[]>([]);
  const [userData, setUserData] = useState<userDataProps>({
    uId: "",
    role: "",
    userName: "",
    tokens: 0,
    subscrType: "",
    subscrdateEnd: "",
  });
  const [creatorData, setCreatorData] = useState<creatorDataProps[]>([]);
  // LoadUserData
  useEffect(() => {
    let isMounted = true;
    async function loadUserData() {
      try {
        setLoading(true);
        const data = await AsyncStorage.getItem("userData");
        if (!data) {
          if (isMounted) setLoading(false);
          return;
        }
        const parsedData: userDataProps = JSON.parse(data);
        if (isMounted) {
          setUserData(parsedData);
          const creatorId = await AsyncStorage.getItem("selectedCreator");
          if (creatorId != null) {
            await loadCreatorData(creatorId);
            await loadPublicationsData(creatorId);
          }
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
    // Creator info load function
    async function loadCreatorData(uId: string) {
      try {
        setLoading(true);
        const snapshot = await get(ref(database, `/creators/${uId}`));
        if (snapshot && isMounted) {
          const creatorInfo = snapshot.val();
          let count = 0;
          if (
            creatorInfo.subscribers &&
            typeof creatorInfo.subscribers === "object"
          ) {
            count = Object.keys(creatorInfo.subscribers).length;
          }
          setCreatorData(creatorInfo);
          setSubscribersCount(count);
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
    async function loadPublicationsData(uId: string) {
      try {
        setLoading(true);
        const snapshot = await get(
          ref(database, `/creators/${uId}/publications`),
        );
        if (snapshot && isMounted) {
          const publicationsInfo = snapshot.val();
          if (publicationsInfo && typeof publicationsInfo === "object") {
            const publicationsArray: publicationItemsProps[] =
              Object.values(publicationsInfo);
            setPublications(publicationsArray);
          } else {
            setPublications([]);
          }
        } else {
          setPublications([]);
        }
      } catch (error: any) {
        console.log(error.message);
        setPublications([]);
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
  // Renders publications
  //   Pro
  const renderForProPublicationItem = ({
    item,
  }: {
    item: publicationItemsProps;
  }) => {
    const getImageSource = (imageName: string) => {
      const images: { [key: string]: any } = {
        "picture1.png": require("../../assets/images/uploads/picture1.png"),
        "picture2.png": require("../../assets/images/uploads/picture2.png"),
      };
      return images[imageName] || require("../../assets/images/icon.png");
    };
    return (
      <View style={styles.publicationsItem}>
        <Image
          style={styles.publicationImage}
          source={getImageSource(item.url)}
        />
        <Text style={styles.publicationTitle}>{item.title}</Text>
      </View>
    );
  };
  //   Base
  const renderForBasePublicationItem = ({
    item,
  }: {
    item: publicationItemsProps;
  }) => {
    const getImageSource = (imageName: string) => {
      const images: { [key: string]: any } = {
        "picture1.png": require("../../assets/images/uploads/picture1.png"),
        "picture2.png": require("../../assets/images/uploads/picture2.png"),
      };
      return images[imageName] || require("../../assets/images/icon.png");
    };
    return item.type === "pro" ? (
      <TouchableOpacity style={styles.publicationsItem}>
        <Image
          style={styles.publicationImage}
          source={require("../../assets/images/iconBackgrounds/hiddenPublication.png")}
        />
      </TouchableOpacity>
    ) : (
      <View style={styles.publicationsItem}>
        <Image
          style={styles.publicationImage}
          source={getImageSource(item.url)}
        />
        <Text style={styles.publicationTitle}>{item.title}</Text>
      </View>
    );
  };
  // Screen render
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
      <View style={styles.centralPart}>
        <View style={styles.userNameWrapper}>
          <Image
            style={styles.userNameWrapperBackground}
            source={require("../../assets/images/iconBackgrounds/userNameBackground.png")}
          />
          {/* CreatorInfo */}
          <View style={styles.profileInfoWrapper}>
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
              <Text style={styles.miniTitle}>подписчики</Text>
              <Text style={styles.valueText}>{subscribersCount}</Text>
            </View>
          </View>
        </View>
        {/* Publicatons */}
        <View style={styles.publicationsWrapper}>
          <Text style={styles.publicationsTitle}>Публикации</Text>
          {publications.length > 0 ? (
            <FlatList
              data={publications}
              keyExtractor={(item) => item.id}
              renderItem={
                userData.subscrType === "pro"
                  ? renderForProPublicationItem
                  : renderForBasePublicationItem
              }
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.emptyText}>Публикации отсутсвуют!</Text>
          )}
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
  publicationsItem: {
    marginHorizontal: "auto",
    width: "90%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    gap: 10,
  },
  publicationImage: {
    width: "100%",
    height: 200,
    objectFit: "contain",
    borderRadius: 22,
  },
  publicationsWrapper: {
    width: "100%",
    height: 300,
    overflow: "hidden",
  },
  publicationsTitle: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "InstSansMed",
    textTransform: "uppercase",
  },
  listContent: {
    padding: 10,
    gap: 25,
  },
  publicationTitle: {
    fontSize: 16,
    fontFamily: "InstSansMed",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "InstSansMed",
  },
});
