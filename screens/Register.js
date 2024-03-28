import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { useState } from "react";
import Error_msg, { setErrorText as setErr } from "../components/Error_msg";
import Main_heading from "../components/Main_heading";
import Sub_heading from "../components/Sub_heading";
import Profile_pic, { get_profile_pic_path } from "../components/Profile_pic";
export default function Register({ dispatch }) {
  const [show_pass, setShow_pass] = useState(true);
  const [msg, setMsg] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf_pass, setConf_pass] = useState("");
  const profile_pic_path = get_profile_pic_path();

  return (
    <View style={styles.container}>
      <View style={styles.headers}>
        <Main_heading text={"Nexa"} />
      </View>

      <View style={styles.form}>
        {msg ? (
          <Text style={{ textAlign: "center" }}>{msg}</Text>
        ) : (
          <Error_msg />
        )}
        {msg && profile_pic_path ? (
          <Image
            source={{ uri: profile_pic_path }}
            style={{ ...styles.profile, margin: 30 }}
          />
        ) : msg && !profile_pic_path ? (
          <Image
            source={require("../assets/profile.png")}
            style={{ ...styles.profile, margin: 30 }}
          />
        ) : (
          ""
        )}
        {!msg ? (
          <>
            <Profile_pic />
            <Sub_heading text={"Registration"} />
            <View style={styles.input_fields}>
              <TextInput
                placeholder={"Full Name"}
                style={styles.textInputs}
                onChangeText={(val) => setFullName(val)}
              />
              <TextInput
                placeholder={"Email"}
                style={styles.textInputs}
                onChangeText={(val) => setEmail(val)}
              />
              <TextInput
                placeholder={"Password"}
                style={styles.textInputs}
                secureTextEntry={show_pass}
                onChangeText={(val) => setPassword(val)}
              />
              <TouchableOpacity onPress={() => setShow_pass(!show_pass)}>
                <Image
                  source={require("../assets/eye.png")}
                  style={styles.password_field_icon}
                />
              </TouchableOpacity>
              <TextInput
                placeholder={"Confirm Password"}
                style={styles.textInputs}
                secureTextEntry={show_pass}
                onChangeText={(val) => setConf_pass(val)}
              />
            </View>
          </>
        ) : (
          ""
        )}

        {!msg ? (
          <View style={styles.footer}>
            <Text
              style={styles.customBtn}
              onPress={() => dispatch({ type: "cancelOperation" })}
            >
              Cancel
            </Text>

            <Text style={styles.customBtn}>Register</Text>
          </View>
        ) : (
          <View style={styles.footer}>
            <Text
              style={styles.customBtn_solo}
              onPress={() => dispatch({ type: "cancelOperation" })}
            >
              Back
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
