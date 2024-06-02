import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { useState } from "react";
import Error_msg, { setErrorText as setErr } from "../components/Error_msg";
import Main_heading from "../components/Main_heading";
import Sub_heading from "../components/Sub_heading";
import Profile_pic, { get_profile_pic_path } from "../components/Profile_pic";
import { Loader, handleLoader } from "../components/Loader";

export default function Register({ dispatch }) {
  const [show_pass, setShow_pass] = useState(true);
  const [msg, setMsg] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf_pass, setConf_pass] = useState("");
  const profile_pic_path = get_profile_pic_path();
  function handle_Registration() {
    if (password === conf_pass) {
      register(full_name, email, password, profile_pic_path, setMsg).catch(
        (err) => setErr(err.message)
      );
    } else {
      setErr("Passwords do not match");
    }
  }
  return (
    <View style={styles.container}>
      <Loader />
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

            <Text style={styles.customBtn} onPress={handle_Registration}>
              Register
            </Text>
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
async function register(full_name, email, password, profile_pic_path, setMsg) {
  if (!full_name || !email || !password) {
    throw new Error("Please provide all the fields");
  }
  if (!validateEmail(email)) {
    throw new Error("Please provide valid email");
  }
  try {
    handleLoader();
    const timeoutMs = 60000; // 6 seconds
    const response = await Promise.race([
      fetch(`https://lion-optimal-sawfish.ngrok-free.app/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: full_name,
          email: email,
          password: password,
          profile_pic_path: profile_pic_path ? profile_pic_path : "",
        }),
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
      ),
    ]);

    if (response) {
      const data = await response.text();
      // const dataJSON = JSON.parse(data);
      if (response.ok) {
        // console.log("Response from server:", dataJSON.message);
        console.log("Response from server:", data);
        // Optionally, set a success message
        setMsg("Your account has been created, please log in to continue.");
      } else {
        console.log("Response from server:", data);
        setErr("Error creating the profile. Profile might already exist");
      }
    } else {
      setErr("Request timed out. Please try again later.");
    }
  } catch (e) {
    console.log(e);
    setErr("An error occurred. Please try again later.");
  } finally {
    handleLoader();
  }
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
