import { database } from "@/firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
interface userDataProps {
  uId: string;
}
interface subscribesProps {
  [key: string]: string;
}
interface creatorsProps {
  uId: "";
  userName: "";
}
export default function SubscriptionScreen() {
  const router = useRouter();
  const [loadedData, setLoadedData] = useState<userDataProps>({
    uId: "",
  });
  const [subscribes, setSubscribes] = useState<creatorsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // Load data
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    async function loadUserData() {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData && isMounted) {
          const parsedUserData: userDataProps = JSON.parse(userData);
          setLoadedData(parsedUserData);
          await loadSubscriptions(parsedUserData.uId);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
    // Load subscriptions
    async function loadSubscriptions(uId: string) {
      try {
        const snapshot = await get(ref(database, `users/${uId}/subscribes`));
        if (isMounted && snapshot) {
          const subscribesData: subscribesProps = snapshot.val();
          const creatorIds = Object.values(subscribesData).filter((id) => id);
          if (creatorIds.length > 0) {
            const creatorsPromises = creatorIds.map(async (creatorId) => {
              const creatorSnapshot = await get(
                ref(database, `users/${creatorId}`),
              );
              if (creatorSnapshot.exists()) {
                const creatorData = creatorSnapshot.val();
                return {
                  uId: creatorId,
                  userName: creatorData.userName,
                };
              }
              return null;
            });
            const creatorsResults = await Promise.all(creatorsPromises);
            const validCreators = creatorsResults.filter(
              (creator) => creator !== null,
            ) as creatorsProps[];
            setSubscribes(validCreators);
          }
        } else {
          console.log("Нет подписок или подписки не найдены");
          setSubscribes([]);
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadUserData();
    return () => {
      isMounted = false;
    };
  }, []);
  if (loading) {
    return <Text>Загрузка....</Text>;
  }
  // Select creator funciton
  async function selectCreator(uId: string) {
    await AsyncStorage.setItem("selectedCreator", uId);
    router.replace("/(tabs)/creatorProfile");
  }
  return (
    <View style={styles.background}>
      <Header />
      {subscribes.length > 0 ? (
        <FlatList
          data={subscribes}
          keyExtractor={(item) => item.uId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.subscriptionItem}
              onPress={() => selectCreator(item.uId)}
            >
              <Image
                style={styles.creatorPhoto}
                source={require("../../assets/images/avatars/avatar1.png")}
              />
              <Text style={styles.creatorName}>{item.userName}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.emptyText}>У вас пока нет подписок</Text>
      )}
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
  emptyText: {
    fontSize: 20,
    fontFamily: "InstSansMed",
  },
  creatorPhoto: {
    width: 75,
    height: 75,
  },
  subscriptionItem: {
    width: "100%",
    height: 85,
    borderRadius: 50,
    padding: 5,
    backgroundColor: "#cccccc",
    flexDirection: "row",
  },
  creatorName: {
    fontSize: 16,
    fontFamily: "InstSansMed",
  },
  listContent: {
    marginTop: 25,
    gap: 15,
  },
});
