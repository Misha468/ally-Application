import { Tabs } from "expo-router";
import { Image, StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.icon}
              source={require("../../../assets/images/layoutIcons/home.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="subscription"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.icon}
              source={require("../../../assets/images/layoutIcons/home.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.icon}
              source={require("../../../assets/images/layoutIcons/home.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.icon}
              source={require("../../../assets/images/layoutIcons/home.png")}
            />
          ),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e6e6e3",
  },
  icon: {
    width: 25,
    height: 25,
  },
});
