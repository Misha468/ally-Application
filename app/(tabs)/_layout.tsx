import { Tabs } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          bottom: 0,
          left: 0,
          right: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              {focused && (
                <Image
                  style={styles.iconWrapperBackground}
                  source={require("../../assets/images/iconBackgrounds/iconBackgroundLeft.png")}
                />
              )}
              <Image
                style={styles.icon}
                source={require("../../assets/images/layoutIcons/home.png")}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="subscription"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              {focused && (
                <Image
                  style={styles.iconWrapperBackground}
                  source={require("../../assets/images/iconBackgrounds/iconBackgroundLeft.png")}
                />
              )}
              <Image
                style={styles.icon}
                source={require("../../assets/images/layoutIcons/subscriptions.png")}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              {focused && (
                <Image
                  style={styles.iconWrapperBackground}
                  source={require("../../assets/images/iconBackgrounds/iconBackgroundRight.png")}
                />
              )}
              <Image
                style={styles.icon}
                source={require("../../assets/images/layoutIcons/shop.png")}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              {focused && (
                <Image
                  style={styles.iconWrapperBackground}
                  source={require("../../assets/images/iconBackgrounds/iconBackgroundRight.png")}
                />
              )}
              <Image
                style={styles.icon}
                source={require("../../assets/images/layoutIcons/search.png")}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profileSet"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="languageSet"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="become"
        options={{
          href: null,
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
    zIndex: 1,
  },
  iconWrapperBackground: {
    position: "absolute",
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 999,
    marginBottom: 45,
  },
  iconWrapper: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});
