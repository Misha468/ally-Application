import { equalTo, get, orderByChild, query, ref, set } from "firebase/database";
import { database } from "./firebase";
// Interfaces
interface SignUpProps {
  userName: string;
  email: string;
  password: string;
}
interface SignInProps {
  userName: string;
  password: string;
}
interface UserData {
  uId: string;
  userName: string;
  email: string;
  password: string;
  role: string;
}
// Token gen fuction
function GenerateToken(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
// SignUp function
export async function SignUpUser(userData: SignUpProps) {
  try {
    const { userName, email, password } = userData;
    const usersRef = ref(database, "users");
    const userNameQuery = query(
      usersRef,
      orderByChild("userName"),
      equalTo(userName),
    );
    const snapshot = await get(userNameQuery);
    if (snapshot.exists()) {
      return {
        success: false,
        error: "Пользователь с таким именем пользователя уже существует!",
      };
    }
    const userId =
      "user_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
    const newUser = {
      uId: userId,
      userName: userName,
      email: email,
      password: password,
      role: "user",
    };
    await set(ref(database, `users/${userId}`), newUser);
    const token = GenerateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    await set(ref(database, `sessions/${token}`), {
      userId: userId,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    });
    const { password: _, ...protectedUser } = newUser;
    return {
      success: true,
      user: protectedUser,
      token: token,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}
// SignIn function
export async function SignInUser({ userName, password }: SignInProps) {
  try {
    const usersRef = ref(database, "users");
    const userNameQuery = query(
      usersRef,
      orderByChild("userName"),
      equalTo(userName),
    );
    const snapshot = await get(userNameQuery);
    if (!snapshot.exists()) {
      return {
        success: false,
        error: "Пользователь не найден!",
      };
    }
    let userData: UserData | null = null;
    let userId: string | null = null;
    const users = snapshot.val();
    const keys = Object.keys(users);
    if (keys.length > 0) {
      userId = keys[0];
      userData = users[userId] as UserData;
    }
    if (!userData) {
      return {
        success: false,
        error: "Ошибка получения данных пользователя",
      };
    }
    if (userData.password !== password) {
      return {
        success: false,
        error: "Неверный пароль",
      };
    }
    const token = GenerateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    await set(ref(database, `sessions/${token}`), {
      userId: userId,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    });
    const { password: _, ...protectedUser } = userData;
    return {
      success: true,
      user: protectedUser,
      token: token,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

// CheckAuth  fucnction
export async function CheckAuth(token: string) {
  try {
    const sessionRef = ref(database, `sessinons/${token}`);
    const snapshot = await get(sessionRef);
    if (!snapshot.exists()) {
      return {
        success: false,
        error: "Сессия истекла!",
      };
    }
    const sessionData = snapshot.val();
    if (new Date(sessionData.expiresAt) < new Date()) {
      await set(ref(database, `sessions/${token}`), null);
      return {
        success: false,
        error: "Сессия истекла!",
      };
    }
    const userRef = ref(database, `users/${sessionData.userId}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists) {
      return {
        success: false,
        error: "Пользователь не найден!",
      };
    }
    const userData = userSnapshot.val() as UserData;
    const { password: _, ...protectedUser } = userData;
    return {
      success: true,
      user: protectedUser,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
// SignOut function
export async function SignOut(token: string) {
  try {
    await set(ref(database, `sessions/${token}`), null);
    return {
      success: false,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
