import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded] = useFonts({
    InstSansMed: require("../assets/fonts/InstrumentSans-Medium.ttf"),
    InstSansSemiBold: require("../assets/fonts/InstrumentSans-SemiBold.ttf"),
    InstSansBold: require("../assets/fonts/InstrumentSans-Bold.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (!loaded) {
    SplashScreen.preventAutoHideAsync();
  }

  return (
    <View style={styles.background}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="profile" />
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
