import { ImageBackground } from "react-native";

import { styles } from "./styles";
import Register from "./screens/Register";
import { useReducer } from "react";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Stats from "./screens/Stats";
import { reset_profile_pic_path } from "./components/Profile_pic";

const initialState = {
  login: false,
  register: false,
  full_name: "",
  email: "",
  password: "",
  profile_pic_path: "",
  auth_key: "",
  isLoggedIn: false,
  profile: false,
  stats: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "loginScreen":
      return { ...state, login: action.payload };
    case "registerScreen":
      return { ...state, register: action.payload };
    case "cancelOperation":
      reset_profile_pic_path();
      return { initialState };
    case "homeScreen":
      return {
        ...state,
        login: false,
        register: false,
        isLoggedIn: true,
        full_name: action.payload.full_name,
        email: action.payload.email,
        password: action.payload.password,
        profile_pic_path: action.payload.profile_pic_path,
        auth_key: action.payload.auth_key,
        profile: false,
        stats: false,
      };
    case "profileScreen":
      return {
        ...state,
        login: false,
        register: false,
        stats: false,
        profile: action.payload,
        isLoggedIn: true,
      };
    case "updateProfile":
      return {
        ...state,
        full_name: action.payload.full_name,
        email: action.payload.email,
        password: action.payload.password,
        profile_pic_path: action.payload.profile_pic_path,
        profile: false,
      };
    case "statScreen":
      return {
        ...state,
        login: false,
        register: false,
        profile: false, // Reset profile to false
        stats: action.payload,
        isLoggedIn: true,
      };
    default:
      return { ...state };
  }
}
export default function App() {
  const [user, dispatch] = useReducer(reducer, initialState);
  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.container}
    >
      {!user.login && !user.register && !user.isLoggedIn && (
        <Welcome dispatch={dispatch} />
      )}
      {user.register && <Register dispatch={dispatch} />}
      {user.login && <Login dispatch={dispatch} />}
      {user.isLoggedIn && !user.profile && !user.stats && (
        <Home dispatch={dispatch} user={user} />
      )}
      {user.isLoggedIn && user.profile && !user.stats && (
        <Profile dispatch={dispatch} user={user} />
      )}
      {user.isLoggedIn && user.stats && !user.profile && (
        <Stats dispatch={dispatch} user={user} />
      )}
    </ImageBackground>
  );
}
