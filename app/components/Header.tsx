import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface userDataProps {
  subscrType: string;
  subscrDateEnd: string;
}
export default function Header() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<userDataProps>({
    subscrType: "",
    subscrDateEnd: "",
  });
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
  function profileOpener() {
    router.replace("/profile");
  }
  return (
    <View style={styles.header}>
      <Text style={styles.companyName}>ALLY</Text>
      {userData.subscrType === "base" ? (
        <TouchableOpacity
          style={styles.profileIconWrapperBase}
          onPress={() => profileOpener()}
        >
          <Image
            style={styles.profileIcon}
            source={require("../../assets/images/avatars/avatar1.png")}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.profileIconWrapperPro}
          onPress={() => profileOpener()}
        >
          <Image
            style={styles.profileIcon}
            source={require("../../assets/images/avatars/avatar1.png")}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  companyName: {
    fontSize: 34,
    color: "#e73f19",
    fontFamily: "InstSansBold",
  },
  profileIcon: {
    width: 75,
    height: 75,
    borderRadius: 999,
  },
  profileIconWrapperBase: {
    width: 85,
    height: 85,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F57356",
    borderRadius: 999,
  },
  profileIconWrapperPro: {
    width: 85,
    height: 85,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF2B4E",
    borderRadius: 999,
  },
});
