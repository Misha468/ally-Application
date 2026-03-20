import { SignInUser, SignUpUser } from "@/firebase/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
// React-native components
import {
  Image,
  ImageBackground,
  Platform,
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
  const [isLoading, setIsLoading] = useState(false);
  // Form text consts
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Errors && hints
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  // Validation functions
  const validateUserName = (name: string): boolean => {
    if (!name || name.trim().length < 3) {
      setUserNameError("Имя пользователя должно содержать минимум 3 символа");
      return false;
    }
    setUserNameError("");
    return true;
  };
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Введите корректный email");
      return false;
    }
    setEmailError("");
    return true;
  };
  const validatePassword = (password: string): boolean => {
    if (!password || password.length < 6) {
      setPasswordError("Пароль должен содержать минимум 6 символов");
      return false;
    }
    setPasswordError("");
    return true;
  };
  // Modal function
  function ModalOpen(title: string) {
    setUserName("");
    setEmail("");
    setPassword("");
    setUserNameError("");
    setEmailError("");
    setPasswordError("");
    setFormError("");
    setIsVisible(true);
    setPushedTitle(title);
  }
  function ModalClose() {
    if (userName || email || password) {
    } else {
      setIsVisible(false);
      setUserName("");
      setEmail("");
      setPassword("");
      setUserNameError("");
      setEmailError("");
      setPasswordError("");
      setFormError("");
    }
  }
  // AuthSuccess
  const handleAuthSuccess = async (token: string, user: any) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      ModalClose();
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Error saving auth data:", error);
      setFormError("Ошибка при сохранении данных");
    }
  };
  // SignIn function
  async function SignInRequest({ userName, password }: SignInParams) {
    const isUserNameValid = validateUserName(userName);
    const isPasswordValid = validatePassword(password);
    if (!isUserNameValid || !isPasswordValid) {
      return;
    }
    setIsLoading(true);
    setFormError("");
    try {
      const result = await SignInUser({ userName, password });
      if (result.success && result.token) {
        await handleAuthSuccess(result.token, result.user);
      } else {
        setFormError(result.error || "Ошибка при входе");
      }
    } catch (error) {
      setFormError("Произошла ошибка при входе");
      console.error("SignIn error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  // SignUp function
  async function SignUpRequest({ userName, email, password }: SignUpParams) {
    const isUserNameValid = validateUserName(userName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isUserNameValid || !isEmailValid || !isPasswordValid) {
      return;
    }
    setIsLoading(true);
    setFormError("");
    try {
      const result = await SignUpUser({ userName, email, password });
      if (result.success && result.token) {
        await handleAuthSuccess(result.token, result.user);
      } else {
        setFormError(result.error || "Ошибка при регистрации");
      }
    } catch (error) {
      setFormError("Произошла ошибка при регистрации");
      console.error("SignUp error:", error);
    } finally {
      setIsLoading(false);
    }
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
                {userNameError && (
                  <Text style={styles.errorText}>{userNameError}</Text>
                )}
                <TextInput
                  style={styles.inputs}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  placeholder="Пароль..."
                  placeholderTextColor={"#727070"}
                />
                {passwordError && (
                  <Text style={styles.errorText}>{passwordError}</Text>
                )}
                {formError && <Text style={styles.errorText}>{formError}</Text>}
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
                {userNameError && (
                  <Text style={styles.errorText}>{userNameError}</Text>
                )}
                <TextInput
                  style={styles.inputs}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email..."
                  placeholderTextColor={"#727070"}
                />
                {emailError && (
                  <Text style={styles.errorText}>{emailError}</Text>
                )}
                <TextInput
                  style={styles.inputs}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Пароль..."
                  placeholderTextColor={"#727070"}
                  secureTextEntry={true}
                />
                {passwordError && (
                  <Text style={styles.errorText}>{passwordError}</Text>
                )}
                {formError && <Text style={styles.errorText}>{formError}</Text>}
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
  },
  header: {
    width: "100%",
    height: 150,
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
    flex: 1,
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
    alignSelf: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
      },
      android: {
        elevation: 10,
      },
    }),
    backgroundColor: "#e6e6e3",
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
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    width: 310,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  gappedText: {
    fontSize: 20,
    fontFamily: "InstSansMed",
  },
  authTopPart: {
    width: 310,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconWrapper: {
    width: 45,
    height: 45,
    borderRadius: 999,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  modalWrapper: {
    backgroundColor: "rgba(255,255,255, 0.8)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: 2,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "75%",
    height: "40%",
    borderRadius: 25,
    backgroundColor: "#e6e6e3",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 25,
      },
      android: {
        elevation: 8,
      },
    }),
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
    paddingHorizontal: 15,
    fontFamily: "InstSansMed",
    borderWidth: 0,
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  enterInButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    height: 35,
    borderRadius: 7,
    backgroundColor: "#f0f0f0",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  enterInText: {
    fontSize: 24,
    color: "#727070",
    fontFamily: "InstSansMed",
  },
  innerInFormWrapper: {
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    height: "70%",
  },
  innerUpFormWrapper: {
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    height: "80%",
  },
  errorText: {
    fontSize: 12,
    color: "#ff0000",
    fontFamily: "InstSansMed",
  },
  formErrorText: {
    fontSize: 14,
    color: "#ff0000",
    fontFamily: "InstSansMed",
    textAlign: "center",
    marginVertical: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#727070",
    fontFamily: "InstSansMed",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
