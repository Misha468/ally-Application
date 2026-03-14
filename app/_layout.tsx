import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({
    InstSansMed: require("../assets/fonts/InstrumentSans-Medium.ttf"),
    InstSansSemiBold: require("../assets/fonts/InstrumentSans-SemiBold.ttf"),
    InstSansBold: require("../assets/fonts/InstrumentSans-Bold.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (error) {
    console.error("Ошибка загрузки шрифтов:", error);
  }
  if (!loaded && !error) {
    return null;
  }
  return (
    <View style={styles.background}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e6e6e3",
  },
});
