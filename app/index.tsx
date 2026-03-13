import { useRouter } from "expo-router";
import React, { useState } from "react";
// React-native components
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// interfaces for Authentification
interface SignInParams {
  userName: string;
  password: string;
}
interface SignUpParams {
  userName: string;
  email: string;
  password: string;
}
export default function IndexScreen() {
  const router = useRouter();
  // Modal window consts
  const [isVisible, setIsVisible] = useState(false);
  const [pushedTitle, setPushedTitle] = useState("");
  // Form text consts
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Modal function
  function ModalOpen(title: string) {
    setIsVisible(true);
    setPushedTitle(title);
  }
  function ModalClose() {
    if (userName || email || password) {
    } else {
      setIsVisible(false);
    }
  }
  // Authentification functions
  function SignInRequest({ userName, password }: SignInParams) {
    console.log(userName, password);

    setUserName("");
    setPassword("");
    router.replace("/(tabs)/home");
  }
  function SignUpRequest({ userName, email, password }: SignUpParams) {
    console.log(userName, email, password);
    setUserName("");
    setEmail("");
    setPassword("");
  }
  // Screen render
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/background.png")}
    >
      {/* Modal window */}
      {isVisible && (
        <TouchableOpacity
          style={styles.modalWrapper}
          activeOpacity={1}
          onPress={ModalClose}
        >
          <TouchableOpacity
            style={styles.form}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.formTitle}>{pushedTitle}</Text>
            {pushedTitle === "войти" ? (
              <View style={styles.innerInFormWrapper}>
                <TextInput
                  style={styles.inputs}
                  value={userName}
                  onChangeText={setUserName}
                  placeholder="Логин..."
                  placeholderTextColor={"#727070"}
                />
                <TextInput
                  style={styles.inputs}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Пароль..."
                  placeholderTextColor={"#727070"}
                />
                <TouchableOpacity
                  style={styles.enterInButton}
                  onPress={() => SignInRequest({ userName, password })}
                >
                  <Text style={styles.enterInText}>ОК</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.innerUpFormWrapper}>
                <TextInput
                  style={styles.inputs}
                  value={userName}
                  onChangeText={setUserName}
                  placeholder="Имя пользователя..."
                  placeholderTextColor={"#727070"}
                />
                <TextInput
                  style={styles.inputs}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email..."
                  placeholderTextColor={"#727070"}
                />
                <TextInput
                  style={styles.inputs}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Пароль..."
                  placeholderTextColor={"#727070"}
                />
                <TouchableOpacity
                  style={styles.enterInButton}
                  onPress={() => SignUpRequest({ userName, email, password })}
                >
                  <Text style={styles.enterInText}>ОК</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      {/* Modal window */}
      <View style={styles.header}>
        <Text style={styles.companyName}>ALLY</Text>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.textTitle}>Что будем творить?</Text>
      </View>
      <View style={styles.authentification}>
        <View style={styles.authTopPart}>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => ModalOpen("войти")}
          >
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              style={styles.icon}
              source={require("../assets/images/signInIcons/yandex.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              style={styles.bigIcon}
              source={require("../assets/images/signInIcons/google.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image
              style={styles.icon}
              source={require("../assets/images/signInIcons/gmail.png")}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.gappedText}>ИЛИ</Text>
        <View>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => ModalOpen("зарегистрироваться")}
          >
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
  },
  bigIcon: {
    width: 45,
    height: 45,
  },
  background: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  header: {
    width: "100%",
    height: 150,
    display: "flex",
    alignItems: "flex-end",
    paddingRight: 25,
    justifyContent: "center",
  },
  companyName: {
    fontSize: 34,
    color: "#e73f19",
    fontFamily: "InstSansBold",
  },
  titleWrapper: {
    width: "100%",
    flexBasis: "auto",
    flexGrow: 1,
    flexShrink: 1,
  },
  textTitle: {
    fontSize: 26,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textAlign: "center",
    color: "#212121",
    fontFamily: "InstSansSemiBold",
  },
  authentification: {
    width: "90%",
    height: 200,
    marginHorizontal: "auto",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    boxShadow: "0px 0px 30px rgba(0,0,0,0.2)",
    backgroundColor: "#e6e6e3",
    display: "flex",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "InstSansMed",
  },
  signInButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    width: 150,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    width: 310,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gappedText: {
    fontSize: 20,
    fontFamily: "InstSansMed",
  },
  authTopPart: {
    width: 310,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  signInIcons: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  iconWrapper: {
    width: 45,
    height: 45,
    borderRadius: "100%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalWrapper: {
    backgroundColor: "rgba(255,255,255, 0.8)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: 2,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "75%",
    height: "40%",
    borderRadius: 25,
    backgroundColor: "#e6e6e3",
    boxShadow: "0 0 25px rgba(0,0,0, 0.4)",
    display: "flex",
    gap: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  formTitle: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 22,
    fontFamily: "InstSansMed",
    textTransform: "uppercase",
  },
  inputs: {
    width: "90%",
    height: 50,
    borderRadius: 15,
    backgroundColor: "#d9d9d9",
    paddingLeft: 15,
    fontFamily: "InstSansMed",
  },
  enterInButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    height: 35,
    borderRadius: 7,
    boxShadow: "0 0 25px rgba(0,0,0,0.4)",
  },
  enterInText: {
    fontSize: 24,
    color: "#727070",
    fontFamily: "InstSansMed",
  },
  innerInFormWrapper: {
    padding: 10,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    height: "70%",
  },
  innerUpFormWrapper: {
    padding: 10,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    height: "80%",
  },
});
