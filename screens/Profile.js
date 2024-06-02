import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { useState } from "react";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
import Bottom_menu from "../components/Bottom_menu";
import Error_msg, { setErrorText as setErr } from "../components/Error_msg";
import Main_heading from "../components/Main_heading";
import Sub_heading from "../components/Sub_heading";
import Profile_pic, { get_profile_pic_path } from "../components/Profile_pic";
import { Loader, handleLoader } from "../components/Loader";
export default function Profile({ dispatch, user }) {
  const [user_id, setUser_id] = useState(user.user_id);
  const [full_name] = useState(user.full_name);
  const [temp_full_name, setTempFullName] = useState("");
  const [email] = useState(user.email);
  const [temp_email, setTemp_Email] = useState("");
  const [profile_pic_path] = useState(user.profile_pic_path);
  const [temp_prev_pass, setTempPrevPass] = useState("");
  const [temp_new_pass, setTempNewPass] = useState("");
  const [show_pass_prev, setShow_pass_prev] = useState(true);
  const [show_pass_new, setShow_pass_new] = useState(true);
  const [msg, setMsg] = useState("");

  return (
    <>
      <View style={styles.container}>
        <Loader />
        <TouchableOpacity onPress={() => dispatch({ type: "cancelOperation" })}>
          <Image
            style={styles.logout_icon}
            source={require("../assets/logout.png")}
          />
        </TouchableOpacity>
        <View style={styles.headers}>
          <Main_heading text={"Profile"} />
          <Sub_heading text={msg ? `*** ${msg} ***` : `Welcome ${full_name}`} />
        </View>

        <Error_msg />
        <Profile_pic default_path={profile_pic_path} />

        <View>
          <TextInput
            placeholder={full_name}
            style={styles.textInputs}
            onChangeText={(val) => setTempFullName(val)}
          />
          <TextInput
            placeholder={email}
            style={styles.textInputs}
            onChangeText={(val) => setTemp_Email(val)}
          />
          <TextInput
            placeholder={"Previous Password"}
            style={styles.textInputs}
            secureTextEntry={show_pass_prev}
            onChangeText={(val) => setTempPrevPass(val)}
          />
          <TouchableOpacity onPress={() => setShow_pass_prev(!show_pass_prev)}>
            <Image
              source={require("../assets/eye.png")}
              style={{ ...styles.password_field_icon, right: 2 }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder={"New Password"}
            style={styles.textInputs}
            secureTextEntry={show_pass_new}
            onChangeText={(val) => setTempNewPass(val)}
          />
          <TouchableOpacity onPress={() => setShow_pass_new(!show_pass_new)}>
            <Image
              source={require("../assets/eye.png")}
              style={{ ...styles.password_field_icon, right: 2 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.customBtn_solo}
              onPress={() =>
                update_info(
                  user_id,
                  temp_full_name || full_name,
                  temp_email ? temp_email : email,
                  temp_prev_pass,
                  temp_new_pass,
                  get_profile_pic_path(),
                  setErr,
                  setMsg,
                  dispatch
                )
              }
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.social_icon_container}>
          <TouchableOpacity
            onPress={() =>
              dispatch({ type: "InstagramAccount", payload: true })
            }
          >
            <Image
              style={styles.social_icon}
              source={require("../assets/instagram.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              dispatch({ type: "PinterestAccount", payload: true })
            }
          >
            <Image
              style={styles.social_icon}
              source={require("../assets/pinterest.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch({ type: "TwitterAccount", payload: true })}
          >
            <Image
              style={styles.social_icon}
              source={require("../assets/twitter.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Bottom_menu dispatch={dispatch} user={user} />
    </>
  );
}
function notifyMessage(msg) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(msg);
  }
}
async function update_info(
  user_id,
  full_name,
  email,
  temp_prev_pass,
  temp_new_pass,
  profile_pic_path,
  setErr,
  setMsg,
  dispatch
) {
  if (!temp_prev_pass || !email) {
    console.log("Password or Email is null");
  } else if (!validateEmail(email)) {
    setErr("Invalid Email");
  } else {
    setErr("");
    try {
      handleLoader();
      const response = await fetch(
        `https://lion-optimal-sawfish.ngrok-free.app/api/update-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            full_name: full_name,
            email: email,
            prev_pass: temp_prev_pass,
            new_pass: temp_new_pass,
            profile_pic_path: profile_pic_path,
          }),
        }
      );
      if (response.ok) {
        const data = await response.text();
        const dataJson = JSON.parse(data);
        console.log("Response from server:", data);
        if (dataJson.success === true) {
          setErr("");
          setMsg("Profile Updated");
          notifyMessage(`Profile updated`);
          dispatch({
            type: "updateProfile",
            payload: {
              user_id,
              full_name,
              email,
              profile_pic_path,
            },
          });
        } else if (dataJson.success === false) {
          setErr(dataJson.message);
        }
      } else {
        setErr("Please check your credentials again");
      }
    } catch (e) {
      console.log(e);
      setErr(e.message);
    } finally {
      handleLoader();
    }
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
