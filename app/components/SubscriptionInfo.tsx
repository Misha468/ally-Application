import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
interface userDataProps {
  subscrType: string;
  subscrDateEnd: string;
}
export default function SubscriptionInfo() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<userDataProps>({
    subscrType: "",
    subscrDateEnd: "",
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
  return <View></View>;
}
