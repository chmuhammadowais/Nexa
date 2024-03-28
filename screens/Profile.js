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
            <Text style={styles.customBtn_solo}>Update</Text>
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
