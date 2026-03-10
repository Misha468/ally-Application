import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
export default function RootLayout() {
  const [loaded] = useFonts({
    InstSansMed: require("../assets/fonts/InstrumentSans-Medium.ttf"),
    InstSansSemiBold: require("../assets/fonts/InstrumentSans-SemiBold.ttf"),
    InstSansBold: require("../assets/fonts/InstrumentSans-Bold.ttf"),
  });
  useEffect(() => {
    if (loaded) {
    }
  });
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#e6e6e3",
  },
});
