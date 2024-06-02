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
import Instagram from "./screens/Instagram";
import Twitter from "./screens/Twitter";
import Pinterest from "./screens/Pinterest";

const initialState = {
  login: false,
  register: false,
  user_id: "",
  full_name: "",
  email: "",
  password: "",
  profile_pic_path: "",
  auth_key: "",
  isLoggedIn: false,
  profile: false,
  stats: false,
  Instagram: false,
  Twitter: false,
  Pinterest: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loginScreen":
      return { ...state, login: action.payload };
    case "registerScreen":
      return { ...state, register: action.payload };
    case "cancelOperation":
      reset_profile_pic_path();
      return { ...initialState };
    case "homeScreen":
      return {
        ...state,
        login: false,
        register: false,
        isLoggedIn: true,
        user_id: action.payload.user_id,
        full_name: action.payload.full_name,
        email: action.payload.email,
        password: action.payload.password,
        profile_pic_path: action.payload.profile_pic_path,
        auth_key: action.payload.auth_key,
        profile: false,
        stats: false,
        Instagram: false,
        Twitter: false,
        Pinterest: false,
      };
    case "profileScreen":
      return {
        ...state,
        login: false,
        register: false,
        stats: false,
        profile: action.payload,
        isLoggedIn: true,
        Instagram: false,
        Twitter: false,
        Pinterest: false,
      };
    case "updateProfile":
      return {
        ...state,
        user_id: action.payload.user_id,
        full_name: action.payload.full_name,
        email: action.payload.email,
        profile_pic_path: action.payload.profile_pic_path,
        profile: false,
        Instagram: false,
        Twitter: false,
        Pinterest: false,
      };
    case "statScreen":
      return {
        ...state,
        login: false,
        register: false,
        profile: false,
        stats: action.payload,
        isLoggedIn: true,
        Instagram: false,
        Twitter: false,
        Pinterest: false,
      };
    case "InstagramAccount":
      return {
        ...state,
        login: false,
        register: false,
        profile: false,
        stats: false,
        isLoggedIn: true,
        Instagram: action.payload,
        Twitter: false,
        Pinterest: false,
      };
    case "TwitterAccount":
      return {
        ...state,
        login: false,
        register: false,
        profile: false,
        stats: false,
        isLoggedIn: true,
        Instagram: false,
        Twitter: action.payload,
        Pinterest: false,
      };
    case "PinterestAccount":
      return {
        ...state,
        login: false,
        register: false,
        profile: false,
        stats: false,
        isLoggedIn: true,
        Instagram: false,
        Twitter: false,
        Pinterest: action.payload,
      };
    default:
      return state;
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
      {user.isLoggedIn &&
        !user.profile &&
        !user.stats &&
        !user.Instagram &&
        !user.Twitter &&
        !user.Pinterest && <Home dispatch={dispatch} user={user} />}
      {user.isLoggedIn &&
        user.profile &&
        !user.stats &&
        !user.Instagram &&
        !user.Twitter &&
        !user.Pinterest && <Profile dispatch={dispatch} user={user} />}
      {user.isLoggedIn &&
        user.stats &&
        !user.profile &&
        !user.Instagram &&
        !user.Twitter &&
        !user.Pinterest && <Stats dispatch={dispatch} user={user} />}
      {user.isLoggedIn &&
        user.Instagram &&
        !user.Twitter &&
        !user.Pinterest && <Instagram dispatch={dispatch} user={user} />}
      {user.isLoggedIn &&
        user.Twitter &&
        !user.Instagram &&
        !user.Pinterest && <Twitter dispatch={dispatch} user={user} />}
      {user.isLoggedIn &&
        user.Pinterest &&
        !user.Instagram &&
        !user.Twitter && <Pinterest dispatch={dispatch} user={user} />}
    </ImageBackground>
  );
}
