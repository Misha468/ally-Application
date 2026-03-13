import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  const [status, setStatus] = useState("base");
  return (
    <View style={styles.header}>
      <Text style={styles.companyName}>ALLY</Text>
      {status === "base" ? (
        <TouchableOpacity style={styles.profileIconWrapperBase}>
          <Image
            style={styles.profileIcon}
            source={require("../../assets/images/avatars/avatar1.png")}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.profileIconWrapperPro}>
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
    borderRadius: "100%",
  },
  profileIconWrapperBase: {
    width: 85,
    height: 85,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F57356",
    borderRadius: "100%",
  },
  profileIconWrapperPro: {
    width: 85,
    height: 85,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF2B4E",
    borderRadius: "100%",
  },
});
