import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { useState } from "react";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
import Bottom_menu from "../components/Bottom_menu";
import Error_msg, { setErrorText as setErr } from "../components/Error_msg";
import Main_heading from "../components/Main_heading";
import Sub_heading from "../components/Sub_heading";
import Profile_pic, { get_profile_pic_path } from "../components/Profile_pic";
export default function Profile({ dispatch, user }) {
  const [full_name] = useState(user.full_name);
  const [temp_full_name, setTempFullName] = useState("");
  const [email] = useState(user.email);
  const [temp_email, setTemp_Email] = useState("");
  const [password] = useState(user.password);
  const [profile_pic_path] = useState(user.profile_pic_path);
  const [temp_prev_pass, setTempPrevPass] = useState("");
  const [temp_new_pass, setTempNewPass] = useState("");
  const [show_pass_prev, setShow_pass_prev] = useState(true);
  const [show_pass_new, setShow_pass_new] = useState(true);
  const [msg, setMsg] = useState("");

  return (
    <>
      <View style={styles.container}>
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
                  temp_full_name || full_name,
                  temp_email ? temp_email : email,
                  validate_fields(
                    temp_prev_pass,
                    temp_new_pass,
                    password,
                    setErr
                  ),
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
          <Image
            style={styles.social_icon}
            source={require("../assets/instagram.png")}
          />
          <Image
            style={styles.social_icon}
            source={require("../assets/pinterest.png")}
          />
          <Image
            style={styles.social_icon}
            source={require("../assets/twitter.png")}
          />
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
function validate_fields(temp_prev_pass, temp_new_pass, password, setErr) {
  if (!temp_prev_pass) {
    setErr("Please check the password field again");
    return null;
  }
  if (temp_prev_pass !== password) {
    setErr("Previous password is incorrect");
    return null;
  }
  if (temp_new_pass === password) {
    setErr("Same password being set again");
    return null;
  } else {
    setErr("");
    return temp_new_pass ? temp_new_pass : password;
  }
}
async function update_info(
  full_name,
  email,
  password,
  profile_pic_path,
  setErr,
  setMsg,
  dispatch
) {
  if (!password || !email) {
    console.log("Password or Email is null");
  } else if (!validateEmail(email)) {
    setErr("Invalid Email");
  } else {
    setErr("");
    try {
      const response = await fetch("http://192.168.0.106:5000/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: full_name,
          email: email,
          password: password,
          profile_pic_path: profile_pic_path,
        }),
      });
      if (response.ok) {
        const data = await response.text();

        console.log("Response from server:", data);
        setErr("");
        setMsg("Profile Updated");
        notifyMessage(`Profile updated`);
        dispatch({
          type: "updateProfile",
          payload: {
            full_name,
            email,
            password,
            profile_pic_path,
          },
        });
      } else {
        setErr("Please check your credentials again");
      }
    } catch (e) {
      console.log(e);
      setErr(e);
    }
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
